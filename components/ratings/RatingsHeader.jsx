import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../../theme/colors";

const RatingsHeader = ({ ratings }) => {
  if (ratings.length === 0) {
    return null;
  }

  const totalRatings = ratings.length;
  const averageRating =
    ratings.reduce((sum, rating) => sum + rating.rating, 0) / totalRatings;
  const roundedRating = Math.floor(averageRating);
  const isHalfStar = averageRating % 1 >= 0.5;

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Text style={styles.averageText}>{averageRating.toFixed(1)}</Text>
        <View style={styles.stars}>
          {Array.from({ length: 5 }, (_, i) => (
            <FontAwesome
              key={i}
              name={
                i < roundedRating
                  ? "star"
                  : i === roundedRating && isHalfStar
                  ? "star-half-full"
                  : "star-o"
              }
              size={18}
              color={colors.pending}
            />
          ))}
        </View>
      </View>
      <Text style={styles.totalRatingsText}>{totalRatings} valoraciones</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between", // Espacio entre media de estrellas y número de valoraciones
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  averageText: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primaryTextLight,
    marginRight: 8,
  },
  stars: {
    flexDirection: "row",
  },
  totalRatingsText: {
    fontSize: 14,
    color: colors.secondaryTextLight,
  },
});

export default RatingsHeader;
