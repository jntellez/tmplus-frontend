// ProfileHeader.jsx
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import DefaultUserImage from "../assets/default-user-image.webp"; // Imagen por defecto
import colors from "../theme/colors"; // Asegúrate de que los colores estén bien definidos en tu tema

export default function ProfileHeader({ joinDate }) {
  // Convertir la fecha de creación a un formato legible
  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const formattedDate = `${
    monthNames[joinDate.getMonth()]
  } de ${joinDate.getFullYear()}`;

  return (
    <View style={styles.container}>
      {/* Imagen de perfil */}
      <View style={styles.profileImageContainer}>
        <Image source={DefaultUserImage} style={styles.profileImage} />
      </View>

      {/* Texto de la fecha de creación */}
      <Text style={styles.joinDateText}>Te uniste desde {formattedDate}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImageContainer: {
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  joinDateText: {
    textAlign: "center",
    fontSize: 14,
    color: colors.secondaryTextLight,
  },
});
