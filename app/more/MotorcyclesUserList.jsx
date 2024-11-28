import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Text,
} from "react-native";
import MotorcycleCard from "../../components/motorcycles/MotorcycleCard";
import { getMotorcyclesByUserId } from "../../services/motorcycleService"; // Importa tu función de servicio
import colors from "../../theme/colors"; // Importa los colores
import { getStorageItem } from "../../services/storageService";

const { width } = Dimensions.get("window"); // Obtener el ancho de la pantalla

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
    flexDirection: "row", // Usa fila para mostrar las tarjetas de manera horizontal
    flexWrap: "wrap", // Para que las tarjetas se acomoden en varias filas si es necesario
    justifyContent: "space-around", // Espacio igual entre las tarjetas
    width: width < 768 ? "100%" : "50%", // En pantallas más grandes, el contenedor será más pequeño
    alignSelf: "center", // Centra el contenido horizontalmente
  },
  noMotorcyclesText: {
    textAlign: "center",
    color: colors.secondaryTextLight,
    fontSize: 16,
    marginTop: 20,
  },
  paginationContainer: {
    width: "100%", // Asegura que la paginación ocupe el 100% del ancho
    alignItems: "center",
    marginBottom: 20, // Espacio abajo
  },
});
export default Home;
