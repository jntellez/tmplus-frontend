// app/DetailScreen.js
import React from "react";
import { View, Text, Button } from "react-native";

const DetailScreen = ({ route }) => {
  const { motorcycle } = route.params;

  const isOwner = false; // Lógica para determinar si es el propietario

  return (
    <View>
      <Text>Detalle de la Moto</Text>
      <Text>Marca: {motorcycle.brand}</Text>
      <Text>Modelo: {motorcycle.model}</Text>
      <Text>Año: {motorcycle.year}</Text>

      {!isOwner && (
        <View>
          <Button
            title="Editar"
            onPress={() => {
              /* Lógica para editar */
            }}
          />
          <Button
            title="Eliminar"
            onPress={() => {
              /* Lógica para eliminar */
            }}
          />
        </View>
      )}
    </View>
  );
};

export default DetailScreen;
