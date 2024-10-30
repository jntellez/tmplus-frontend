import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { createRental } from "../../../services/rentalService";
import colors from "../../../theme/colors"; // Importación del tema de colores

const Rents = () => {
  const { motorcycleId } = useLocalSearchParams(); // Asumiendo que se pasa el ID de la moto a esta vista
  const [rentalDate, setRentalDate] = useState("");
  const [duration, setDuration] = useState("");
  const [customerName, setCustomerName] = useState("");

  // Función para manejar la creación de la reserva
  const handleCreateRental = async () => {
    // Validación básica de los campos
    if (!rentalDate || !duration || !customerName) {
      Alert.alert("Error", "Por favor completa todos los campos.");
      return;
    }

    try {
      // Datos para la reserva
      const rentalData = {
        motorcycleId,
        rentalDate,
        duration,
        customerName,
      };
      // Llamada al servicio para crear la reserva
      await createRental(rentalData);
      Alert.alert("Éxito", "Reserva creada con éxito");
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
