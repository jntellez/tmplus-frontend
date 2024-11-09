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
    {
      label: "Estado",
      value: rental.status.charAt(0).toUpperCase() + rental.status.slice(1),
    },
    {
      label: "Fecha de creación",
      value: new Date(rental.rental_date).toLocaleDateString(),
    },
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
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primaryTextLight,
    marginBottom: 16,
    textAlign: "center",
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  cardHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.linkColor,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    color: colors.lightText || "#E0E0E0",
  },
  errorText: {
    textAlign: "center",
    color: colors.errorText,
    fontSize: 16,
    marginTop: 20,
  },
});

export default RentalDetail;
