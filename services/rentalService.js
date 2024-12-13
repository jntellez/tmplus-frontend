import axios from "axios";
import { API_URL } from "../constants";
import { checkAuth as getAuthToken } from "./authService";

// Función para obtener todas las reservas de un usuario específico
export const getAllByUserId = async (userId) => {
  try {
    const token = await getAuthToken();
    const response = await axios.get(`${API_URL}/rentals/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching rentals by user ID:", error.message);
    throw new Error("Could not fetch rentals for the specified user");
  }
};

// Función para obtener todas las reservas de una motocicleta específica
export const getAllByMotorcycleId = async (motorcycleId) => {
  try {
    const token = await getAuthToken();
    const response = await axios.get(
      `${API_URL}/rentals/motorcycle/${motorcycleId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching rentals by motorcycle ID:", error.message);
    throw new Error("Could not fetch rentals for the specified motorcycle");
  }
};

// Función para obtener una reserva específica por ID
export const getRentalById = async (id) => {
  try {
    const token = await getAuthToken();
    const response = await axios.get(`${API_URL}/rentals/rental/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching rental by ID:", error.message);
    throw new Error(`Could not fetch rental with ID: ${id}`);
  }
};

// Función para crear una nueva reserva
export const createRental = async (rentalData) => {
  try {
    const token = await getAuthToken();
    const response = await axios.post(`${API_URL}/rentals`, rentalData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating rental:", error.message);
    throw new Error("Could not create rental");
  }
};

// Función para actualizar una reserva existente
export const updateRental = async (id, rentalData) => {
  try {
    const token = await getAuthToken();
    const response = await axios.put(`${API_URL}/rentals/${id}`, rentalData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating rental:", error.message);
    throw new Error(`Could not update rental with ID: ${id}`);
  }
};

// Función para eliminar una reserva por ID
export const deleteRental = async (id) => {
  try {
    const token = await getAuthToken();
    const response = await axios.delete(`${API_URL}/rentals/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting rental:", error.message);
    throw new Error(`Could not delete rental with ID: ${id}`);
  }
};
