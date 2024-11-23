import axios from "axios";
import { checkAuth } from "./authService";
import { API_URL } from "../constants";

// Función para obtener todas las entregas
export const getDeliveries = async () => {
  try {
    const token = await checkAuth();
    const response = await axios.get(`${API_URL}/deliveries`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching deliveries:", error);
    throw error;
  }
};

// Función para obtener una entrega específica por ID
export const getDeliveryById = async (id) => {
  try {
    const token = await checkAuth();
    const response = await axios.get(`${API_URL}/deliveries/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching delivery with ID ${id}:`, error);
    throw error;
  }
};

// Función para crear una nueva entrega
export const createDelivery = async (deliveryData) => {
  try {
    const token = await checkAuth();
    const response = await axios.post(`${API_URL}/deliveries`, deliveryData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating delivery:", error);
    throw error;
  }
};

// Función para actualizar una entrega
export const updateDelivery = async (id, updatedData) => {
  try {
    const token = await checkAuth();
    const response = await axios.put(
      `${API_URL}/deliveries/${id}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating delivery with ID ${id}:`, error);
    throw error;
  }
};

// Función para eliminar una entrega
export const deleteDelivery = async (id) => {
  try {
    const token = await checkAuth();
    const response = await axios.delete(`${API_URL}/deliveries/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting delivery with ID ${id}:`, error);
    throw error;
  }
};
