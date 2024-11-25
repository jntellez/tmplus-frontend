import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";
import colors from "../../theme/colors";
import { router, useLocalSearchParams } from "expo-router";
import { getMotorcycleById } from "../../services/motorcycleService";
import MotorcycleSwiper from "../../components/motorcycles/MotorcycleSwiper"; // Importamos el nuevo componente
import DeleteMotorcycleButton from "../../components/motorcycles/DeleteMotorcycleButton";
import { getStorageItem } from "../../services/storageService";
import RatingsPreview from "../../components/ratings/RatingsPreview";

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

  // List of sections to render in FlatList
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
    <View style={styles.container}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // Fondo de la página
    padding: 16, // Padding para todo el contenido
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
  buttonContainer: {
    marginBottom: 40,
    flexDirection: "row",
    justifyContent: "space-around",
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
