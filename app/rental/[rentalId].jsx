import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { getRentalById } from "../../services/rentalService";
import colors from "../../theme/colors";
import { useLocalSearchParams } from "expo-router";

const RentalDetail = () => {
  const { rentalId } = useLocalSearchParams();
  const [rental, setRental] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRental = async () => {
      try {
        const data = await getRentalById(rentalId);
        setRental(data);
      } catch (error) {
        console.error("Error fetching rental details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRental();
  }, [rentalId]);

  if (loading) {
    return <ActivityIndicator size="large" color={colors.primary} />;
  }

  if (!rental) {
    return (
      <Text style={styles.errorText}>
        No se pudo cargar la información del alquiler.
      </Text>
    );
  }

  const details = [
    { label: "Cliente", value: rental.customer_name },
    {
      label: "Fecha de inicio",
      value: new Date(rental.start_date).toLocaleDateString(),
    },
    {
      label: "Fecha de fin",
      value: new Date(rental.end_date).toLocaleDateString(),
    },
    { label: "Precio total", value: `$${rental.total_price}` },
    // Agrega otros detalles aquí si es necesario
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle del Alquiler</Text>
      {details.map((detail, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardHeader}>{detail.label}</Text>
          <Text style={styles.cardText}>{detail.value}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background, // Fondo oscuro
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primaryTextLight,
    marginBottom: 16,
    textAlign: "center",
  },
  card: {
    backgroundColor: colors.cardBackground, // Fondo más claro para cada tarjeta
    borderRadius: 10,
    padding: 16, // Espaciado interno
    marginBottom: 16, // Espacio entre tarjetas
    elevation: 3, // Sombra para dar profundidad
  },
  cardHeader: {
    fontSize: 18, // Tamaño de fuente para encabezados
    fontWeight: "bold",
    color: colors.linkColor, // Color del encabezado
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    color: colors.lightText || "#E0E0E0", // Texto claro para contenido
  },
  errorText: {
    textAlign: "center",
    color: colors.errorText,
    fontSize: 16,
    marginTop: 20,
  },
});

export default RentalDetail;
