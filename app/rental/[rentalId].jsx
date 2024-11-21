import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  Button,
  StyleSheet,
  View,
  RefreshControl,
  Animated,
} from "react-native";
import { getRentalById, updateRental } from "../../services/rentalService";
import { getMotorcycleById } from "../../services/motorcycleService";
import colors from "../../theme/colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import RentalInfo from "../../components/rentals/RentalInfo";
import MotorcycleCardSmall from "../../components/motorcycles/MotorcycleCardSmall";
import ConfirmationModal from "../../components/ConfirmationModal";
import PaymentButton from "../../components/rentals/PaymentButton";
import { getStorageItem } from "../../services/storageService";

// Agregar estado de animación
const RentalDetail = () => {
  const { rentalId } = useLocalSearchParams();
  const router = useRouter();
  const [rental, setRental] = useState(null);
  const [motorcycle, setMotorcycle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState("");
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const rotateAnim = new Animated.Value(0); // Valor inicial de la animación

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchRentalDetails();
    setRefreshing(false);
  };

  const fetchRentalDetails = async () => {
    try {
      const storedUser = JSON.parse(await getStorageItem("user"));
      setUser(storedUser || "Cliente Desconocido");

      const rentalData = await getRentalById(rentalId);
      setRental(rentalData);

      const motorcycleData = await getMotorcycleById(rentalData.motorcycle_id);
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

  useEffect(() => {
    fetchRentalDetails();
    // Animar el círculo giratorio
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    ).start();
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
    // Aplicar la animación en el ActivityIndicator
    const spin = rotateAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });
    return (
      <View style={styles.loadingContainer}>
        <Animated.View
          style={[styles.spinner, { transform: [{ rotate: spin }] }]}
        >
          <Text style={styles.loadingText}>Cargando...</Text>
        </Animated.View>
      </View>
    );
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
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <RentalInfo rental={rental} customerName={user.name} />
      <MotorcycleCardSmall
        motorcycle={motorcycle}
        onPress={handleMotorcyclePress}
      />

      {rental.status === "pending" && (
        <View style={styles.paymentButtonContainer}>
          <PaymentButton
            rental={rental}
            user={user}
            motorcycle={motorcycle}
            disabled={!rental.status === "pending"}
          />
        </View>
      )}

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
    backgroundColor: colors.background, // Ya es un color claro
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primaryTextLight, // Puedes hacer este color más claro
    marginBottom: 16,
    textAlign: "center",
  },
  errorText: {
    textAlign: "center",
    color: colors.errorText, // Asegúrate de que sea un color adecuado
    fontSize: 18,
  },
  fullWidthCard: {
    backgroundColor: colors.cardBackground, // Asegúrate de que este sea un color claro
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    width: "100%",
  },
  cardHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.linkColor, // Puedes usar un color más claro si lo deseas
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    color: colors.lightText, // Usa un color claro para el texto
    marginBottom: 4,
  },
  space: {
    marginBottom: 50,
  },
  paymentButtonContainer: {
    marginVertical: 10,
  },
  loadingContainer: {
    flex: 1,
    minHeight: 100,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  spinner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 8,
    borderColor: "transparent",
    borderTopColor: colors.lightText, // Asegúrate de que el color del spinner también sea adecuado
    backgroundColor: colors.lightText,
    animationDuration: "1s",
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: colors.lightText, // También puede ser un color más suave
  },
});

export default RentalDetail;
