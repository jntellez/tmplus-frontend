import { API_URL } from "../constants";
import * as SecureStore from "expo-secure-store";

// Función para hacer login
export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    // Si la respuesta es exitosa, obtener el token
    if (response.ok) {
      const data = await response.json();
      const { token } = data;

      // Guardar el token en el Secure Store
      await SecureStore.setItemAsync("authToken", token);
      return token;
    } else {
      // Si la respuesta no es exitosa, lanzar error
      const error = await response.json();
      throw new Error(error.message || "Error en el login");
    }
  } catch (error) {
    console.error("Error al hacer login:", error);
    throw error;
  }
};

// Función para registrar un nuevo usuario
export const register = async (name, email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    // Si la respuesta es exitosa, obtener el token
    if (response.ok) {
      const data = await response.json();
      const { token } = data;

      // Guardar el token en el Secure Store
      await SecureStore.setItemAsync("authToken", token);
      return token;
    } else {
      // Si la respuesta no es exitosa, lanzar error
      const error = await response.json();
      throw new Error(error.message || "Error al registrar el usuario");
    }
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    throw error;
  }
};

// Función para verificar si el usuario está autenticado
export const checkAuth = async () => {
  try {
    const token = await SecureStore.getItemAsync("authToken");
    if (token) {
      // Si hay token, la autenticación es válida
      return token;
    } else {
      // Si no hay token, el usuario no está autenticado
      return null;
    }
  } catch (error) {
    console.error("Error al verificar la autenticación:", error);
    throw error;
  }
};

// Función para hacer logout
export const logout = async () => {
  try {
    await SecureStore.deleteItemAsync("authToken");
  } catch (error) {
    console.error("Error al hacer logout:", error);
    throw error;
  }
};

// Función para decodificar el payload de un JWT
export const parseJwt = (token) => {
  try {
    const base64Url = token.split(".")[1]; // Separa el payload
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload); // Devuelve el objeto del payload
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
