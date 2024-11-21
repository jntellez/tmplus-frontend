import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { createRental } from "../../../services/rentalService";
import colors from "../../../theme/colors";
import { useRouter } from "expo-router";
import DatePicker from "../../../components/rentals/DatePicker";
import { getStorageItem } from "../../../services/storageService";

const Rents = () => {
  const { motorcycleId } = useLocalSearchParams();
  const [rentalDate, setRentalDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [tempStartDate, setTempStartDate] = useState(rentalDate);
  const [tempEndDate, setTempEndDate] = useState(endDate);
  const router = useRouter();

  const dailyRate = 100; // Precio fijo por día

  const addOneDay = (date) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    return newDate;
  };

  const calculateDuration = (startDate, endDate) => {
    const diffTime = Math.abs(endDate - startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleCreateRental = async () => {
    if (!rentalDate || !endDate) {
      Alert.alert(
        "Error",
        "Por favor selecciona tanto la fecha de inicio como la fecha de fin."
      );
      return;
    }

    if (endDate <= rentalDate) {
      Alert.alert(
        "Error",
        "La fecha de fin debe ser posterior a la fecha de inicio."
      );
      return;
    }

    setLoading(true);

    const duration = calculateDuration(rentalDate, endDate);
    const totalPrice = dailyRate * duration;
    const userData = JSON.parse(await getStorageItem("user"));

    try {
      const rentalData = {
        user_id: userData.id,
        motorcycle_id: parseInt(motorcycleId),
        start_date: rentalDate.toISOString(),
        end_date: endDate.toISOString(),
        total_price: totalPrice,
      };

      const response = await createRental(rentalData);
      router.replace("/rentalsHistory");
      setTimeout(() => {
        router.push(`/rental/${response.id}`);
      }, 100);
    } catch (error) {
      console.error("Error creando reserva:", error.message);
      Alert.alert("Error", "No se pudo crear la reserva. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDates = () => {
    setRentalDate(addOneDay(tempStartDate));
    setEndDate(addOneDay(tempEndDate));
    setModalVisible(false);
  };

  const handleCancel = () => {
    setTempStartDate(rentalDate);
    setTempEndDate(endDate);
    setModalVisible(false);
  };

  const formatDate = (date) => {
    if (!date) return "No seleccionada";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("es-MX", options);
  };

  const isDatesValid =
    tempStartDate && tempEndDate && tempEndDate > tempStartDate;

  const duration =
    rentalDate && endDate ? calculateDuration(rentalDate, endDate) : 0;
  const totalPrice = duration * dailyRate;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        Crear Renta para Motocicleta {motorcycleId}
      </Text>
      <TouchableOpacity
        style={styles.card}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.cardText}>
          {rentalDate && endDate
            ? `Fecha de inicio: ${formatDate(
                rentalDate
              )}\nFecha de fin: ${formatDate(endDate)}`
            : "Selecciona las fechas"}
        </Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.cardText}>Precio por día: ${dailyRate} MXN</Text>
        <Text style={styles.cardText}>Días totales: {duration}</Text>
        <Text style={styles.cardText}>Precio total: ${totalPrice} MXN</Text>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <DatePicker
              motorcycleId={motorcycleId}
              rentalDate={tempStartDate}
              endDate={tempEndDate}
              onDateChange={(start, end) => {
                setTempStartDate(start);
                setTempEndDate(end);
              }}
            />
            <View style={styles.modalButtons}>
              <Button
                title="Cancelar"
                onPress={handleCancel}
                color={colors.dangerButton}
              />
              {isDatesValid && (
                <Button
                  title="Guardar"
                  onPress={handleSaveDates}
                  color={colors.primaryButton}
                />
              )}
            </View>
          </View>
        </View>
      </Modal>

      {loading ? (
        <ActivityIndicator size="large" color={colors.linkColor} />
      ) : (
        <Button
          title="Crear Reserva"
          onPress={handleCreateRental}
          color={colors.linkColor}
        />
      )}
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
  },
  card: {
    backgroundColor: colors.cardBackground,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: "center",
    borderColor: colors.borderColor,
    borderWidth: 1,
  },
  cardText: {
    fontSize: 18,
    color: colors.primaryTextLight,
    textAlign: "center",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
    paddingTop: 140,
    borderRadius: 0,
    width: "100%",
    justifyContent: "space-between",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
    marginBottom: 200,
  },
});

export default Rents;
