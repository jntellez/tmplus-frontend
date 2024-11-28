import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Dimensions,
  Platform,
} from "react-native";
import colors from "../../theme/colors";
import motorcycleImg from "../../assets/motorcycleImg.png"; // Imagen por defecto
import { Link } from "expo-router";
import { SERVER_URL } from "../../constants";

const { width } = Dimensions.get("window"); // Obtener el ancho de la pantalla

const MotorcycleCard = ({ motorcycle }) => {
  // Asegurarse de que 'motorcycle.images' existe y tiene imágenes
  const firstImageUrl =
    motorcycle?.images && motorcycle.images.length > 0
      ? { uri: `${SERVER_URL}${motorcycle.images[0]}` } // Concatenar la URL base con la imagen
      : motorcycleImg; // Si no hay imágenes, usar la imagen por defecto

  return (
    <Link href={`/${motorcycle.id}`} asChild>
      <Pressable style={styles.card}>
        <View>
          <Image
            source={firstImageUrl} // Usar la primera imagen si existe
            style={styles.image}
            resizeMode="cover" // Ajusta la imagen para cubrir el área asignada
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              {motorcycle.brand} {motorcycle.model}
            </Text>
            <Text style={styles.year}>{motorcycle.year}</Text>
            <Text style={styles.price}>${motorcycle.rental_price}/día</Text>
            <Text style={styles.description}>{motorcycle.description}</Text>
          </View>
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
    width: width < 768 ? "100%" : "45%", // Responsividad: 100% en móvil, 40% en escritorio
    height: "auto",
  },
  image: {
    width: "100%", // Ancho completo de la tarjeta
    height: 160, // Altura fija para la imagen
    borderRadius: 8,
    marginBottom: 8,
  },
  textContainer: {
    flex: 1, // Permite que el contenido de texto ocupe el espacio restante
    justifyContent: "space-between", // Distribuye el contenido de manera uniforme
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
    marginTop: 8,
  },
});

export default MotorcycleCard;
