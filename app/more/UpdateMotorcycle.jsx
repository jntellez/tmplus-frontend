import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import colors from "../../theme/colors";
import {
  deleteMotorcycleImage,
  getMotorcycleById,
  getMotorcycleImages,
  updateMotorcycleWithImages,
} from "../../services/motorcycleService";
import { Ionicons } from "@expo/vector-icons";
import { getStorageItem } from "../../services/storageService";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { SERVER_URL } from "../../constants";

export default function CreateMotorcycle() {
  const router = useRouter();
  const { motorcycleId } = useLocalSearchParams();

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [rentalPrice, setRentalPrice] = useState("");
  const [description, setDescription] = useState("");
  const [deliveryInstructions, setDeliveryInstructions] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    const setMotorcycleData = async (motorcycleId) => {
      const motorcycleData = await getMotorcycleById(motorcycleId);
      setBrand(motorcycleData.brand);
      setModel(motorcycleData.model);
      setYear(motorcycleData.year.toString());
      setRentalPrice(motorcycleData.rental_price);
      setDescription(motorcycleData.description);
      setDeliveryInstructions(motorcycleData.delivery_instructions);
      const imagesData = await getMotorcycleImages(motorcycleId);
      setImages(imagesData);
    };
    setMotorcycleData(motorcycleId);
  }, []);

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImages = result.assets.map((asset) => ({
        uri: asset.uri,
      }));
      setImages([...images, ...selectedImages]);
    }
  };

  const handleRemoveImage = async (index, imageId) => {
    try {
      // Verificar si la imagen tiene un ID asociado (está almacenada en el servidor)
      if (imageId) {
        // Llamar a la API para eliminar la imagen del servidor
        await deleteMotorcycleImage(imageId);
      }

      // Actualizar las imágenes locales
      const updatedImages = images.filter((_, i) => i !== index);
      setImages(updatedImages);
    } catch (error) {
      console.error("Error al eliminar la imagen:", error);
      alert("Hubo un error al eliminar la imagen. Inténtalo de nuevo.");
    }
  };

  const handleSubmit = async () => {
    if (!brand || !model || !year || !rentalPrice) {
      Alert.alert("Error", "Por favor llena todos los campos obligatorios.");
      return;
    }

    if (images.length === 0) {
      Alert.alert("Error", "Por favor selecciona al menos una imagen.");
      return;
    }

    const motorcycleData = {
      brand,
      model,
      year: parseInt(year, 10),
      rental_price: parseFloat(rentalPrice),
      description,
      delivery_instructions: deliveryInstructions,
    };

    try {
      // Llamada para crear la motocicleta y luego agregar las imágenes
      const newMotorcycle = await updateMotorcycleWithImages(
        motorcycleId,
        motorcycleData,
        images
      );

      router.replace("/home");
      setTimeout(() => {
        router.push(`/${newMotorcycle.id}`);
      }, 100);
    } catch (error) {
      console.error(
        "Hubo un error al crear la motocicleta o subir las imágenes:",
        error
      );
      Alert.alert(
        "Error",
        "Hubo un problema al crear la motocicleta o subir las imágenes."
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Rentar una Motocicleta</Text>

      {/* Card: Información de la motocicleta */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Información de la motocicleta</Text>
        <TextInput
          style={styles.input}
          placeholder="Marca"
          placeholderTextColor={colors.borderColor}
          value={brand}
          onChangeText={setBrand}
        />
        <TextInput
          style={styles.input}
          placeholder="Modelo"
          placeholderTextColor={colors.borderColor}
          value={model}
          onChangeText={setModel}
        />
        <TextInput
          style={styles.input}
          placeholder="Año"
          placeholderTextColor={colors.borderColor}
          keyboardType="numeric"
          value={year}
          onChangeText={setYear}
        />
      </View>

      {/* Card: Información de la renta */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Información de la renta</Text>
        <TextInput
          style={styles.input}
          placeholder="Precio de renta por día"
          placeholderTextColor={colors.borderColor}
          keyboardType="numeric"
          value={rentalPrice}
          onChangeText={setRentalPrice}
        />
        <TextInput
          style={styles.input}
          placeholder="Descripción"
          placeholderTextColor={colors.borderColor}
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Instrucciones de entrega"
          placeholderTextColor={colors.borderColor}
          value={deliveryInstructions}
          onChangeText={setDeliveryInstructions}
        />
      </View>

      {/* Card: Selección de imágenes */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Imágenes de la motocicleta</Text>
          <TouchableOpacity onPress={handlePickImage} style={{ marginTop: -3 }}>
            <Ionicons
              name="add-circle-outline"
              color={colors.primaryTextLight}
              size={32}
            />
          </TouchableOpacity>
        </View>
        <ScrollView horizontal style={styles.imagePreviewContainer}>
          {images.map((image, index) => (
            <View key={index} style={styles.imagePreviewWrapper}>
              <Image
                source={{
                  uri: image?.image_url
                    ? `${SERVER_URL}${image?.image_url}`
                    : `${image?.uri}`,
                }}
                style={styles.imagePreview}
              />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveImage(index, image.id)}
              >
                <Ionicons
                  name="remove-circle-outline"
                  color={colors.cancelled}
                  size={18}
                />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

      <Button
        title="Actualizar"
        onPress={handleSubmit}
        color={colors.pending}
      />
      <View style={{ marginVertical: 18 }}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: colors.linkColor,
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primaryTextLight,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  input: {
    fontSize: 16,
    color: colors.secondaryTextLight,
    marginTop: 4,
    borderBottomWidth: 1,
    borderColor: colors.borderColor,
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  imageButton: {
    backgroundColor: colors.primaryButton,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  imageButtonText: {
    color: colors.lightText,
    fontWeight: "bold",
    textAlign: "center",
  },
  imagePreviewContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  imagePreviewWrapper: {
    position: "relative",
    marginRight: 8,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removeButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: colors.danger,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  removeButtonText: {
    color: colors.lightText,
    fontWeight: "bold",
  },
});
