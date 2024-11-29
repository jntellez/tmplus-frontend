import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../theme/colors";
import { getUserData } from "../../services/userService";
import { getMotorcycleById } from "../../services/motorcycleService";
import { useRouter } from "expo-router"; // Usar el hook useRouter

const Rating = ({ item, show }) => {
  const fullStars = Math.floor(item.rating);
  const emptyStars = 5 - fullStars;
  const [userName, setUserName] = useState("");
  const [motorcycleName, setMotorcycleName] = useState("");
  const router = useRouter(); // Inicializar el router

  // Obtener el tamaño de la pantalla
  const { width } = Dimensions.get("window");
  const starSize = width > 768 ? 24 : 18; // Ajuste dinámico del tamaño de las estrellas

  useEffect(() => {
    const getUserName = async (userId) => {
      try {
        const user = await getUserData(userId);
        setUserName(user.name);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const getMotorcycleName = async (motorcycleId) => {
      try {
        const motorcycle = await getMotorcycleById(motorcycleId);
        const { brand, model, year } = motorcycle;
        setMotorcycleName(`${brand} ${model} ${year}`);
      } catch (error) {
        console.error("Error fetching motorcycle by id:", error);
        setMotorcycleName("Motorcycle not found");
      }
    };

    // Solo se obtiene el nombre del usuario si `show` no es "motorcycle"
    if (show !== "motorcycle" && item.user_id) {
      getUserName(item.user_id);
    }

    // Solo se obtiene el nombre de la motocicleta si `show` es "motorcycle"
    if (show === "motorcycle" && item.motorcycle_id) {
      getMotorcycleName(item.motorcycle_id);
    }
  }, [item, show]);

  // Renderizamos las estrellas llenas y vacías
  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Ionicons
        key={`full-${i}`}
        name="star"
        size={starSize} // Usamos el tamaño dinámico
        color={colors.pending}
      />
    );
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <Ionicons
        key={`empty-${i}`}
        name="star-outline"
        size={starSize} // Usamos el tamaño dinámico
        color={colors.pending}
      />
    );
  }

  const handleNavigation = () => {
    if (show === "motorcycle") {
      router.push(`/rental/${item.rental_id}`);
    }
  };

  return (
    <TouchableOpacity
      style={styles.ratingCard}
      onPress={handleNavigation}
      disabled={show !== "motorcycle"} // Deshabilitar el botón si `show` no es "motorcycle"
    >
      <View style={styles.ratingHeader}>
        <Text style={styles.userName}>
          {show === "motorcycle" ? motorcycleName : userName}
        </Text>
        <Text style={styles.ratingDate}>
          {new Date(item.rating_date).toLocaleDateString()}
        </Text>
      </View>
      <View style={styles.stars}>{stars}</View>
      {item.comment && <Text style={styles.comment}>{item.comment}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ratingCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  ratingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  userName: {
    fontWeight: "bold",
    color: colors.primaryTextLight,
  },
  ratingDate: {
    color: colors.secondaryTextLight,
    fontSize: 12,
  },
  stars: {
    flexDirection: "row",
    marginBottom: 8,
  },
  comment: {
    color: colors.secondaryTextLight,
    fontSize: 14,
  },
});

export default Rating;
