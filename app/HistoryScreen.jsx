// app/HistoryScreen.js
import React from "react";
import { View, Text, FlatList } from "react-native";

const HistoryScreen = () => {
  const rentals = [
    { id: "1", motorcycle: "Yamaha MT-09", date: "2023-01-15" },
    { id: "2", motorcycle: "Honda CBR600RR", date: "2023-02-20" },
    // Agrega más alquileres aquí
  ];

  return (
    <View>
      <Text>Historial de Alquileres</Text>
      <FlatList
        data={rentals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text>
            {item.motorcycle} - {item.date}
          </Text>
        )}
      />
    </View>
  );
};

export default HistoryScreen;
