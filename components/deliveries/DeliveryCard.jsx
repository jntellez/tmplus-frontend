// src/components/DeliveryCard.jsx
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../theme/colors"; // Importa los colores definidos en tu tema
import { getUserData } from "../../services/userService";

const DeliveryCard = ({ item }) => {
  const [customer, setCustomer] = useState({});
  const [owner, setOwner] = useState({});
  const [motorcycle, setMotorcycle] = useState({});

  // useEffect(() => {
  //   const getDeliveryData = async (customerId, ownerId, motorcycleId) => {
  //     const customerData = await getUserData(customerId);
  //     setCustomer(customerData);
  //     const ownerData = await getUserData(ownerId);
  //     setOwner(ownerData);
  //     const motorcycleData = await getUserData(motorcycleId);
  //     setMotorcycle(motorcycleData);
  //   };

  //   const { customer_id, owner_id, motorcycle_id } = item;
  //   getDeliveryData(customer_id, owner_id, motorcycle_id);
  // }, []);

  return (
    <TouchableOpacity
      onPress={() => router.push(`/delivery-detail/${item.id}`)}
      style={styles.deliveryItem}
    >
      <Ionicons
        name="cube-outline"
        size={24}
        color={colors.primaryTextLight}
        style={styles.icon}
      />
      <View>
        <Text style={styles.deliveryTitle}>Entrega #{item.id}</Text>
        <Text style={styles.deliveryText}>Fecha: {item.delivery_date}</Text>
        <Text style={styles.deliveryText}>
          Estado:{" "}
          <Text style={[styles.status, { color: colors[item.status] }]}>
            {item.status}
          </Text>
        </Text>
      </View>
    </TouchableOpacity>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: 16,
    color: colors.primaryTextLight,
  },
  errorText: {
    color: colors.errorText,
    fontSize: 16,
  },
  noDeliveriesText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.primaryTextLight,
  },
  listContainer: {
    padding: 16,
    backgroundColor: colors.background,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: colors.primaryTextLight,
  },
});

export default DeliveryCard;
