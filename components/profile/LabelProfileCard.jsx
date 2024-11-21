import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
} from "react-native";
import colors from "../../theme/colors";
import { validatePassword } from "../../services/authService";
import { updateUserData, updateUserPassword } from "../../services/userService";
import { setStorageItem } from "../../services/storageService";

export default function LabelProfileCard({
  label,
  value,
  propName,
  userId,
  noShow = false,
  password = false,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState(""); // Para la contraseña actual
  const [error, setError] = useState("");

  const handleUpdateValue = async () => {
    try {
      // Evitar actualización si no hay cambios
      if (inputValue === value) {
        setIsEditing(false);
        return;
      }

      const data = { [propName]: inputValue };
      const response = password
        ? await updateUserPassword(userId, {
            currentPassword,
            newPassword: inputValue,
          })
        : await updateUserData(userId, data);

      setStorageItem("user", JSON.stringify(response));

      setIsEditing(false);
    } catch (error) {
      console.error("Error al actualizar:", error);
      setIsEditing(false);
    }
  };

  const handleValidatePassword = async () => {
    try {
      const isValid = await validatePassword(currentPassword); // Validar la contraseña en la API
      if (isValid) {
        setIsModalVisible(false);
        setIsEditing(true); // Habilitar edición si la contraseña es válida
        setError("");
      } else {
        setError("Contraseña incorrecta");
      }
    } catch (error) {
      setError("Error al validar la contraseña");
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.label}>{label}</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={inputValue}
            onChangeText={setInputValue}
            autoFocus
            onBlur={() => {
              setIsEditing(false);
              handleUpdateValue(); // Guardar los cambios al perder el foco
            }}
          />
        ) : (
          <Text style={styles.value}>
            {noShow ? "••••••••••" : inputValue || "Indefinido"}
          </Text>
        )}
      </View>
      <TouchableOpacity
        onPress={() => {
          if (isEditing) {
            handleUpdateValue(); // Llama a la función para actualizar el valor
          } else if (noShow) {
            setIsModalVisible(true); // Mostrar modal para contraseñas
          } else {
            setIsEditing(true); // Cambia a modo edición
          }
        }}
        style={styles.editButton}
      >
        <Text style={styles.editButtonText}>
          {isEditing ? "Confirmar" : "Editar"}
        </Text>
      </TouchableOpacity>

      {/* Modal para validar contraseña */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Verificar que eres tú</Text>
            <TextInput
              style={styles.input}
              placeholder="Contraseña actual"
              secureTextEntry
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <View style={styles.modalButtons}>
              <Button
                title="Cancelar"
                onPress={() => {
                  setIsModalVisible(false);
                  setError("");
                }}
                color={colors.cancelled}
              />
              <Button
                title="Validar"
                onPress={handleValidatePassword}
                color={colors.primaryButton}
              />
            </View>
          </View>
        </View>
      </Modal>
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
    color: colors.secondaryTextLight,
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
    borderColor: colors.borderColor,
    padding: 5,
  },
  editButton: {
    paddingVertical: 4,
  },
  editButtonText: {
    color: colors.linkColor,
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.primaryTextLight,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});
