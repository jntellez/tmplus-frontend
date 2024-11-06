import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

export default function IndexScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      // Aquí podrías verificar si el usuario está autenticado.
      // Por ejemplo, podrías revisar si hay un token almacenado.
      const isAuthenticated = false; // Cambia esto según tu lógica de autenticación

      if (isAuthenticated) {
        router.replace("/home"); // Redirige a la pantalla principal si está autenticado
      } else {
        router.replace("/login"); // Redirige a la pantalla de login si no está autenticado
      }

      setLoading(false); // Detiene el estado de carga
    };

    checkAuthentication();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  return null; // Devolver null ya que el uso de `router.replace` maneja la navegación
}
