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
import * as SecureStore from "expo-secure-store";

const RentalsHistory = () => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Fetch user data and rentals on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await SecureStore.getItemAsync("user");
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          fetchRentals(parsedUser.id);
        } else {
          Alert.alert(
            "Error",
            "Usuario no encontrado. Por favor, inicia sesión."
          );
        }
      } catch (error) {
        Alert.alert(
          "Error",
          "No se pudo recuperar la información del usuario."
        );
        setLoading(false);
      }
    };

    const fetchRentals = async (userId) => {
      try {
        const rentalsData = await getAllByUserId(userId);
        setRentals(rentalsData);
      } catch (error) {
        Alert.alert("Error", "No se pudo cargar el historial de reservas.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
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
      <Text style={styles.rentalText}>
        Fecha de inicio: {new Date(item.start_date).toLocaleDateString()}
      </Text>
      <Text style={styles.rentalText}>
        Fecha de fin: {new Date(item.end_date).toLocaleDateString()}
      </Text>
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
