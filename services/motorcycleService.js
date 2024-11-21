import axios from "axios";
import { API_URL } from "../constants";
import { checkAuth } from "./authService";

export const getMotorcycles = async (page = 1, limit = 5) => {
  try {
    const response = await axios.get(
      `${API_URL}/motorcycles?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching motorcycles:", error);
    throw error;
  }
};

// Función para obtener todas las motocicletas de un usuario
export const getMotorcyclesByUserId = async (userId) => {
  try {
    const token = await checkAuth();
    const response = await axios.get(`${API_URL}/motorcycles/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
    console.log(response);
  } catch (error) {
    console.error("Error fetching motorcycles by user ID:", error);
    throw error;
  }
};

export const getMotorcycleById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/motorcycles/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching motorcycle by id:", error);
    throw error;
  }
};

// Función para crear una nueva moto
export const createMotorcycle = async (motorcycleData) => {
  try {
    const token = await checkAuth();
    const response = await axios.post(
      `${API_URL}/motorcycles`,
      motorcycleData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating motorcycle:", error);
    throw error;
  }
};

// Función para crear la motocicleta y luego agregar las imágenes
export const createMotorcycleWithImages = async (motorcycleData, images) => {
  try {
    // Paso 1: Crear la motocicleta
    const motorcycle = await createMotorcycle(motorcycleData);
    // Paso 2: Preparar el FormData para las imágenes
    const formData = new FormData();
    images.forEach((uri) => {
      const filename = uri.split("/").pop();
      const type = `image/${filename.split(".").pop()}`;
      formData.append("images", {
        uri,
        name: filename,
        type,
      });
    });

    // Paso 3: Agregar las imágenes asociadas a la motocicleta
    if (formData.has("images")) {
      const imagesResponse = await addMotorcycleImage(motorcycle.id, formData);
    }

    return motorcycle; // Retorna la motocicleta creada
  } catch (error) {
    console.error("Error creating motorcycle and adding images:", error);
    throw error;
  }
};

// Función para actualizar una moto existente
export const updateMotorcycle = async (id, motorcycleData) => {
  try {
    const token = await checkAuth();
    const response = await axios.put(
      `${API_URL}/motorcycles/${id}`,
      motorcycleData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating motorcycle:", error);
    throw error;
  }
};

// Función para eliminar una moto
export const deleteMotorcycle = async (id) => {
  try {
    const token = await checkAuth();
    const response = await axios.delete(`${API_URL}/motorcycles/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting motorcycle:", error);
    throw error;
  }
};

// Función para obtener las imágenes de una motocicleta
export const getMotorcycleImages = async (motorcycleId) => {
  try {
    const token = await checkAuth();
    const response = await axios.get(
      `${API_URL}/motorcycles/${motorcycleId}/images`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching motorcycle images:", error);
    throw error;
  }
};

// Función para agregar una imagen a la motocicleta
export const addMotorcycleImage = async (motorcycleId, imageData) => {
  try {
    const token = await checkAuth();
    const response = await axios.post(
      `${API_URL}/motorcycles/${motorcycleId}/images`,
      imageData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding image to motorcycle:", error);
    throw error;
  }
};

// Función para eliminar una imagen de una motocicleta
export const deleteMotorcycleImage = async (imageId) => {
  try {
    const token = await checkAuth();
    const response = await axios.delete(
      `${API_URL}/motorcycles/images/${imageId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting motorcycle image:", error);
    throw error;
  }
};

// Función para eliminar todas las imágenes asociadas a una motocicleta
export const deleteMotorcycleImages = async (motorcycleId) => {
  try {
    // Obtener todas las imágenes asociadas a la motocicleta
    const images = await getMotorcycleImages(motorcycleId);

    // Si no hay imágenes, no hacer nada
    if (images.length === 0) {
      console.log("No hay imágenes para eliminar.");
      return;
    }

    // Eliminar cada imagen asociada a la motocicleta
    for (let image of images) {
      await deleteMotorcycleImage(image.id);
    }
  } catch (error) {
    console.error("Error al eliminar las imágenes de la motocicleta:", error);
    throw error;
  }
};
