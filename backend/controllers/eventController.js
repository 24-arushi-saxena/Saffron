const Event = require("../models/Event");
const Inquiry = require("../models/Inquiry");
const { sendInquiryNotification, sendInquiryAcknowledgement } = require("../utils/sendEmail");

// GET /api/events
// Returns all active events, sorted by date ascending
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({ isActive: true }).sort({ date: 1 });
    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: Could not fetch events.",
      error: error.message,
    });
  }
};

// GET /api/events/upcoming
// Returns the next 2 nearest active events
const getUpcomingEvents = async (req, res) => {
  try {
    const events = await Event.find({ isActive: true })
      .sort({ date: 1 })
      .limit(2);
    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: Could not fetch upcoming events.",
      error: error.message,
    });
  }
};

// GET /api/events/:id
// Returns single event details
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }
    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: Could not fetch event.",
      error: error.message,
    });
  }
};

// POST /api/events/inquiry
// Saves inquiry and sends notification email to owner and acknowledgement to guest
const submitInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.create(req.body);

    // Send email to owner
    let ownerEmailSent = false;
    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_USER !== "yourgmail@gmail.com") {
        await sendInquiryNotification(inquiry);
        ownerEmailSent = true;
      }
    } catch (err) {
      console.error("Owner inquiry notification failed:", err.message);
    }

    // Send acknowledgement to guest
    let guestEmailSent = false;
    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_USER !== "yourgmail@gmail.com") {
        await sendInquiryAcknowledgement(inquiry);
        guestEmailSent = true;
      }
    } catch (err) {
      console.error("Guest inquiry acknowledgement failed:", err.message);
    }

    res.status(201).json({
      success: true,
      message: "Inquiry submitted successfully.",
      data: inquiry,
      emails: {
        ownerNotification: ownerEmailSent,
        guestAcknowledgement: guestEmailSent,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllEvents,
  getUpcomingEvents,
  getEventById,
  submitInquiry,
};
