// RatingsPreview.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import colors from "../../theme/colors";
import Rating from "./Rating";
import RatingsHeader from "./RatingsHeader";
import { getRatingsByMotorcycle } from "../../services/ratingService";

const RatingsPreview = ({ motorcycleId }) => {
  const [allRatings, setAllRatings] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const ratingsData = await getRatingsByMotorcycle(motorcycleId);
        setAllRatings(ratingsData);
      } catch (error) {
        console.error("Error fetching ratings:", error);
      }
    };

    fetchRatings(motorcycleId);
  }, [motorcycleId]);

  // Mostrar solo las primeras 3 valoraciones
  const previewRatings = allRatings.slice(0, 3);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Opiniones de la motocicleta</Text>
      <RatingsHeader ratings={allRatings} />
      <FlatList
        data={previewRatings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Rating item={item} />}
        nestedScrollEnabled={true}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay valoraciones disponibles</Text>
        }
      />
      {allRatings.length > 0 && (
        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={() => router.push(`/motorcycle/ratings/${motorcycleId}`)}
        >
          <Text style={styles.viewAllText}>Ver todas las valoraciones</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primaryTextLight,
    marginBottom: 20,
  },
  emptyText: {
    textAlign: "center",
    color: colors.secondaryTextLight,
    marginVertical: 16,
  },
  viewAllButton: {
    marginTop: 12,
    paddingVertical: 12,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 8,
    alignItems: "center",
  },
  viewAllText: {
    color: colors.primaryTextLight,
    fontWeight: "bold",
  },
});

export default RatingsPreview;
