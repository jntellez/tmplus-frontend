import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../theme/colors";
import { getUserData } from "../../services/userService";
import { getMotorcycleById } from "../../services/motorcycleService";
import { updateRental } from "../../services/rentalService";
import ConfirmationModal from "../ConfirmationModal";
import { updateDelivery } from "../../services/deliveryService";

const DeliveryCard = ({ item }) => {
  const { id_customer, motorcycle_id, rental_id } = item;
  const [customer, setCustomer] = useState({});
  const [motorcycle, setMotorcycle] = useState({});
  const [isModalVisible, setModalVisible] = useState(false);
  const [isConfirming, setConfirming] = useState(false);
  const date = new Date(item.delivery_date);

  useEffect(() => {
    const getDeliveryData = async (customerId, motorcycleId) => {
      const customerData = await getUserData(customerId);
      setCustomer(customerData);
      const motorcycleData = await getMotorcycleById(motorcycleId);
      setMotorcycle(motorcycleData);
    };

    getDeliveryData(id_customer, motorcycle_id);
  }, []);

  const handleConfirmReturn = async () => {
    setConfirming(true);
    try {
      await updateRental(rental_id, { status: "completed" });
      await updateDelivery(item.id, { status: "completed" });
      setModalVisible(false);
    } catch (error) {
      Alert.alert("Error", "No se pudo confirmar la devolucion.");
    } finally {
      setConfirming(false);
    }
  };

  return (
    <View style={styles.deliveryItem}>
      <Ionicons
        name="cube-outline"
        size={24}
        color={colors.primaryTextLight}
        style={styles.icon}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.deliveryTitle}>
          Entrega tu {motorcycle.model} {motorcycle.year} a {customer.name}
        </Text>
        <Text style={styles.deliveryText}>
          Fecha de entrega: {date.toLocaleDateString()} a las{" "}
          {date.toLocaleTimeString()}
        </Text>
        <Text style={styles.deliveryText}>
          <Text style={[styles.status, { color: colors[item.status] }]}>
            {item.status}
          </Text>
        </Text>
      </View>
      {item.status === "confirmed" && (
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons
            name="checkmark"
            size={20}
            color={colors.primaryTextLight}
          />
        </TouchableOpacity>
      )}
      <ConfirmationModal
        visible={isModalVisible}
        title="¿Confirmas la devolución de tu moto?"
        onCancel={() => setModalVisible(false)}
        onConfirm={handleConfirmReturn}
        isConfirming={isConfirming}
        cancelButtonText="Cancelar"
        confirmButtonText="Confirmar"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  deliveryItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
    backgroundColor: colors.cardBackground,
    position: "relative",
  },
  icon: {
    marginRight: 16,
  },
  deliveryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primaryTextLight,
  },
  deliveryText: {
    color: colors.secondaryTextLight,
  },
  status: {
    fontWeight: "bold",
  },
  confirmButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: colors.primaryButton,
    borderRadius: 25,
    padding: 10,
  },
});

export default DeliveryCard;
