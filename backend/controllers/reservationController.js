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

    // send confirmation email asynchronously in the background so it doesn't block client response
    if (process.env.EMAIL_USER && process.env.EMAIL_USER !== "yourgmail@gmail.com") {
      sendConfirmationEmail(reservation)
        .then(() => console.log("Confirmation email sent successfully in the background."))
        .catch((emailError) => console.error("Background email sending failed:", emailError.message));
    } else {
      console.log("Email sending skipped: Placeholder EMAIL_USER detected in env.");
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
      emailSent: true,
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

const testEmail = async (req, res) => {
  try {
    const dummyReservation = {
      name: "Saffron Test Guest",
      email: req.query.email || process.env.EMAIL_USER || "saffron04070@gmail.com",
      date: new Date(),
      time: "8:00 PM",
      guests: 2,
      occasion: "Testing Connection",
      confirmationCode: "TEST-12345",
      preOrderedDishes: []
    };

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.status(400).json({
        success: false,
        message: "Missing environment variables. Make sure EMAIL_USER and EMAIL_PASS are set on Render.",
        envUserSet: !!process.env.EMAIL_USER,
        envPassSet: !!process.env.EMAIL_PASS
      });
    }

    await sendConfirmationEmail(dummyReservation);

    res.json({
      success: true,
      message: "Test email sent successfully!",
      recipient: dummyReservation.email,
      sender: process.env.EMAIL_USER
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Email sending failed.",
      error: error.message,
      env: {
        EMAIL_USER: process.env.EMAIL_USER,
        hasPass: !!process.env.EMAIL_PASS
      }
    });
  }
};

module.exports = {
  createReservation,
  checkSlotAvailability,
  getAllReservations,
  cancelReservation,
  testEmail,
};
