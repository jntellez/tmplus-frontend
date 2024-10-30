import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

const RentMotorcycle = () => {
  const { motorcycleId } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alquiler de Motocicleta</Text>
      <Text>Motorcycle ID: {motorcycleId}</Text>
      {/* Lógica de alquiler aquí */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: "bold" },
});

export default RentMotorcycle;
