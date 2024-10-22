// src/screens/Home.js
import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import MotorcycleCard from "../components/MotorcycleCard";
import { getMotorcycles } from "../services/motorclyceService"; // Importa tu función de servicio
import Pagination from "../components/Pagination"; // Importa el componente de paginación

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
    <ScrollView>
      <View className="flex-1 p-4">
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

export default Home;
