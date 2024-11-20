import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Importa Ionicons
import colors from "../../theme/colors"; // Asegúrate de que tu archivo de colores esté correctamente importado

const UpgradeToLandlord = () => {
  const handleOpenMercadoPago = async () => {
    const url = "https://www.mercadopago.com.mx/developers/panel";
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(
          "Error",
          "No se pudo abrir la página. Por favor, inténtalo de nuevo."
        );
      }
    } catch (error) {
      console.error("Error al abrir el enlace:", error);
      Alert.alert("Error", "Ocurrió un problema al intentar abrir la página.");
    }
  };

  const showTokenAlert = () => {
    Alert.alert(
      "¡Importante!",
      "Tu Access Token es una credencial privada. No la compartas con nadie, ya que puede comprometer la seguridad de tu cuenta.",
      [{ text: "Entendido" }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        {/* Título principal */}
        <Text style={styles.title}>¿Cómo Convertirte en Arrendador?</Text>

        {/* Introducción */}
        <Text style={styles.text}>
          Convertirte en arrendador te permite publicar tus motocicletas y
          recibir pagos seguros directamente en tu cuenta de Mercado Pago. Sigue
          los pasos a continuación para actualizar tu cuenta.
        </Text>

        {/* Sección: Beneficios */}
        <View
          style={[
            styles.card,
            { backgroundColor: colors.secondaryButton + "80" },
          ]}
        >
          <View style={styles.cardHeader}>
            <Ionicons
              name="information-circle-outline"
              size={24}
              color={colors.primaryTextLight}
              style={styles.icon}
            />
            <Text style={styles.sectionTitle}>
              ¿Por qué actualizar a arrendador?
            </Text>
          </View>
          <Text style={styles.text}>
            Al convertirte en arrendador, obtienes acceso a herramientas
            avanzadas para gestionar tus motocicletas y garantizar pagos rápidos
            y seguros.
          </Text>
        </View>

        {/* Paso 1 */}
        <Text style={styles.sectionTitle}>
          Paso 1: Accede al panel de Mercado Pago
        </Text>
        <Text style={styles.text}>
          Inicia sesión en tu cuenta de Mercado Pago y accede al panel de
          desarrolladores de Mercado Pago para generar tu Access Token.
        </Text>
        <TouchableOpacity
          onPress={handleOpenMercadoPago}
          style={styles.linkButton}
        >
          <Text style={styles.linkText}>Ir a Mercado Pago</Text>
        </TouchableOpacity>

        {/* Paso 2 */}
        <Text style={styles.sectionTitle}>Paso 2: Crea una Aplicación</Text>
        <Text style={styles.text}>
          Crea una aplicación en el apartado de{" "}
          <Text style={styles.bold}>Tus integraciones</Text>. El nombre deberá
          ser &lt;tu-nombre&gt;-tmplus.{"\n"}
          Selecciona "Pagos online" y marca que no estás utilizando una
          plataforma de e-commerce.{"\n"}
          Luego, haz clic en el botón para crear la aplicación.
        </Text>
        <Image
          source={require("../../assets/create-app-screenshot.png")}
          style={styles.image}
        />

        {/* Paso 3 */}
        <Text style={styles.sectionTitle}>Paso 3: Obtener el Access Token</Text>
        <Text style={styles.text}>
          Dirígete a la sección de "Credenciales de Producción" y copia el
          Access Token.
        </Text>

        {/* Paso 4 */}
        <Text style={styles.sectionTitle}>
          Paso 4: Pega el Access Token en tu perfil
        </Text>
        <Text style={styles.text}>
          Copia el Access Token y pégalo en el campo correspondiente dentro de
          tu perfil en nuestra aplicación.
        </Text>

        {/* Notas importantes */}
        <View style={[styles.card, { backgroundColor: colors.warning + "80" }]}>
          <View style={styles.cardHeader}>
            <Ionicons
              name="information-circle-outline"
              size={24}
              color={colors.primaryTextLight}
              style={styles.icon}
            />
            <Text style={styles.sectionTitle}>Nota importante:</Text>
          </View>
          <Text style={styles.cardText}>
            Asegúrate de no compartir tu{" "}
            <Text style={styles.bold}>Access Token</Text> con nadie. Este código
            es privado y garantiza que puedas recibir pagos de forma segura.{" "}
            <TouchableOpacity onPress={showTokenAlert}>
              <Text style={styles.linkText}>
                Leer más sobre la seguridad del token
              </Text>
            </TouchableOpacity>
          </Text>
        </View>

        {/* Soporte */}
        <View
          style={[
            styles.card,
            { backgroundColor: colors.primaryButton + "80" },
          ]}
        >
          <View style={styles.cardHeader}>
            <Ionicons
              name="information-circle-outline"
              size={24}
              color={colors.primaryTextLight}
              style={styles.icon}
            />
            <Text style={styles.sectionTitle}>¿Necesitas ayuda?</Text>
          </View>
          <Text style={styles.cardText}>
            Si tienes problemas o dudas durante el proceso, visita la sección de
            soporte para recibir asistencia.
          </Text>
        </View>
      </View>
      <View style={{ marginBottom: 60 }}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primaryTextLight,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    color: colors.primaryTextLight,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.secondaryTextLight,
    marginBottom: 12,
  },
  cardText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.primaryTextLight,
    marginBottom: 12,
  },
  bold: {
    fontWeight: "bold",
    color: colors.primaryTextLight,
  },
  linkButton: {
    marginVertical: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: colors.linkColor,
    borderRadius: 5,
  },
  linkText: {
    fontSize: 16,
    color: colors.lightText,
    textAlign: "center",
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 240,
    resizeMode: "contain",
    marginVertical: 12,
  },
  card: {
    borderRadius: 8,
    padding: 16,
    marginVertical: 12,
    backgroundColor: colors.secondaryButton + "80",
    elevation: 3, // Sombra en Android
    shadowColor: "#000", // Sombra en iOS
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center", // Esto asegura que tanto el icono como el texto estén centrados verticalmente
    marginBottom: 8,
  },
  icon: {
    marginTop: 15,
    marginRight: 5,
  },
});

export default UpgradeToLandlord;
