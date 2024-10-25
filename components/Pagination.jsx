import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../theme/colors"; // Importa la paleta de colores

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <View style={styles.paginationContainer}>
      {currentPage > 1 && (
        <TouchableOpacity
          onPress={() => onPageChange(currentPage - 1)}
          style={styles.button}
        >
          <Text style={styles.linkText}>Anterior</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.pageInfo}>
        Página {currentPage} de {totalPages}
      </Text>

      {currentPage < totalPages && (
        <TouchableOpacity
          onPress={() => onPageChange(currentPage + 1)}
          style={styles.button}
        >
          <Text style={styles.linkText}>Siguiente</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
    marginHorizontal: 8,
    padding: 8, // Agrega padding para mejorar la separación
    backgroundColor: colors.cardBackground, // Color de fondo más claro
    borderRadius: 8, // Bordes redondeados para un aspecto más amigable
    shadowColor: "#000", // Sombra
    shadowOffset: { width: 0, height: 2 }, // Offset de la sombra
    shadowOpacity: 0.2, // Opacidad de la sombra
    shadowRadius: 6, // Radio de la sombra
    elevation: 4, // Elevación para Android
  },
  button: {
    marginHorizontal: 8,
    padding: 10, // Aumentar el padding para mejor usabilidad
    backgroundColor: colors.lightButton, // Color de fondo más claro para los botones
    borderRadius: 5,
  },
  linkText: {
    color: colors.linkColor, // Color de los enlaces
    fontWeight: "600",
  },
  pageInfo: {
    color: colors.primaryTextLight, // Texto más claro para la info de la página
    fontSize: 16,
    fontWeight: "500",
    marginHorizontal: 16, // Espacio entre el texto y los botones
  },
});

export default Pagination;
