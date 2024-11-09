import React, { useEffect, useState } from "react";
import {
  ScrollView,
  ActivityIndicator,
  Text,
  Button,
  StyleSheet,
  Modal,
  View,
} from "react-native";
import { getRentalById, updateRental } from "../../services/rentalService";
import { getMotorcycleById } from "../../services/motorcycleService";
import colors from "../../theme/colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import RentalInfo from "../../components/RentalInfo";
import MotorcycleCardSmall from "../../components/MotorcycleCardSmall";

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

    const rentalData = {
      ...rental,
      status: "cancelled",
    };

    try {
      const updatedRental = await updateRental(rental.id, rentalData);
      setRental(updatedRental);
      setError(null); // Reset error message if cancellation is successful
      setIsCanceling(false); // Cerrar el modal si la cancelación fue exitosa
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

      {/* Modal de confirmación de cancelación */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={hideCancelModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              ¿Estás seguro de cancelar esta renta?
            </Text>
            <View style={styles.modalButtons}>
              <Button
                title="Cancelar"
                onPress={hideCancelModal}
                color={colors.primaryButton} // Usando el color de botón primario para cancelar
              />
              <Button
                title="Confirmar"
                onPress={handleCancelRental}
                color={colors.dangerButton} // Usando el color de botón de peligro para confirmar
                disabled={isCanceling} // Deshabilitar botón si se está procesando la cancelación
              />
            </View>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: colors.cardBackground, // Fondo del modal con color de tarjeta
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    color: colors.lightText, // Título del modal con color de texto primario
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default RentalDetail;
