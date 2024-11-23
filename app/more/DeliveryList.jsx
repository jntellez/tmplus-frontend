import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getDeliveries } from "../../services/deliveryService";
import DeliveryCard from "../../components/deliveries/DeliveryCard";
import colors from "../../theme/colors";

const DeliveryList = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

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

  // Efecto inicial para cargar entregas
  useEffect(() => {
    fetchDeliveries();
  }, []);

  // Maneja la lógica de refresco
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchDeliveries();
    } catch (err) {
      console.error("Error during refresh:", err);
    } finally {
      setRefreshing(false);
    }
  };

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
      ListHeaderComponent={<Text style={styles.header}>Tus Entregas</Text>}
      style={{ backgroundColor: colors.background }}
      refreshing={refreshing} // Propiedad para indicar si está refrescando
      onRefresh={handleRefresh} // Lógica que se ejecuta al refrescar
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
