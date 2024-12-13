import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { getRatingsByUser } from "../../services/ratingService";
import Rating from "../../components/ratings/Rating";
import colors from "../../theme/colors";
import { getStorageItem } from "../../services/storageService";

const RatingsPage = () => {
  const [userId, setUserId] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  const screenWidth = Dimensions.get("window").width; // Obtener el ancho de la pantalla

  useEffect(() => {
    const getUserId = async () => {
      const userData = JSON.parse(await getStorageItem("user"));
      setUserId(userData.id);
    };

    getUserId();
  }, []);

  useEffect(() => {
    const fetchRatings = async (userId) => {
      try {
        setLoading(true);
        const ratingsData = await getRatingsByUser(userId);
        setRatings(ratingsData);
      } catch (error) {
        console.error("Error fetching ratings:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchRatings(userId);
    }
  }, [userId]);

  return (
    <View style={styles.container}>
      <View style={screenWidth > 768 && styles.desktopContainer}>
        {/* Título de la página */}
        <Text style={styles.title}>Mis Opiniones</Text>

        {/* Componente de carga */}
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          // Lista de valoraciones
          <FlatList
            data={ratings}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Rating item={item} show="motorcycle" />}
            ListEmptyComponent={
              <Text style={styles.emptyText}>
                No hay valoraciones disponibles
              </Text>
            }
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
    backgroundColor: colors.background,
  },
  desktopContainer: {
    width: "50%", // En escritorio, el contenedor ocupa el 50% del ancho
    marginLeft: "auto", // Centrado en el centro de la pantalla
    marginRight: "auto", // Centrado en el centro de la pantalla
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primaryTextLight,
    marginBottom: 16,
    textAlign: "center",
  },
  emptyText: {
    textAlign: "center",
    color: colors.secondaryTextLight,
    marginVertical: 16,
  },
});

export default RatingsPage;
