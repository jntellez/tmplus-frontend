import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Text,
} from "react-native";
import MotorcycleCard from "../../components/MotorcycleCard";
import { getMotorcycles } from "../../services/motorcycleService"; // Importa tu función de servicio
import Pagination from "../../components/Pagination"; // Importa el componente de paginación
import colors from "../../theme/colors"; // Importa los colores

const Home = () => {
  const [motorcycles, setMotorcycles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true); // Añadimos un estado de carga

  const fetchMotorcycles = async (page) => {
    setLoading(true); // Indicamos que está cargando
    try {
      const data = await getMotorcycles(page);
      setMotorcycles(data.motorcycles); // Ajusta según la estructura de respuesta de tu API
      setTotalPages(data.totalPages); // Asegúrate de que tu API devuelva el total de páginas
    } catch (error) {
      console.error("Error fetching motorcycles:", error);
    } finally {
      setLoading(false); // Indicamos que se ha terminado de cargar
    }
  };

  useEffect(() => {
    fetchMotorcycles(currentPage);
  }, [currentPage]);

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
        {motorcycles.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
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
