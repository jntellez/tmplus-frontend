import React, { useState } from "react";
import { Button, Alert } from "react-native";
import { useRouter } from "expo-router";
import {
  deleteMotorcycle,
  deleteMotorcycleImages,
} from "../../services/motorcycleService"; // Asegúrate de tener esta función
import ConfirmationModal from "../ConfirmationModal"; // Importa el modal de confirmación
import colors from "../../theme/colors";

const DeleteMotorcycleButton = ({ motorcycleId }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // Estado para mostrar el modal
  const [isConfirming, setIsConfirming] = useState(false); // Estado para indicar que se está confirmando

  // Función para mostrar el modal de confirmación
  const handleDelete = () => {
    setModalVisible(true); // Muestra el modal cuando el usuario hace clic en eliminar
  };

  // Función cuando el usuario confirma la eliminación
  const confirmDelete = async () => {
    try {
      setIsDeleting(true);
      // Primero, elimina las imágenes asociadas (si las hay)

      await deleteMotorcycleImages(motorcycleId);

      // Después, elimina la motocicleta
      await deleteMotorcycle(motorcycleId);

      Alert.alert("Éxito", "La motocicleta ha sido eliminada.");

      router.replace("/home");

      // Cierra el modal después de la eliminación
      setModalVisible(false);
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al eliminar la motocicleta.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Función para cancelar la eliminación
  const cancelDelete = () => {
    setModalVisible(false); // Cierra el modal si el usuario cancela
  };

  return (
    <>
      <Button
        title={isDeleting ? "Eliminando..." : "Eliminar motocicleta"}
        onPress={handleDelete} // Abre el modal cuando el usuario presiona el botón
        color={colors.cancelled} // Usa un color rojo para indicar eliminación
        disabled={isDeleting} // Deshabilita el botón mientras se elimina
      />

      {/* Modal de confirmación */}
      <ConfirmationModal
        visible={modalVisible}
        title="¿Estás seguro de que deseas eliminar esta motocicleta?"
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
        isConfirming={isConfirming}
        cancelButtonText="Cancelar"
        confirmButtonText="Eliminar"
      />
    </>
  );
};

export default DeleteMotorcycleButton;
