const express = require("express");
const router = express.Router();
const {
  getAllEvents,
  getUpcomingEvents,
  getEventById,
  submitInquiry,
} = require("../controllers/eventController");

// GET /api/events - Get all active events
router.get("/", getAllEvents);

// GET /api/events/upcoming - Get 2 nearest upcoming events
router.get("/upcoming", getUpcomingEvents);

// GET /api/events/:id - Get single event details
router.get("/:id", getEventById);

// POST /api/events/inquiry - Submit private celebration inquiry
router.post("/inquiry", submitInquiry);

module.exports = router;
