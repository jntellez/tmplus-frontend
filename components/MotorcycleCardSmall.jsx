import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import colors from "../theme/colors";
import defaultMotoImage from "../assets/motorcycleImg.png";
import { SERVER_URL } from "../constants"; // Asegúrate de importar el servidor

const MotorcycleCardSmall = ({ motorcycle, onPress }) => {
  // Verificar si 'motorcycle.image' está disponible y es una URL completa
  const imageUrl =
    motorcycle?.images && motorcycle.images.length > 0
      ? { uri: `${SERVER_URL}${motorcycle.images[0]}` } // Concatenar la URL base con la imagen
      : defaultMotoImage; // Si no hay imágenes, usar la imagen por defecto

  return (
    <TouchableOpacity style={styles.motorcycleCard} onPress={onPress}>
      <Text style={styles.cardHeader}>Información de la Motocicleta</Text>
      <View style={styles.motorcycleInfoContainer}>
        <Image
          source={imageUrl} // Usar la URL de la imagen concatenada o la imagen por defecto
          style={styles.motorcycleImage}
        />
        <View style={styles.motorcycleDetails}>
          <Text style={styles.cardText}>
            <Text style={styles.keyBold}>Marca: </Text>
            {motorcycle.brand}
          </Text>
          <Text style={styles.cardText}>
            <Text style={styles.keyBold}>Modelo: </Text>
            {motorcycle.model}
          </Text>
          <Text style={styles.cardText}>
            <Text style={styles.keyBold}>Año: </Text>
            {motorcycle.year}
          </Text>
          <Text style={styles.cardText}>
            <Text style={styles.keyBold}>Precio/día: </Text>${" "}
            {motorcycle.rental_price}
          </Text>
        </View>
      </View>
      <Icon
        name="arrow-forward-ios"
        size={16}
        color={colors.primaryTextLight}
        style={styles.arrowIcon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  motorcycleCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    position: "relative",
  },
  motorcycleInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  motorcycleImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 16,
  },
  motorcycleDetails: {
    flex: 1,
  },
  cardHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.linkColor,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    color: colors.lightText,
    marginBottom: 4,
  },
  keyBold: {
    fontWeight: "bold",
  },
  arrowIcon: {
    position: "absolute",
    top: 16,
    right: 16,
  },
});

export default MotorcycleCardSmall;
