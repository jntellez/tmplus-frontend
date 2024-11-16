import React from "react";
import { View, Button, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import colors from "../../theme/colors";
import ProfileCard from "../../components/more/ProfileCard";

export default function MoreScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("authToken"); // Elimina el token
    router.replace("/login"); // Redirige al login
  };

  const handleViewProfile = () => {
    router.push("/profile"); // Navega a la ruta de perfil
  };

  const user = {
    name: "Juan Téllez Tinajero", // Datos del usuario
    email: "juan@example.com",
  };

  return (
    <View style={styles.container}>
      {/* Componente de tarjeta de perfil */}
      <ProfileCard
        name={user.name}
        email={user.email}
        onViewProfile={handleViewProfile}
      />

      {/* Botón de Cerrar Sesión */}
      <Button
        title="Cerrar Sesión"
        onPress={handleLogout}
        color={colors.primaryButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
});
