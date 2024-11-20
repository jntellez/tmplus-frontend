import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  Linking,
  Platform,
} from "react-native";
import colors from "../theme/colors";
import { createPayment } from "../services/paymentService";

const PaymentButton = ({ rental, user, motorcycle, disabled }) => {
  const payment = {
    items: [
      {
        title: `${motorcycle.brand}, ${motorcycle.model}, ${motorcycle.year}`,
        quantity: 1,
        unit_price: parseInt(rental.total_price),
      },
    ],
    buyer: {
      name: user.name,
      email: user.email,
      phone: {
        area_code: "+52",
        number: user.phone,
      },
    },
    rentalId: rental.id,
    ownerId: motorcycle.user_id,
    commission: rental.total_price * 0.08, // 8% del precio total
  };

  const handlePayment = async () => {
    try {
      const paymentData = await createPayment(payment);

      if (paymentData && paymentData.sandbox_initial_point) {
        Alert.alert(
          "Redirigiendo al Pago",
          "Serás llevado a Mercado Pago para completar el pago.",
          [
            {
              text: "Ir al pago",
              onPress: async () => {
                const url = paymentData.sandbox_initial_point;

                if (Platform.OS === "web") {
                  // Redirección en navegadores
                  window.location.href = url;
                } else {
                  // Verifica si se puede abrir la URL en móvil
                  const supported = await Linking.canOpenURL(url);
                  if (supported) {
                    await Linking.openURL(url);
                  } else {
                    Alert.alert(
                      "Error",
                      "No se puede abrir la URL de Mercado Pago."
                    );
                  }
                }
              },
            },
            { text: "Cancelar", style: "cancel" },
          ]
        );
      } else {
        throw new Error("No se pudo generar la preferencia de pago.");
      }
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      Alert.alert("Error", "No se pudo procesar el pago. Inténtalo de nuevo.");
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled ? styles.disabledButton : styles.enabledButton,
      ]}
      onPress={handlePayment}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>
        Proceder al Pago:{" "}
        <Text style={styles.totalPrice}>${rental.total_price}</Text>
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  enabledButton: {
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.linkColor,
  },
  disabledButton: {
    backgroundColor: colors.borderColor,
  },
  buttonText: {
    color: colors.primaryTextLight,
    fontSize: 16,
    fontWeight: "bold",
  },
  totalPrice: {
    fontWeight: "bold",
    color: colors.linkColor,
  },
});

export default PaymentButton;
