import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  createRating,
  getRatingByUserAndMotorcycle,
  updateRating,
} from "../../services/ratingService"; // Funciones para crear y obtener calificación
import colors from "../../theme/colors";
import { Ionicons } from "@expo/vector-icons";

const RatingCard = ({ rentalId, motorcycleId, userId }) => {
  const [ratingValue, setRatingValue] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingRating, setExistingRating] = useState(null);
  const [rating, setRating] = useState({});

  // Función para obtener la calificación existente del usuario
  const fetchExistingRating = async () => {
    try {
      const rating = await getRatingByUserAndMotorcycle(userId, motorcycleId);
      setRating(rating);

      if (rating) {
        setExistingRating(rating);
        setRatingValue(rating.rating);
        setComment(rating.comment || "");
      }
    } catch (error) {
      console.error("Error fetching existing rating:", error);
    }
  };

  useEffect(() => {
    fetchExistingRating(); // Llamar a la función cuando se monta el componente
  }, [userId, motorcycleId]);

  // Función para manejar el envío de la calificación
  const handleSubmit = async () => {
    if (ratingValue === 0) {
      alert("Por favor, selecciona una calificación de estrellas.");
      return;
    }

    setIsSubmitting(true);

    try {
      const ratingData = {
        user_id: userId,
        motorcycle_id: motorcycleId,
        rating: ratingValue,
        comment,
        rental_id: rentalId,
      };

      await createRating(ratingData);
      setExistingRating({ rating: ratingValue, comment }); // Actualizar la calificación existente
    } catch (error) {
      console.error("Error submitting rating:", error);
      alert("Ocurrió un error al enviar tu calificación.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Función para manejar el cambio de las estrellas seleccionadas
  const handleStarPress = (value) => {
    setRatingValue(value);
  };

  // Función para manejar la actualización de la calificación
  const handleUpdate = async () => {
    if (ratingValue === 0) {
      alert("Por favor, selecciona una calificación de estrellas.");
      return;
    }

    setIsSubmitting(true);

    try {
      const ratingData = {
        user_id: userId,
        motorcycle_id: motorcycleId,
        rating: ratingValue,
        comment,
        rental_id: rentalId,
      };

      // Lógica para actualizar la calificación (suponiendo que `updateRating` sea una función para actualizar calificaciones)
      await updateRating(rating.id, ratingData);
      setExistingRating({ rating: ratingValue, comment });
    } catch (error) {
      console.error("Error updating rating:", error);
      alert("Ocurrió un error al actualizar tu calificación.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardText}>
        {existingRating
          ? "Actualiza tu calificación"
          : "Deja una calificación para esta renta"}
      </Text>
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((value) => (
          <TouchableOpacity key={value} onPress={() => handleStarPress(value)}>
            <Text
              style={[
                styles.star,
                ratingValue >= value ? styles.filledStar : styles.outlinedStar,
              ]}
            >
              <Ionicons
                name={ratingValue >= value ? "star" : "star-outline"}
                color={colors.pending}
                size={22}
              />
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        style={styles.commentInput}
        placeholder="Escribe un comentario (opcional)"
        placeholderTextColor={colors.borderColor}
        value={comment}
        onChangeText={setComment}
        multiline
      />
      <Button
        title={
          isSubmitting
            ? "Enviando..."
            : existingRating
            ? "Actualizar Calificación"
            : "Enviar Calificación"
        }
        onPress={existingRating ? handleUpdate : handleSubmit}
        disabled={isSubmitting}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    marginBottom: 350,
  },
  cardText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.linkColor,
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  star: {
    fontSize: 30,
    marginHorizontal: 2,
  },
  filledStar: {
    color: colors.primary,
  },
  outlinedStar: {
    color: colors.lightText,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 5,
    padding: 8,
    marginBottom: 12,
    color: colors.primaryTextLight,
    height: 80,
    textAlignVertical: "top",
  },
});

export default RatingCard;
