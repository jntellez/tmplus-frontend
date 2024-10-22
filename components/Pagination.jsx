// src/components/Pagination.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <View className="flex-row justify-center items-center my-4">
      {currentPage > 1 && (
        <TouchableOpacity
          onPress={() => onPageChange(currentPage - 1)}
          className="mr-2"
        >
          <Text className="text-linkColor">Anterior</Text>
        </TouchableOpacity>
      )}

      <Text className="text-primaryText">
        Página {currentPage} de {totalPages}
      </Text>

      {currentPage < totalPages && (
        <TouchableOpacity
          onPress={() => onPageChange(currentPage + 1)}
          className="ml-2"
        >
          <Text className="text-linkColor">Siguiente</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Pagination;
