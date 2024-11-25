import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getRatingsByMotorcycle } from "../../../services/ratingService";
import RatingsHeader from "../../../components/ratings/RatingsHeader";
import Rating from "../../../components/ratings/Rating";
import colors from "../../../theme/colors";

const RatingsPage = () => {
  const [ratings, setRatings] = useState([]);
  const { motorcycleId } = useLocalSearchParams();

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const ratingsData = await getRatingsByMotorcycle(motorcycleId);
        setRatings(ratingsData);
      } catch (error) {
        console.error("Error fetching ratings:", error);
      }
    };

    fetchRatings(motorcycleId);
  }, [motorcycleId]);

  return (
    <View style={styles.container}>
      {/* Header que muestra la media de las valoraciones y el número total */}
      <RatingsHeader ratings={ratings} />

      <FlatList
        data={ratings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Rating item={item} />}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay valoraciones disponibles</Text>
        }
      />
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
  emptyText: {
    textAlign: "center",
    color: colors.secondaryTextLight,
    marginVertical: 16,
  },
});

export default RatingsPage;
