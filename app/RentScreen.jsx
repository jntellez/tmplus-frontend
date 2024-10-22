// app/RentScreen.js
import React from "react";
import { View, Text, Button } from "react-native";

const RentScreen = () => {
  return (
    <View>
      <Text>Alquilar Moto</Text>
      <Button
        title="Confirmar Alquiler"
        onPress={() => {
          /* Lógica de alquiler */
        }}
      />
    </View>
  );
};

export default RentScreen;
