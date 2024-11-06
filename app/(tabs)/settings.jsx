// screens/SettingsScreen.jsx
import React from "react";
import { View, Text, Switch, Button, StyleSheet } from "react-native";
import colors from "../../theme/colors"; // Asegúrate de tener un archivo de colores en tu proyecto

export default function SettingsScreen() {
  const [isNotificationsEnabled, setIsNotificationsEnabled] =
    React.useState(false);
  const toggleNotifications = () =>
    setIsNotificationsEnabled((previousState) => !previousState);

  const handleLogout = () => {
    // Agrega tu lógica de cierre de sesión aquí
    console.log("Cerrando sesión...");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración</Text>

      {/* Configuración de Notificaciones */}
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Notificaciones</Text>
        <Switch
          trackColor={{ false: "#767577", true: colors.primary }}
          thumbColor={isNotificationsEnabled ? colors.primaryButton : "#f4f3f4"}
          onValueChange={toggleNotifications}
          value={isNotificationsEnabled}
        />
      </View>

      {/* Configuración de Cuenta */}
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Cuenta Privada</Text>
        <Switch
          trackColor={{ false: "#767577", true: colors.primary }}
          thumbColor={"#f4f3f4"}
          // Puedes agregar una función de cambio aquí si deseas que sea interactivo
        />
      </View>

      {/* Botón de Cerrar Sesión */}
      <Button
        title="Cerrar Sesión"
        onPress={handleLogout}
        color={colors.primaryButton}
      />
    </View>
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
    color: colors.primaryTextLight,
    marginBottom: 24,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  settingText: {
    fontSize: 18,
    color: colors.primaryTextLight,
  },
});
