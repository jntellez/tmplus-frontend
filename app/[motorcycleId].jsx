// app/[motorcycleId].js
import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import colors from "../theme/colors";
import { useLocalSearchParams } from "expo-router";
import { getMotorcycleById } from "../services/motorclyceService";

const DetailScreen = () => {
  const { motorcycleId } = useLocalSearchParams();
  const [motorcycle, setMotorcycle] = useState({});

  const fetchMotorcycle = async (id) => {
    const data = await getMotorcycleById(id);
    setMotorcycle(data);
  };

  useEffect(() => {
    fetchMotorcycle(motorcycleId);
  }, [motorcycleId]);

  const isOwner = false; // Lógica para determinar si es el propietario

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle de la Moto</Text>
      <Text style={styles.infoText}>Marca: {motorcycle.brand}</Text>
      <Text style={styles.infoText}>Modelo: {motorcycle.model}</Text>
      <Text style={styles.infoText}>Año: {motorcycle.year}</Text>

      {isOwner && (
        <View style={styles.buttonContainer}>
          <Button
            title="Editar"
            color={colors.primaryButton}
            onPress={() => {
              /* Lógica para editar */
            }}
          />
          <Button
            title="Eliminar"
            color={colors.dangerButton}
            onPress={() => {
              /* Lógica para eliminar */
            }}
          />
        </View>
      )}
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
    color: colors.primaryTextLight, // Texto claro
    marginBottom: 16,
  },
  infoText: {
    fontSize: 18,
    color: colors.primaryTextLight, // Texto claro
    marginBottom: 8,
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default DetailScreen;
