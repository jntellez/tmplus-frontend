// RentalsHistory.jsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { getAllByUserId } from "../../services/rentalService";
import colors from "../../theme/colors";
import { getStorageItem } from "../../services/storageService";
import RentalCard from "../../components/RentalCard";

const RentalsHistory = () => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getStorageItem("user");
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Reservas</Text>
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <FlatList
          data={rentals}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <RentalCard
              rental={item}
              onPress={() => router.push(`/rental/${item.id}`)}
            />
          )}
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
  noRentalsText: {
    textAlign: "center",
    color: colors.secondaryTextLight,
    fontSize: 16,
    marginTop: 20,
  },
});

export default RentalsHistory;
