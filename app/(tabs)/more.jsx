import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import colors from "../../theme/colors";
import ProfileCard from "../../components/more/ProfileCard";
import OptionCard from "../../components/more/OptionCard";
import { Ionicons } from "@expo/vector-icons";

export default function MoreScreen() {
  const router = useRouter();

  const user = {
    name: "Juan Téllez Tinajero", // Datos del usuario
    email: "juan@example.com",
  };

  return (
    <ScrollView style={styles.container}>
      {/* Componente de tarjeta de perfil */}
      <ProfileCard
        name={user.name}
        email={user.email}
        onViewProfile={() => router.push("/profile")}
      />

      {/* Opciones de la disponibles */}
      <OptionCard
        title="¿Cómo ser arrendador?"
        icon={({ size, color }) => (
          <Ionicons name="help-circle-outline" color={color} size={size} />
        )}
        route="/more/upgradeToLandlord"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
});
