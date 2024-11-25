import axios from "axios";
import { API_URL } from "../constants";
import { checkAuth as getAuthToken } from "./authService";

// Función para obtener todas las calificaciones
export const getAllRatings = async () => {
  try {
    const response = await axios.get(`${API_URL}/ratings`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all ratings:", error.message);
    throw new Error("Could not fetch ratings");
  }
};

// Función para obtener las calificaciones de una moto específica
export const getRatingsByMotorcycle = async (motorcycleId) => {
  try {
    const response = await axios.get(
      `${API_URL}/ratings/motorcycle/${motorcycleId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching ratings for motorcycle:", error.message);
    throw new Error("Could not fetch ratings for this motorcycle");
  }
};

// Función para obtener las calificaciones de un usuario específico
export const getRatingsByUser = async (userId) => {
  try {
    const token = await getAuthToken();
    const response = await axios.get(`${API_URL}/ratings/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching ratings for user:", error.message);
    throw new Error("Could not fetch ratings for this user");
  }
};

// Función para obtener la calificación de un usuario específico para una motocicleta
export const getRatingByUserAndMotorcycle = async (userId, motorcycleId) => {
  try {
    const token = await getAuthToken();
    const response = await axios.get(
      `${API_URL}/ratings/user/${userId}/motorcycle/${motorcycleId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching rating for user and motorcycle:",
      error.message
    );
    throw new Error("Could not fetch rating for this user and motorcycle");
  }
};

// Función para obtener una calificación por ID
export const getRatingById = async (id) => {
  try {
    const token = await getAuthToken();
    const response = await axios.get(`${API_URL}/ratings/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching rating by ID:", error.message);
    throw new Error(`Could not fetch rating with ID: ${id}`);
  }
};

// Función para crear una nueva calificación
export const createRating = async (ratingData) => {
  try {
    const token = await getAuthToken();
    const response = await axios.post(`${API_URL}/ratings`, ratingData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating rating:", error.message);
    throw new Error("Could not create rating");
  }
};

// Función para actualizar una calificación existente
export const updateRating = async (id, ratingData) => {
  try {
    const token = await getAuthToken();
    const response = await axios.put(`${API_URL}/ratings/${id}`, ratingData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating rating:", error.message);
    throw new Error(`Could not update rating with ID: ${id}`);
  }
};

// Función para eliminar una calificación por ID
export const deleteRating = async (id) => {
  try {
    const token = await getAuthToken();
    const response = await axios.delete(`${API_URL}/ratings/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting rating:", error.message);
    throw new Error(`Could not delete rating with ID: ${id}`);
  }
};
