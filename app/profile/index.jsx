import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
} from "react-native";
import LabelProfileCard from "../../components/profile/LabelProfileCard";
import ProfileHeader from "../../components/profile/ProfileHeader";
import ConfirmationModal from "../../components/ConfirmationModal";
import colors from "../../theme/colors";
import { logout } from "../../services/authService";
import { getStorageItem } from "../../services/storageService";

const { width } = Dimensions.get("window"); // Obtén el ancho de la pantalla

export default function ProfileScreen() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storageUser = JSON.parse(await getStorageItem("user"));
        setUser(storageUser);
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  if (loading) return <ActivityIndicator size="large" color={colors.primary} />;

  return (
    <ScrollView style={styles.container}>
      <ProfileHeader joinDate={new Date(user.registration_date)} />

      {/* Ajustar el contenedor en función del tamaño de la pantalla */}
      <View style={[styles.content, { width: width > 1024 ? "50%" : "100%" }]}>
        <LabelProfileCard
          label="Nombre"
          value={user.name}
          propName="name"
          userId={user.id}
        />
        <LabelProfileCard
          label="Correo"
          value={user.email}
          propName="email"
          userId={user.id}
        />
        <LabelProfileCard
          label="Contraseña"
          value=""
          propName="password"
          userId={user.id}
          password
          noShow
        />
        <LabelProfileCard
          label="Teléfono"
          value={user.phone}
          propName="phone"
          userId={user.id}
        />
        <LabelProfileCard
          label="Dirección"
          value={user.address}
          propName="address"
          userId={user.id}
        />
        <LabelProfileCard
          label="Código de Vendedor"
          value={user.mp_access_token}
          propName="mp_access_token"
          userId={user.id}
        />

        {/* Botón de Cerrar Sesión */}
        <Button
          title="Cerrar Sesión"
          onPress={() => setIsModalVisible(true)}
          color={colors.cancelled}
        />

        <View style={{ paddingVertical: 150 }}></View>
      </View>

      {/* Modal de confirmación */}
      <ConfirmationModal
        visible={isModalVisible}
        title="¿Estás seguro de que deseas cerrar sesión?"
        onCancel={() => setIsModalVisible(false)}
        onConfirm={() => {
          setIsModalVisible(false);
          logout();
        }}
        cancelButtonText="Cancelar"
        confirmButtonText="Cerrar Sesión"
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
  content: {
    marginLeft: "auto",
    marginRight: "auto",
  },
});
