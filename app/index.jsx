import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { checkAuth } from "../services/authService"; // Importar el servicio de autenticación
import { useRouter } from "expo-router";

export default function AuthLoadingScreen() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const token = await checkAuth(); // Verificar si hay un token de autenticación

        if (token) {
          // Si hay token, redirigir al Home
          router.replace("/home");
        } else {
          // Si no hay token, redirigir al login
          router.replace("/login");
        }
      } catch (error) {
        console.error("Error al verificar autenticación:", error);
        router.replace("/login"); // En caso de error, redirigir al login
      }

      setLoading(false); // Terminar el estado de carga
    };

    verifyAuth();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0d1117", // Fondo oscuro
  },
  loadingText: {
    marginTop: 10,
    color: "#c9d1d9", // Color claro para el texto
  },
});
