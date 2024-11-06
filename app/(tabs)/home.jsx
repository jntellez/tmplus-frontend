import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import MotorcycleCard from "../../components/MotorcycleCard";
import { getMotorcycles } from "../../services/motorclyceService"; // Importa tu función de servicio
import Pagination from "../../components/Pagination"; // Importa el componente de paginación
import colors from "../../theme/colors"; // Importa los colores

const Home = () => {
  const [motorcycles, setMotorcycles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchMotorcycles = async (page) => {
    const data = await getMotorcycles(page);
    setMotorcycles(data.motorcycles); // Ajusta según la estructura de respuesta de tu API
    setTotalPages(data.totalPages); // Asegúrate de que tu API devuelva el total de páginas
  };

  useEffect(() => {
    fetchMotorcycles(currentPage);
  }, [currentPage]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {motorcycles.map((motorcycle) => (
          <MotorcycleCard key={motorcycle.id} motorcycle={motorcycle} />
        ))}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
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
});

export default Home;
