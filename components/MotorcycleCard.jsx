// src/components/MotorcycleCard.js
import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import colors from "../theme/colors";
import motorcycleImg from "../assets/motorcycleImg.png";
import { Link } from "expo-router";

const MotorcycleCard = ({ motorcycle }) => {
  return (
    <Link href={`/${motorcycle.id}`} asChild>
      <Pressable>
        <View style={styles.card}>
          <Image
            source={
              motorcycle.imageUrl ? { uri: motorcycle.imageUrl } : motorcycleImg
            }
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
