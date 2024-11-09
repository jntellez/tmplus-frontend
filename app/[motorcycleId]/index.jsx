import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import colors from "../../theme/colors";
import { router, useLocalSearchParams } from "expo-router";
import { getMotorcycleById } from "../../services/motorcycleService";
import motorcycleImg from "../../assets/motorcycleImg.png";

const DetailScreen = () => {
  const { motorcycleId } = useLocalSearchParams();
  const [motorcycle, setMotorcycle] = useState({});

  const fetchMotorcycle = async (id) => {
    const data = await getMotorcycleById(id);
    setMotorcycle(data);
  };

  useEffect(() => {
    fetchMotorcycle(motorcycleId);
  }, [motorcycleId]);

  const isOwner = false; // Lógica para determinar si es el propietario

  return (
    <ScrollView style={styles.container}>
      <Image
        source={motorcycle.image ? { uri: motorcycle.image } : motorcycleImg} // Imagen de la moto o imagen de fallback
        style={styles.image}
        resizeMode="cover" // Ajustar el modo de imagen
      />

      <View style={styles.card}>
        <Text style={styles.cardHeader}>Detalles de la Motocicleta</Text>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Marca: </Text>
          <Text style={styles.cardText}>{motorcycle.brand}</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Modelo: </Text>
          <Text style={styles.cardText}>{motorcycle.model}</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Año: </Text>
          <Text style={styles.cardText}>{motorcycle.year}</Text>
        </View>
      </View>

      {/* Tarjeta para Descripción */}
      <View style={styles.card}>
        <Text style={styles.cardHeader}>Descripción</Text>
        <View style={styles.cardContent}>
          <Text style={styles.cardText}>{motorcycle.description}</Text>
        </View>
      </View>

      {/* Fila para Precio de Alquiler y Disponibilidad */}
      <View style={styles.rowCard}>
        <View style={styles.card}>
          <Text style={styles.cardHeader}>Precio de Alquiler</Text>
          <View style={styles.cardContent}>
            <Text style={styles.cardText}>${motorcycle.rental_price}</Text>
          </View>
        </View>

        {/* Tarjeta para Disponibilidad con margen superior */}
        <View style={[styles.card, styles.availabilityCard]}>
          <Text style={styles.cardHeader}>Disponibilidad</Text>
          <View style={styles.cardContent}>
            <Text style={styles.cardText}>
              {motorcycle.available ? "Disponible" : "No disponible"}
            </Text>
          </View>
        </View>
      </View>

      {/* Tarjeta para Fecha de Publicación */}
      <View style={styles.card}>
        <Text style={styles.cardHeader}>Fecha de Publicación</Text>
        <View style={styles.cardContent}>
          <Text style={styles.cardText}>
            {new Date(motorcycle.publish_date).toLocaleDateString()}
          </Text>
        </View>
      </View>

      {isOwner && (
        <View style={styles.buttonContainer}>
          <Button
            title="Editar"
            color={colors.primaryButton}
            onPress={() => {
              /* Lógica para editar */
            }}
          />
          <Button
            title="Eliminar"
            color={colors.dangerButton}
            onPress={() => {
              /* Lógica para eliminar */
            }}
          />
        </View>
      )}

      <View style={styles.rentButtonContainer}>
        <Button
          title="Alquilar Motocicleta"
          color={colors.primaryButton}
          onPress={() => router.push(`/${motorcycleId}/rents`)}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background, // Fondo oscuro
  },
  image: {
    width: "100%", // Ancho completo
    height: 200, // Altura de la imagen
    borderRadius: 10, // Bordes redondeados
    marginBottom: 16, // Espacio entre imagen y texto
  },
  card: {
    backgroundColor: colors.cardBackground, // Fondo más claro para las tarjetas
    borderRadius: 10,
    padding: 16, // Espaciado interno
    marginBottom: 16, // Espacio entre tarjetas
    elevation: 3, // Sombra para dar profundidad
  },
  cardHeader: {
    fontSize: 18, // Tamaño de fuente ajustado
    fontWeight: "bold",
    color: colors.linkColor, // Color del encabezado usando colors.linkColor
    marginBottom: 4, // Espacio debajo del encabezado
  },
  cardContent: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 8, // Espacio entre cada línea
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primaryTextLight, // Texto claro para el título
    marginRight: 8, // Espacio a la derecha del título
  },
  cardText: {
    fontSize: 16,
    color: colors.lightText || "#E0E0E0", // Cambiar a un color más claro y asegurarse de que sea legible
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  rowCard: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between", // Asegura que haya espacio entre las cards
  },
});

export default DetailScreen;
