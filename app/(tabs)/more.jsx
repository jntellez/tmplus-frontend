import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  useWindowDimensions,
} from "react-native";
import { useRouter } from "expo-router";
import colors from "../../theme/colors";
import ProfileCard from "../../components/more/ProfileCard";
import OptionCard from "../../components/more/OptionCard";
import { Ionicons } from "@expo/vector-icons";
import { getStorageItem } from "../../services/storageService";

export default function MoreScreen() {
  const router = useRouter();
  const [user, setUser] = useState({});
  const { width } = useWindowDimensions(); // Detecta el ancho de la pantalla

  useEffect(() => {
    const getUserData = async () => {
      const userData = JSON.parse(await getStorageItem("user"));
      setUser(userData);
    };

    getUserData();
  }, []);

  return (
    <ScrollView style={styles.mainContainer}>
      <View
        style={[
          styles.container,
          {
            width: width > 768 ? "50%" : "100%", // 50% de ancho en escritorio, 100% en móviles
            alignSelf: width > 768 ? "center" : "stretch", // Centra el contenedor en escritorio
          },
        ]}
      >
        {/* Componente de tarjeta de perfil */}
        <ProfileCard
          name={user.name}
          email={user.email}
          onViewProfile={() => router.push("/profile")}
        />

        {/* Opciones de la disponibles */}
        <OptionCard
          title="¿Cómo ser arrendador?"
          icon={({ size, color }) => (
            <Ionicons name="help-circle-outline" color={color} size={size} />
          )}
          route="/more/UpgradeToLandlord"
        />
        {user.mp_access_token && (
          <OptionCard
            title="Publicar mi moto"
            icon={({ size, color }) => (
              <Ionicons name="add-circle-outline" color={color} size={size} />
            )}
            route="/more/CreateMotorcycle"
          />
        )}
        <OptionCard
          title="Mis motos"
          icon={({ size, color }) => (
            <Ionicons name="speedometer-outline" color={color} size={size} />
          )}
          route="/more/MotorcyclesUserList"
        />
        {user.mp_access_token && (
          <OptionCard
            title="Entregas"
            icon={({ size, color }) => (
              <Ionicons name="location-outline" color={color} size={size} />
            )}
            route="/more/DeliveryList"
          />
        )}
        <OptionCard
          title="Mis alquileres"
          icon={({ size, color }) => (
            <Ionicons name="list-outline" color={color} size={size} />
          )}
          route="/rentalsHistory"
        />
        <OptionCard
          title="Mis opiniones"
          icon={({ size, color }) => (
            <Ionicons name="star-outline" color={color} size={size} />
          )}
          route="/more/UserRatingsList"
        />
        <OptionCard
          title="Ayuda"
          icon={({ size, color }) => (
            <Ionicons
              name="information-circle-outline"
              color={color}
              size={size}
            />
          )}
          route="/more/ContactUs"
        />
        {/* <ThemeCardOption /> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
});
