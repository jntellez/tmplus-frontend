import React from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import colors from "../../theme/colors";
import ProfileCard from "../../components/more/ProfileCard";

export default function MoreScreen() {
  const router = useRouter();

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
        onViewProfile={() => router.push("/profile")}
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
