import React, { useState } from "react";
import {
  View,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Swiper from "react-native-swiper"; // Importa Swiper
import motorcycleImg from "../../assets/motorcycleImg.png"; // Imagen de fallback
import { SERVER_URL } from "../../constants";

const MotorcycleSwiper = ({ images }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const swiperKey = images?.length || 0; // Usa el tamaño de las imágenes como "key"

  // Función para abrir el modal con la imagen seleccionada
  const openModal = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  return (
    <View style={styles.swiperContainer}>
      <Swiper
        key={swiperKey} // Forzamos una nueva renderización al cambiar el tamaño de las imágenes
        style={styles.swiper}
        loop={false}
        showsPagination={true}
        paginationStyle={styles.paginationStyle}
      >
        {(images && images.length > 0 ? images : [motorcycleImg]).map(
          (swiperImg, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => openModal(swiperImg)} // Al presionar la imagen, abrir el modal
            >
              <Image
                source={
                  swiperImg
                    ? { uri: `${SERVER_URL}${swiperImg}` }
                    : motorcycleImg
                }
                style={styles.image}
                resizeMode="cover"
              />
            </TouchableWithoutFeedback>
          )
        )}
      </Swiper>

      {/* Modal para imagen a pantalla completa */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <TouchableOpacity style={styles.modalBackground} onPress={closeModal}>
          <Image
            source={{ uri: `${SERVER_URL}${selectedImage}` }}
            style={styles.modalImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  swiperContainer: {
    height: 200,
    marginBottom: 20,
  },
  swiper: {
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  paginationStyle: {
    bottom: 0,
  },
  // Estilos para el modal
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalImage: {
    width: "100%",
    height: "80%",
    borderRadius: 10,
  },
});

export default MotorcycleSwiper;
