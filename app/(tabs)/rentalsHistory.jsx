import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { getAllByUserId } from "../../services/rentalService";
import colors from "../../theme/colors";

const RentalsHistory = () => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const data = await getAllByUserId(1);
        setRentals(data);
      } catch (error) {
        Alert.alert("Error", "No se pudo cargar el historial de reservas.");
      } finally {
        setLoading(false);
      }
    };

    fetchRentals();
  }, []);

  const handlePress = (rentalId) => {
    router.push(`/rental/${rentalId}`); // Navega a RentalDetail con el ID de alquiler
  };

  const renderRental = ({ item }) => (
    <TouchableOpacity
      onPress={() => handlePress(item.id)}
      style={styles.rentalItem}
    >
      <Text style={styles.rentalText}>Cliente: {item.customer_name}</Text>
      <Text style={styles.rentalText}>Fecha de inicio: {item.start_date}</Text>
      <Text style={styles.rentalText}>Fecha de fin: {item.end_date}</Text>
      <Text style={styles.rentalText}>Precio total: ${item.total_price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Reservas</Text>
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <FlatList
          data={rentals}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderRental}
          ListEmptyComponent={
            <Text style={styles.noRentalsText}>
              No hay reservas disponibles
            </Text>
          }
        />
      )}
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
  rentalItem: {
    backgroundColor: colors.cardBackground,
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderColor: colors.borderColor,
    borderWidth: 1,
  },
  rentalText: {
    color: colors.primaryTextLight,
    fontSize: 16,
    marginBottom: 4,
  },
  noRentalsText: {
    textAlign: "center",
    color: colors.secondaryTextLight,
    fontSize: 16,
    marginTop: 20,
  },
});

export default RentalsHistory;
