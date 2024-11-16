import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import LabelProfileCard from "../../components/LabelProfileCard"; // Importamos el componente para las tarjetas
import ProfileHeader from "../../components/ProfileHeader"; // Importamos el nuevo componente
import colors from "../../theme/colors"; // Asegúrate de que los colores estén bien definidos en tu tema

export default function ProfileScreen() {
  const user = {
    name: "Juan Téllez Tinajero", // Ejemplo de datos
    email: "juan@example.com",
    password: "********", // La contraseña oculta
    sellerCode: "12345", // Código de vendedor oculto
    joinDate: "2024-11-09 13:00:08", // Fecha de creación de la cuenta
  };

  // Convertir la fecha de creación a un objeto Date
  const joinDate = new Date(user.joinDate);

  const handleEdit = (field, newValue) => {
    console.log(`Editando ${field} con valor ${newValue}`);
    // Lógica para editar los valores (puedes llamar a una API aquí, por ejemplo)
  };

  return (
    <ScrollView style={styles.container}>
      {/* Usamos el componente ProfileHeader para mostrar la imagen y la fecha */}
      <ProfileHeader joinDate={joinDate} />

      {/* Usamos el componente LabelProfileCard para mostrar la información */}
      <LabelProfileCard
        label="Nombre"
        value={user.name}
        onEdit={(newValue) => handleEdit("name", newValue)}
      />
      <LabelProfileCard
        label="Correo"
        value={user.email}
        onEdit={(newValue) => handleEdit("email", newValue)}
      />
      <LabelProfileCard
        label="Contraseña"
        value={user.password}
        onEdit={(newValue) => handleEdit("password", newValue)}
      />
      <LabelProfileCard
        label="Código de Vendedor"
        value={user.sellerCode}
        onEdit={(newValue) => handleEdit("sellerCode", newValue)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
});
