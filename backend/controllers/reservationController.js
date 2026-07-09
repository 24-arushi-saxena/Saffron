const Reservation       = require("../models/Reservation");
const checkAvailability = require("../utils/availabilityChecker");
const { sendConfirmationEmail } = require("../utils/sendEmail");
const crypto            = require("crypto");

// generate a short readable confirmation code
const generateCode = () =>
  "SAF-" + crypto.randomBytes(3).toString("hex").toUpperCase();

// POST /api/reservations
const createReservation = async (req, res) => {
  try {
    const { date, time, guests } = req.body;

    // check slot availability
    const { isAvailable, remaining } =
      await checkAvailability(date, time, guests);

    if (!isAvailable) {
      return res.status(409).json({
        success: false,
        message: "This time slot is fully booked.",
        remaining,
      });
    }

    // create confirmation code
    const confirmationCode = generateCode();

    // save to database
    const reservation = await Reservation.create({
      ...req.body,
      confirmationCode,
    });

    // If reservation has an eventId attached, decrease seatsRemaining
    if (reservation.eventId) {
      try {
        const Event = require("../models/Event");
        const event = await Event.findById(reservation.eventId);
        if (event) {
          event.seatsRemaining = Math.max(0, event.seatsRemaining - reservation.guests);
          if (event.seatsRemaining === 0) {
            event.isActive = false;
          }
          await event.save();
          console.log(`Decreased event seats for event: ${event.title}. Remaining: ${event.seatsRemaining}`);
        }
      } catch (eventErr) {
        console.error("Failed to decrement event seats:", eventErr.message);
      }
    }

    // send confirmation email (wrapped in try-catch so it doesn't block reservation if credentials are dummy)
    let emailSent = false;
    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_USER !== "yourgmail@gmail.com") {
        await sendConfirmationEmail(reservation);
        emailSent = true;
      } else {
        console.log("Email sending skipped: Placeholder EMAIL_USER detected in env.");
      }
    } catch (emailError) {
      console.error("Email sending failed:", emailError.message);
    }

    // Populate eventId if present so the receipt can display the event details
    let populatedReservation = reservation;
    if (reservation.eventId) {
      try {
        populatedReservation = await Reservation.findById(reservation._id).populate("eventId");
      } catch (popErr) {
        console.error("Failed to populate eventId for receipt:", popErr.message);
      }
    }

    res.status(201).json({
      success: true,
      message: "Reservation confirmed.",
      emailSent,
      data: populatedReservation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /api/reservations/availability
const checkSlotAvailability = async (req, res) => {
  try {
    const { date, time, guests } = req.query;
    const result = await checkAvailability(date, time, Number(guests));
    res.json({ success: true, ...result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/reservations - admin only
const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .sort({ date: 1, time: 1 });
    res.json({ success: true, data: reservations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PATCH /api/reservations/:id/cancel
const cancelReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled" },
      { new: true }
    );
    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Reservation not found.",
      });
    }
    res.json({ success: true, data: reservation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createReservation,
  checkSlotAvailability,
  getAllReservations,
  cancelReservation,
};
