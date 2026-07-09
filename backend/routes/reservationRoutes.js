const express = require("express");
const router  = express.Router();
const {
  createReservation,
  checkSlotAvailability,
  getAllReservations,
  cancelReservation,
  testEmail,
} = require("../controllers/reservationController");

router.post(  "/",                    createReservation);
router.get(   "/availability",        checkSlotAvailability);
router.get(   "/test-email",          testEmail);
router.get(   "/",                    getAllReservations);
router.patch( "/:id/cancel",          cancelReservation);

module.exports = router;
