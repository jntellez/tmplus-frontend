// src/components/ConfirmationModal.js

import React, { useEffect, useState } from "react";
import { Modal, View, Text, Button, StyleSheet, Animated } from "react-native";
import colors from "../theme/colors";

const ConfirmationModal = ({
  visible,
  title,
  onCancel,
  onConfirm,
  isConfirming,
  cancelButtonText = "Cancelar",
  confirmButtonText = "Confirmar",
}) => {
  const [opacity] = useState(new Animated.Value(0)); // Estado de opacidad animado

  useEffect(() => {
    // Animación de opacidad para el modal
    Animated.timing(opacity, {
      toValue: visible ? 1 : 0, // Opacidad completa cuando visible
      duration: 300, // Duración de la animación
      useNativeDriver: true, // Usar el controlador nativo para mejor rendimiento
    }).start();
  }, [visible]);

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent={true}
      onRequestClose={onCancel}
    >
      <Animated.View style={[styles.modalOverlay, { opacity }]}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{title}</Text>
          <View style={styles.modalButtons}>
            <Button
              title={cancelButtonText}
              onPress={onCancel}
              color={colors.primaryButton} // Color de botón primario para cancelar
            />
            <Button
              title={confirmButtonText}
              onPress={onConfirm}
              color={colors.dangerButton} // Color de botón de peligro para confirmar
              disabled={isConfirming} // Deshabilitar botón si está confirmando
            />
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo oscuro con opacidad
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    color: colors.lightText,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default ConfirmationModal;
