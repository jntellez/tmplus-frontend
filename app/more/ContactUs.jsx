import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { send } from "@emailjs/react-native";
import colors from "../../theme/colors";

const HelpPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Configura EmailJS
  const SERVICE_ID = "service_pw2eke8";
  const TEMPLATE_ID = "template_yzltbwb";
  const USER_ID = "xhP2Tp6lGDfix8oI8"; // Usa tu propio User ID

  const handleSubmit = async () => {
    if (!email || !message) {
      Alert.alert("Error", "Por favor completa todos los campos.");
      return;
    }

    setLoading(true);

    try {
      // Enviar el correo con EmailJS usando los valores de estado
      await send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_email: email,
          message,
        },
        {
          publicKey: "xhP2Tp6lGDfix8oI8",
        }
      );

      // Si el correo se envió correctamente
      setLoading(false);
      Alert.alert(
        "¡Mensaje Enviado!",
        "Tu mensaje ha sido enviado correctamente. Te responderemos pronto."
      );
      setEmail("");
      setMessage("");
    } catch (error) {
      setLoading(false);
      Alert.alert(
        "Error",
        "Hubo un problema al enviar tu mensaje. Intenta nuevamente."
      );
      console.error(error); // Muestra el error para depuración
    }
  };

  return (
    <View style={{ backgroundColor: colors.background, minHeight: "100%" }}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Página de Ayuda</Text>

        <Text style={styles.description}>
          Si tienes alguna duda o necesitas asistencia, no dudes en contactarnos
          a través del formulario a continuación.
        </Text>

        <View style={styles.formContainer}>
          <Text style={styles.formLabel}>Correo electrónico:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Introduce tu correo"
            placeholderTextColor={colors.secondaryTextLight}
            keyboardType="email-address"
          />

          <Text style={styles.formLabel}>Mensaje:</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={message}
            onChangeText={setMessage}
            placeholder="Escribe tu mensaje"
            placeholderTextColor={colors.secondaryTextLight}
            multiline
            numberOfLines={4}
          />

          {loading ? (
            <ActivityIndicator size="large" color={colors.linkColor} />
          ) : (
            <Button
              title="Enviar"
              onPress={handleSubmit}
              color={colors.linkColor}
            />
          )}
        </View>

        <View style={styles.contactInfo}>
          <Text style={styles.contactTitle}>
            ¿Prefieres escribirnos directamente?
          </Text>
          <Text style={styles.contactText}>
            Puedes enviarnos un correo a{" "}
            <Text style={styles.link}>soporte.tmplus@gmail.com</Text>.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
    // Aquí es donde se establece el 50% en pantallas grandes
    width: "100%", // 100% en dispositivos pequeños
    maxWidth: 1200, // No más de 1200px de ancho en pantallas grandes
    marginLeft: "auto", // Centrado en pantallas grandes
    marginRight: "auto", // Centrado en pantallas grandes
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primaryTextLight,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: colors.secondaryTextLight,
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: colors.cardBackground,
    padding: 16,
    borderRadius: 8,
    borderColor: colors.borderColor,
    borderWidth: 1,
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 14,
    color: colors.primaryTextLight,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: colors.borderColor,
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 8,
    color: colors.primaryTextLight,
    marginBottom: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  contactInfo: {
    marginTop: 20,
    backgroundColor: colors.cardBackground,
    padding: 16,
    borderRadius: 8,
    borderColor: colors.borderColor,
    borderWidth: 1,
  },
  contactTitle: {
    fontSize: 18,
    color: colors.primaryTextLight,
    fontWeight: "bold",
    marginBottom: 8,
  },
  contactText: {
    fontSize: 16,
    color: colors.secondaryTextLight,
  },
  link: {
    color: colors.linkColor,
    textDecorationLine: "underline",
  },
});

export default HelpPage;
