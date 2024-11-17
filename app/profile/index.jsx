import React, { useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, Text } from "react-native";
import LabelProfileCard from "../../components/LabelProfileCard"; // Importamos el componente para las tarjetas
import ProfileHeader from "../../components/ProfileHeader"; // Importamos el nuevo componente
import colors from "../../theme/colors"; // Asegúrate de que los colores estén bien definidos en tu tema
import { logout } from "../../services/authService";
import { getStorageItem } from "../../services/storageService";

export default function ProfileScreen() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storageUser = await getStorageItem("user");
        console.log(storageUser); // Para depuración
        setUser(storageUser);
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  if (loading) {
    return <Text style={styles.loadingText}>Cargando...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {/* Usamos el componente ProfileHeader para mostrar la imagen y la fecha */}
      <ProfileHeader joinDate={new Date(user.registration_date)} />

      {/* Usamos el componente LabelProfileCard para mostrar la información */}

      <LabelProfileCard
        label="Nombre"
        value={user.name}
        key="name"
        userId={user.id}
      />
      <LabelProfileCard
        label="Correo"
        value={user.email}
        key="email"
        userId={user.id}
      />
      <LabelProfileCard
        label="Contraseña"
        value="********"
        key="password"
        userId={user.id}
      />
      <LabelProfileCard
        label="Teléfono"
        value={user.phone || "No registrado"}
        key="phone"
        userId={user.id}
      />
      <LabelProfileCard
        label="Dirección"
        value={user.address || "No registrada"}
        key="address"
        userId={user.id}
      />
      <LabelProfileCard
        label="Código de Vendedor"
        value={user.mp_access_token || "No disponible"}
        key="mp_access_token"
        userId={user.id}
      />

      {/* Botón de Cerrar Sesión */}
      <Button title="Cerrar Sesión" onPress={logout} color={colors.cancelled} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: colors.primary,
  },
});
