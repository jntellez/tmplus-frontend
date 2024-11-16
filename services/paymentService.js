import axios from "axios";
import { API_URL } from "../constants";
import { checkAuth as getAuthToken } from "./authService";

export const createPayment = async (paymentData) => {
  try {
    // Obtener el token de autenticación
    const token = await getAuthToken();

    if (!token) {
      throw new Error("No se encontró el token de autenticación.");
    }

    // Realizar la solicitud al endpoint de pago
    const response = await axios.post(
      `${API_URL}/payments/create`,
      paymentData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Añadir el token al encabezado
        },
      }
    );

    return response.data; // Devuelve los datos de la preferencia de pago
  } catch (error) {
    console.error("Error creando el pago:", error);
    throw error;
  }
};
