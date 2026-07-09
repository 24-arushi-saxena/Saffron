import api from "./api";

export const createReservation = async (formData) => {
  const response = await api.post("/reservations", formData);
  return response.data;
};

export const checkAvailability = async (date, time, guests) => {
  const response = await api.get("/reservations/availability", {
    params: { date, time, guests },
  });
  return response.data;
};
