import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { getDeliveries } from "../../services/deliveryService";
import DeliveryCard from "../../components/deliveries/DeliveryCard";
import colors from "../../theme/colors";

const DeliveryList = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const data = await getDeliveries();
        setDeliveries(data);
      } catch (err) {
        console.error("Error fetching deliveries:", err);
        setError("No se pudo cargar la lista de entregas.");
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveries();
  }, []);

  const renderDeliveryItem = ({ item }) => (
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primaryTextLight} />
        <Text style={styles.loadingText}>Cargando entregas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (deliveries.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Ionicons
          name="alert-circle-outline"
          size={48}
          color={colors.secondaryTextLight}
        />
        <Text style={styles.noDeliveriesText}>
          No hay entregas disponibles.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={deliveries}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <DeliveryCard item={item} />}
      contentContainerStyle={styles.listContainer}
      ListHeaderComponent={<Text style={styles.header}>Lista de Entregas</Text>}
      style={{ backgroundColor: colors.background }}
    />
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

export default DeliveryList;
