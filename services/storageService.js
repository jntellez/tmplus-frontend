import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

/**
 * @typedef {"authToken" | "user" } StorageKey
 */

/**
 * Guarda un valor con una clave específica.
 * @param {StorageKey} key - La clave para almacenar el valor.
 * @param {string} value - El valor a almacenar.
 */
async function setStorageItem(key, value) {
  if (Platform.OS === "web") {
    localStorage.setItem(key, value);
  } else {
    await SecureStore.setItemAsync(key, value);
  }
}

/**
 * Obtiene un valor usando una clave específica.
 * @param {StorageKey} key - La clave del valor que deseas obtener.
 * @returns {Promise<string | null>} - El valor almacenado o `null` si no existe.
 */
async function getStorageItem(key) {
  if (Platform.OS === "web") {
    return localStorage.getItem(key);
  } else {
    return await SecureStore.getItemAsync(key);
  }
}

/**
 * Elimina un valor usando una clave específica.
 * @param {StorageKey} key - La clave del valor que deseas eliminar.
 */
async function deleteStorageItem(key) {
  if (Platform.OS === "web") {
    localStorage.removeItem(key);
  } else {
    await SecureStore.deleteItemAsync(key);
  }
}

export { setStorageItem, getStorageItem, deleteStorageItem };
