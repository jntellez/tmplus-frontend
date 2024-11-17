import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import colors from "../theme/colors"; // Asegúrate de que los colores estén bien definidos en tu tema
import { updateUserData } from "../services/userService";

export default function LabelProfileCard({
  label,
  value,
  key,
  userId,
  noShow,
}) {
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar si estamos en modo edición
  const [inputValue, setInputValue] = useState(value); // Estado para controlar el valor del input

  const handleUpdateValue = async (value) => {
    try {
      const data = { [key]: value };
      const response = await updateUserData(userId, data);
    } catch (error) {}
  };

  const handleEdit = () => {
    if (isEditing) {
      // Si estamos editando, se confirma la edición
      onEdit(inputValue);
    }
    // Cambiar entre modo edición y modo vista
    setIsEditing(!isEditing);
  };

  const handleBlur = () => {
    // Si se pierde el foco, cancelamos la edición
    setIsEditing(false);
    setInputValue(value); // Restauramos el valor original
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.label}>{label}</Text>
        {isEditing ? (
          // Si estamos editando, mostramos un TextInput
          <TextInput
            style={styles.input}
            value={inputValue}
            onChangeText={setInputValue}
            onBlur={handleBlur} // Cancelamos la edición si pierde el foco
            autoFocus
          />
        ) : (
          // Si no estamos editando, mostramos el valor como texto
          <Text style={styles.value}>{inputValue || "Indefinido"}</Text>
        )}
      </View>
      <TouchableOpacity
        onPress={!isEditing ? handleEdit : handleUpdateValue}
        style={styles.editButton}
      >
        <Text style={styles.editButtonText}>
          {isEditing ? "Confirmar" : "Editar"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: colors.secondaryTextLight, // Menos prominente
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primaryTextLight,
    marginTop: 4,
  },
  input: {
    fontSize: 16,
    color: colors.primaryTextLight,
    marginTop: 4,
    borderBottomWidth: 1,
    borderColor: colors.borderColor, // Asegúrate de que este color esté definido en tu tema
    padding: 5,
  },
  editButton: {
    paddingVertical: 4,
  },
  editButtonText: {
    color: colors.linkColor,
    fontSize: 14,
  },
});
