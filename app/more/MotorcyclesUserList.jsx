import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Text,
} from "react-native";
import MotorcycleCard from "../../components/motorcycles/MotorcycleCard";
import { getMotorcyclesByUserId } from "../../services/motorcycleService"; // Importa tu función de servicio
import Pagination from "../../components/Pagination"; // Importa el componente de paginación
import colors from "../../theme/colors"; // Importa los colores
import { getStorageItem } from "../../services/storageService";

const Home = () => {
  const [motorcycles, setMotorcycles] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMotorcyclesData = async (userId) => {
      setLoading(true);
      try {
        const userData = JSON.parse(await getStorageItem("user"));
        setUser(userData);
        const motorcycleData = await getMotorcyclesByUserId(userData.id);
        setMotorcycles(motorcycleData);
      } catch (error) {
        console.error("Error fetching motorcycles:", error);
      } finally {
        setLoading(false);
      }
    };

    getMotorcyclesData(user.id);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : motorcycles.length > 0 ? (
          motorcycles.map((motorcycle) => (
            <MotorcycleCard key={motorcycle.id} motorcycle={motorcycle} />
          ))
        ) : (
          <Text style={styles.noMotorcyclesText}>
            No hay motocicletas disponibles
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // Fondo principal
  },
  content: {
    padding: 16,
  },
  noMotorcyclesText: {
    textAlign: "center",
    color: colors.secondaryTextLight,
    fontSize: 16,
    marginTop: 20,
  },
});

export default Home;
