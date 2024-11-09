// src/screens/RentalDetail.js

import React, { useEffect, useState } from "react";
import {
  ScrollView,
  ActivityIndicator,
  Text,
  Button,
  StyleSheet,
} from "react-native";
import { getRentalById, updateRental } from "../../services/rentalService";
import { getMotorcycleById } from "../../services/motorcycleService";
import colors from "../../theme/colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import RentalInfo from "../../components/RentalInfo";
import MotorcycleCardSmall from "../../components/MotorcycleCardSmall";
import ConfirmationModal from "../../components/ConfirmationModal"; // Importamos el modal

const RentalDetail = () => {
  const { rentalId } = useLocalSearchParams();
  const router = useRouter();
  const [rental, setRental] = useState(null);
  const [motorcycle, setMotorcycle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [customerName, setCustomerName] = useState("");
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // Para controlar la visibilidad del modal
  const [isCanceling, setIsCanceling] = useState(false); // Para controlar el estado de la cancelación

  useEffect(() => {
    const fetchRentalDetails = async () => {
      try {
        const storedUser = await SecureStore.getItemAsync("user");
        const storedName = storedUser ? JSON.parse(storedUser).name : null;
        setCustomerName(storedName || "Cliente Desconocido");

        const rentalData = await getRentalById(rentalId);
        setRental(rentalData);

        const motorcycleData = await getMotorcycleById(
          rentalData.motorcycle_id
        );
        setMotorcycle(motorcycleData);
      } catch (error) {
        console.error("Error fetching rental or motorcycle details:", error);
        setError(
          "No se pudo cargar la información del alquiler o la motocicleta."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRentalDetails();
  }, [rentalId]);

  const handleCancelRental = async () => {
    if (!rental || !rental.id) return;

    setIsCanceling(true); // Establecemos que se está procesando la cancelación

    const rentalData = {
      ...rental,
      status: "cancelled",
    };

    try {
      const updatedRental = await updateRental(rental.id, rentalData);
      setRental(updatedRental);
      setError(null); // Resetear el mensaje de error si la cancelación fue exitosa
      setIsCanceling(false); // Cerrar el modal si la cancelación fue exitosa
      setShowModal(false); // Cerrar el modal después de confirmar
    } catch (error) {
      console.error("Error canceling rental:", error);
      setError("No se pudo cancelar el alquiler.");
      setIsCanceling(false);
    }
  };

  const showCancelModal = () => {
    setShowModal(true); // Mostrar modal de confirmación
  };

  const hideCancelModal = () => {
    setShowModal(false); // Ocultar modal si el usuario no quiere cancelar
  };

  if (loading) {
    return <ActivityIndicator size="large" color={colors.primaryButton} />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  if (!rental || !motorcycle) {
    return (
      <Text style={styles.errorText}>
        No se pudo cargar la información del alquiler o la motocicleta.
      </Text>
    );
  }

  const handleMotorcyclePress = () => {
    router.push(`/${motorcycle.id}`);
  };

  return (
    <ScrollView style={styles.container}>
      <RentalInfo rental={rental} customerName={customerName} />
      <MotorcycleCardSmall
        motorcycle={motorcycle}
        onPress={handleMotorcyclePress}
      />

      {/* Mostrar el botón de cancelación solo si el estado es 'pending' o 'confirmed' */}
      {(rental.status === "pending" || rental.status === "confirmed") && (
        <Button
          title="Cancelar Renta"
          color={colors.dangerButton}
          onPress={showCancelModal}
        />
      )}

      {/* Usamos el componente de modal */}
      <ConfirmationModal
        visible={showModal}
        title="¿Estás seguro de cancelar esta renta?"
        onCancel={hideCancelModal}
        onConfirm={handleCancelRental}
        isConfirming={isCanceling}
        cancelButtonText="Cancelar"
        confirmButtonText="Confirmar"
      />
    </ScrollView>
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
  errorText: {
    textAlign: "center",
    color: colors.errorText,
    fontSize: 18,
  },
});

export default RentalDetail;
