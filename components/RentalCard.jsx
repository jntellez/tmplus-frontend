// RentalCard.jsx
import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import colors from "../theme/colors";
import defaultMotorcycleImg from "../assets/motorcycleImg.png";

const statusTranslations = {
  completed: "Completado",
  confirmed: "Confirmado",
  pending: "Pendiente",
  cancelled: "Cancelado",
};

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "completed":
      return colors.completed;
    case "confirmed":
      return colors.confirmed;
    case "pending":
      return colors.pending;
    case "cancelled":
      return colors.cancelled;
    default:
      return colors.lightText;
  }
};

const RentalCard = ({ rental, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.rentalItem}>
    <Image
      source={
        rental.motorcycle_image
          ? { uri: rental.motorcycle_image }
          : defaultMotorcycleImg
      }
      style={styles.motorcycleImage}
    />
    <View style={styles.detailsContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.creationDateText}>
          {new Date(rental.rental_date).toLocaleDateString()}
        </Text>
        <Text
          style={[styles.statusText, { color: getStatusColor(rental.status) }]}
        >
          {statusTranslations[rental.status.toLowerCase()] ||
            rental.status.charAt(0).toUpperCase() + rental.status.slice(1)}
        </Text>
      </View>
      <Text style={styles.rentalText}>
        Fecha de inicio: {new Date(rental.start_date).toLocaleDateString()}
      </Text>
      <Text style={styles.rentalText}>
        Fecha de fin: {new Date(rental.end_date).toLocaleDateString()}
      </Text>
      <Text style={styles.rentalText}>Precio total: ${rental.total_price}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  rentalItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: colors.cardBackground,
    padding: 12,
    paddingBottom: 6,
    borderRadius: 8,
    marginBottom: 15,
    borderColor: colors.borderColor,
    borderWidth: 1,
    position: "relative",
  },
  motorcycleImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  detailsContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
    marginTop: -2,
  },
  creationDateText: {
    color: colors.secondaryTextLight,
    fontSize: 14,
  },
  rentalText: {
    color: colors.primaryTextLight,
    fontSize: 16,
    marginBottom: 4,
  },
  statusText: {
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default RentalCard;
