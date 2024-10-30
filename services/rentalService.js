// rentalService.js
import axios from "axios";

// URL base de la API
const API_URL = "http://192.168.137.1:5000/api/rentals";

// Función para obtener todas las reservas
export const getAllRentals = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching rentals:", error.message);
    throw new Error("Could not fetch rentals");
  }
};

// Función para obtener una reserva específica por ID
export const getRentalById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching rental by ID:", error.message);
    throw new Error(`Could not fetch rental with ID: ${id}`);
  }
};

// Función para crear una nueva reserva
export const createRental = async (rentalData) => {
  try {
    const response = await axios.post(API_URL, rentalData);
    return response.data;
  } catch (error) {
    console.error("Error creating rental:", error.message);
    throw new Error("Could not create rental");
  }
};

// Función para actualizar una reserva existente
export const updateRental = async (id, rentalData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, rentalData);
    return response.data;
  } catch (error) {
    console.error("Error updating rental:", error.message);
    throw new Error(`Could not update rental with ID: ${id}`);
  }
};

// Función para eliminar una reserva por ID
export const deleteRental = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting rental:", error.message);
    throw new Error(`Could not delete rental with ID: ${id}`);
  }
};
