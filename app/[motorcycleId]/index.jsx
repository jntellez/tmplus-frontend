import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import colors from "../../theme/colors";
import { router, useLocalSearchParams } from "expo-router";
import { getMotorcycleById } from "../../services/motorcycleService";
import MotorcycleSwiper from "../../components/motorcycles/MotorcycleSwiper";
import DeleteMotorcycleButton from "../../components/motorcycles/DeleteMotorcycleButton";
import { getStorageItem } from "../../services/storageService";
import RatingsPreview from "../../components/ratings/RatingsPreview";

const { width } = Dimensions.get("window"); // Obtener el ancho de la pantalla

const DetailScreen = () => {
  const { motorcycleId } = useLocalSearchParams();
  const [motorcycle, setMotorcycle] = useState({});
  const [user, setUser] = useState({});

  const fetchMotorcycle = async (id) => {
    const data = await getMotorcycleById(id);
    setMotorcycle(data);
  };

  useEffect(() => {
    fetchMotorcycle(motorcycleId);
  }, [motorcycleId]);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getStorageItem("user");
      setUser(JSON.parse(userData));
    };

    fetchUserData();
  }, []);

  const isOwner = user.id === motorcycle.user_id;

  const renderItem = ({ item }) => {
    if (item === "motorcycle") {
      return (
        <>
          <MotorcycleSwiper images={motorcycle.images} />
          <View style={styles.card}>
            <Text style={styles.cardHeader}>Detalles de la Motocicleta</Text>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Marca: </Text>
              <Text style={styles.cardText}>{motorcycle.brand}</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Modelo: </Text>
              <Text style={styles.cardText}>{motorcycle.model}</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Año: </Text>
              <Text style={styles.cardText}>{motorcycle.year}</Text>
            </View>
          </View>
        </>
      );
    }

    if (item === "description") {
      return (
        <View style={styles.card}>
          <Text style={styles.cardHeader}>Descripción</Text>
          <View style={styles.cardContent}>
            <Text style={styles.cardText}>{motorcycle.description}</Text>
          </View>
        </View>
      );
    }

    if (item === "rentalPrice") {
      return (
        <View style={styles.rowCard}>
          <View style={styles.card}>
            <Text style={styles.cardHeader}>Precio de Alquiler</Text>
            <View style={styles.cardContent}>
              <Text style={styles.cardText}>${motorcycle.rental_price}</Text>
            </View>
          </View>

          <View style={[styles.card, styles.availabilityCard]}>
            <Text style={styles.cardHeader}>Disponibilidad</Text>
            <View style={styles.cardContent}>
              <Text style={styles.cardText}>
                {motorcycle.available ? "Disponible" : "No disponible"}
              </Text>
            </View>
          </View>
        </View>
      );
    }

    if (item === "publishDate") {
      return (
        <View style={styles.card}>
          <Text style={styles.cardHeader}>Fecha de Publicación</Text>
          <View style={styles.cardContent}>
            <Text style={styles.cardText}>
              {new Date(motorcycle.publish_date).toLocaleDateString()}
            </Text>
          </View>
        </View>
      );
    }

    return null;
  };

  return (
    <View style={styles.wrapper}>
      <View
        style={[styles.container, { width: width > 1024 ? "50%" : "100%" }]}
      >
        <FlatList
          data={[
            "motorcycle",
            "description",
            "rentalPrice",
            "publishDate",
            "buttons",
            "ratings",
          ]}
          keyExtractor={(item) => item}
          renderItem={renderItem}
          ListFooterComponent={() => (
            <>
              {isOwner && (
                <View style={styles.ownerButtonsContainer}>
                  <View style={[styles.button, styles.editButton]}>
                    <Button
                      title="Editar"
                      color={colors.pending}
                      onPress={() =>
                        router.push(
                          `/more/UpdateMotorcycle/?motorcycleId=${motorcycle.id}`
                        )
                      }
                    />
                  </View>
                  <View style={[styles.button, styles.deleteButton]}>
                    <DeleteMotorcycleButton motorcycleId={motorcycle.id} />
                  </View>
                </View>
              )}
              {!isOwner && (
                <View style={styles.button}>
                  <Button
                    title="Alquilar Motocicleta"
                    color={colors.primaryButton}
                    onPress={() => router.push(`/${motorcycleId}/rents`)}
                  />
                </View>
              )}
              <RatingsPreview motorcycleId={motorcycleId} />
            </>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center", // Para centrar el contenido
    alignItems: "center", // Centra el contenido horizontalmente
    backgroundColor: colors.background, // Fondo para toda la pantalla
  },
  container: {
    flex: 1,
    backgroundColor: colors.background, // Fondo para el contenedor
    padding: 16, // Padding que tenías anteriormente
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  cardHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.linkColor,
    marginBottom: 4,
  },
  cardContent: {
    flexDirection: "row",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primaryTextLight,
    marginRight: 8,
  },
  cardText: {
    fontSize: 16,
    color: colors.lightText || "#E0E0E0",
  },
  rowCard: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ownerButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    marginHorizontal: 6,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 8,
    justifyContent: "center",
    backgroundColor: colors.cardBackground,
  },
});

export default DetailScreen;
