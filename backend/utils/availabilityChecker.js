const Reservation = require("../models/Reservation");

const MAX_COVERS_PER_SLOT = 20;

const checkAvailability = async (date, time, guests) => {
  // find all confirmed reservations for this date + time
  const existing = await Reservation.find({
    date: new Date(date),
    time: time,
    status: "confirmed",
  });

  // count total guests already booked in this slot
  const totalBooked = existing.reduce((sum, r) => sum + r.guests, 0);

  // check if adding new guests would exceed limit
  const isAvailable = totalBooked + guests <= MAX_COVERS_PER_SLOT;

  return {
    isAvailable,
    totalBooked,
    remaining: MAX_COVERS_PER_SLOT - totalBooked,
  };
};

module.exports = checkAvailability;
