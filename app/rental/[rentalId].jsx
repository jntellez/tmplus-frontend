import React, { useEffect, useState } from "react";
import {
  ScrollView,
  ActivityIndicator,
  Text,
  Button,
  StyleSheet,
  View,
} from "react-native";
import { getRentalById, updateRental } from "../../services/rentalService";
import { getMotorcycleById } from "../../services/motorcycleService";
import colors from "../../theme/colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import RentalInfo from "../../components/RentalInfo";
import MotorcycleCardSmall from "../../components/MotorcycleCardSmall";
import ConfirmationModal from "../../components/ConfirmationModal";

const RentalDetail = () => {
  const { rentalId } = useLocalSearchParams();
  const router = useRouter();
  const [rental, setRental] = useState(null);
  const [motorcycle, setMotorcycle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [customerName, setCustomerName] = useState("");
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);

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

    setIsCanceling(true);

    const rentalData = {
      ...rental,
      status: "cancelled",
    };

    try {
      const updatedRental = await updateRental(rental.id, rentalData);
      setRental(updatedRental);
      setError(null);
      setIsCanceling(false);
      setShowModal(false);
    } catch (error) {
      console.error("Error canceling rental:", error);
      setError("No se pudo cancelar el alquiler.");
      setIsCanceling(false);
    }
  };

  const showCancelModal = () => {
    setShowModal(true);
  };

  const hideCancelModal = () => {
    setShowModal(false);
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

      {/* Mostrar la tarjeta de instrucciones de entrega solo si el estado es 'confirmed' */}
      {rental.status === "confirmed" && motorcycle.delivery_instructions && (
        <View style={styles.fullWidthCard}>
          <Text style={styles.cardHeader}>Instrucciones de entrega</Text>
          <Text style={styles.cardText}>
            {motorcycle.delivery_instructions}
          </Text>
        </View>
      )}

      {(rental.status === "pending" || rental.status === "confirmed") && (
        <>
          <Button
            title="Cancelar Renta"
            color={colors.dangerButton}
            onPress={showCancelModal}
          />
          <View style={styles.space}></View>
        </>
      )}

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
  fullWidthCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    width: "100%", // Asegura que las tarjetas de esta sección ocupen todo el ancho
  },
  cardHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.linkColor,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    color: colors.lightText || "#E0E0E0",
    marginBottom: 4,
  },
  space: {
    marginBottom: 50,
  },
});

export default RentalDetail;
