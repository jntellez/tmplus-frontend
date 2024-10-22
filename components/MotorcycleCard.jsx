// src/components/MotorcycleCard.js
import React from "react";
import { View, Text, Image } from "react-native";

const MotorcycleCard = ({ motorcycle }) => {
  return (
    <View className="border border-borderColor rounded-lg p-4 m-2 shadow-md bg-secondaryButton">
      <Image
        source={{ uri: motorcycle.imageUrl }} // Asegúrate de que tus datos de moto incluyan una URL de imagen
        className="w-full h-40 rounded-lg mb-2"
        resizeMode="cover"
      />
      <Text className="text-lg font-semibold text-primaryText">
        {motorcycle.brand} {motorcycle.model}
      </Text>
      <Text className="text-secondaryText">{motorcycle.year}</Text>
      <Text className="text-primaryButton font-bold">
        ${motorcycle.rental_price}/día
      </Text>
      <Text className="text-secondaryText">{motorcycle.description}</Text>
    </View>
  );
};

export default MotorcycleCard;
