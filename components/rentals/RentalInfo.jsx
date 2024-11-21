import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../theme/colors";

// Mapa de traducciones de estados
const statusTranslations = {
  completed: "Completado",
  confirmed: "Confirmado",
  pending: "Pendiente",
  cancelled: "Cancelado",
};

// Función para obtener el color del estado
const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "completed":
      return colors.completed; // Gris
    case "confirmed":
      return colors.confirmed; // Verde
    case "pending":
      return colors.pending; // Amarillo
    case "cancelled":
      return colors.cancelled; // Rojo
    default:
      return colors.lightText; // Gris
  }
};

const RentalInfo = ({ rental, customerName }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle del Alquiler</Text>

      {/* Cliente */}
      <View style={styles.fullWidthCard}>
        <Text style={styles.cardHeader}>Cliente</Text>
        <Text style={styles.cardText}>{customerName}</Text>
      </View>

      {/* Fechas de inicio y fin */}
      <View style={styles.dateContainer}>
        <View style={styles.card}>
          <Text style={styles.cardHeader}>Fecha de inicio</Text>
          <Text style={styles.cardText}>
            {new Date(rental.start_date).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardHeader}>Fecha de fin</Text>
          <Text style={styles.cardText}>
            {new Date(rental.end_date).toLocaleDateString()}
          </Text>
        </View>
      </View>

      {/* Precio total y estado */}
      <View style={styles.priceAndStatusContainer}>
        <View style={styles.card}>
          <Text style={styles.cardHeader}>Precio total</Text>
          <Text style={styles.cardText}>${rental.total_price}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardHeader}>Estado</Text>
          <Text
            style={[styles.cardText, { color: getStatusColor(rental.status) }]}
          >
            {/* Usar la traducción para el estado */}
            {statusTranslations[rental.status.toLowerCase()] ||
              rental.status.charAt(0).toUpperCase() + rental.status.slice(1)}
          </Text>
        </View>
      </View>

      {/* Fecha de alquiler */}
      <View style={styles.fullWidthCard}>
        <Text style={styles.cardHeader}>Fecha de alquiler</Text>
        <Text style={styles.cardText}>
          {new Date(rental.rental_date).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primaryTextLight,
    marginBottom: 16,
    textAlign: "center",
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  priceAndStatusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
    padding: 16,
    elevation: 3,
    width: "48%", // Ajusta para que las tarjetas estén en fila
  },
  fullWidthCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    width: "100%", // Asegura que las tarjetas de esta sección ocupen todo el ancho
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
    marginBottom: 4,
  },
});

export default RentalInfo;
