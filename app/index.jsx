import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";

const HomeScreen = () => {
  const [motorcycles, setMotorcycles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para obtener las motos desde la API usando fetch
  const fetchMotorcycles = async () => {
    try {
      const response = await fetch(
        "http://192.168.100.50:5000/api/motorcycles"
      );
      const data = await response.json();
      setMotorcycles(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching motorcycles:", error);
      setLoading(false);
    }
  };

  // UseEffect para llamar a la función cuando el componente se monta
  useEffect(() => {
    fetchMotorcycles();
  }, []);

  // Renderizar cada moto en una lista
  const renderItem = ({ item }) => (
    <View
      style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" }}
    >
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        {item.brand} {item.model}
      </Text>
      <Text>Año: {item.year}</Text>
      <Text>Precio por día: ${item.rental_price}</Text>
      <Text>{item.description}</Text>
    </View>
  );

  // Mostrar un indicador de carga mientras los datos se están obteniendo
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  // Renderizado principal
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
        Motos Disponibles
      </Text>
      <FlatList
        data={motorcycles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default HomeScreen;
