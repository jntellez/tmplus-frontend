// src/services/userService.js
import axios from "axios";
import { API_URL } from "../constants";
import { checkAuth } from "./authService";

// Función para obtener los datos del usuario
export const getUserData = async (id) => {
  try {
    const token = await checkAuth();
    const response = await axios.get(`${API_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error);
    throw error;
  }
};

// Función para actualizar los datos del usuario
export const updateUserData = async (id, updatedData) => {
  try {
    const token = await checkAuth();
    const response = await axios.put(`${API_URL}/users/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar los datos del usuario:", error);
    throw error;
  }
};

export const updateUserPassword = async (id, data) => {
  try {
    const token = await checkAuth();
    const response = await axios.put(`${API_URL}/users/${id}/password`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la contraseña del usuario:", error);
    throw error;
  }
};
