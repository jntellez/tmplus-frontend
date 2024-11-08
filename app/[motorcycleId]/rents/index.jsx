import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { createRental } from "../../../services/rentalService";
import colors from "../../../theme/colors";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";

const Rents = () => {
  const { motorcycleId } = useLocalSearchParams();
  const [rentalDate, setRentalDate] = useState("");
  const [duration, setDuration] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [dailyRentalPrice, setDailyRentalPrice] = useState(100);
  const router = useRouter();

  const calculateEndDate = (startDate, days) => {
    const start = new Date(startDate);
    start.setDate(start.getDate() + parseInt(days));
    return start.toISOString().split("T")[0];
  };

  const handleCreateRental = async () => {
    if (!rentalDate || !duration || !customerName) {
      Alert.alert("Error", "Por favor completa todos los campos.");
      return;
    }

    const endDate = calculateEndDate(rentalDate, duration);
    const totalPrice = dailyRentalPrice * parseInt(duration);
    const userData = JSON.parse(await SecureStore.getItemAsync("user"));

    try {
      const rentalData = {
        user_id: userData.id,
        motorcycle_id: parseInt(motorcycleId),
        start_date: rentalDate,
        end_date: endDate,
        total_price: totalPrice,
      };

      const response = await createRental(rentalData);

      // Reemplaza la pantalla actual por el tab de Historial y luego navega al detalle de la renta
      router.replace("/rentalsHistory"); // Navega al tab de historial
      setTimeout(() => {
        router.push(`/rental/${response.id}`); // Muestra el detalle de la renta
      }, 100);
    } catch (error) {
      console.error("Error creando reserva:", error.message);
      Alert.alert("Error", "No se pudo crear la reserva. Inténtalo de nuevo.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Crear Renta para Motocicleta {motorcycleId}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre del Cliente"
        placeholderTextColor={colors.secondaryTextLight}
        value={customerName}
        onChangeText={setCustomerName}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha de Renta (YYYY-MM-DD)"
        placeholderTextColor={colors.secondaryTextLight}
        value={rentalDate}
        onChangeText={setRentalDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Duración en días"
        placeholderTextColor={colors.secondaryTextLight}
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
      />

      <Button
        title="Crear Reserva"
        onPress={handleCreateRental}
        color={colors.primaryButton}
      />
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
  },
  input: {
    height: 40,
    backgroundColor: colors.cardBackground,
    borderColor: colors.borderColor,
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
    color: colors.primaryTextLight,
  },
});

export default Rents;
