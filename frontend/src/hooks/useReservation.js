import { useState } from "react";
import { createReservation, checkAvailability } from "../services/reservationService";

export const useReservation = () => {
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState(null);
  const [confirmed, setConfirmed]   = useState(null);

  const submitReservation = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await createReservation(formData);
      setConfirmed(result.data);
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const verifyAvailability = async (date, time, guests) => {
    try {
      const result = await checkAvailability(date, time, guests);
      return result;
    } catch (err) {
      return { isAvailable: false };
    }
  };

  return { loading, error, confirmed, submitReservation, verifyAvailability };
};
