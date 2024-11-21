import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import colors from "../../theme/colors";
import motorcycleImg from "../../assets/motorcycleImg.png"; // Imagen por defecto
import { Link } from "expo-router";
import { SERVER_URL } from "../../constants";

const MotorcycleCard = ({ motorcycle }) => {
  // Asegurarse de que 'motorcycle.images' existe y tiene imágenes
  const firstImageUrl =
    motorcycle?.images && motorcycle.images.length > 0
      ? { uri: `${SERVER_URL}${motorcycle.images[0]}` } // Concatenar la URL base con la imagen
      : motorcycleImg; // Si no hay imágenes, usar la imagen por defecto

  return (
    <Link href={`/${motorcycle.id}`} asChild>
      <Pressable>
        <View style={styles.card}>
          <Image
            source={firstImageUrl} // Usar la primera imagen si existe
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.title}>
            {motorcycle.brand} {motorcycle.model}
          </Text>
          <Text style={styles.year}>{motorcycle.year}</Text>
          <Text style={styles.price}>${motorcycle.rental_price}/día</Text>
          <Text style={styles.description}>{motorcycle.description}</Text>
        </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground, // Fondo de la tarjeta más oscuro
    borderColor: colors.borderColor,
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    margin: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: 160,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primaryTextLight, // Texto claro
  },
  year: {
    color: colors.secondaryTextLight, // Texto secundario claro
  },
  price: {
    fontWeight: "bold",
    color: colors.primaryButton, // Color de precio
  },
  description: {
    color: colors.secondaryTextLight, // Texto secundario
  },
});

export default MotorcycleCard;
