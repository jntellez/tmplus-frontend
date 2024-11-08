import React, { useState } from "react";
import {
  Button,
  TextInput,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { register, parseJwt } from "../../services/authService"; // Importar el servicio de autenticación
import { useRouter } from "expo-router";
import colors from "../../theme/colors"; // Importa los colores del tema
import * as SecureStore from "expo-secure-store";
import { getUserData } from "../../services/userService"; // Servicio para obtener datos del usuario

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    setLoading(true); // Mostrar el indicador de carga
    setError(""); // Limpiar el mensaje de error antes de intentar el registro

    try {
      if (name && email && password) {
        // Llamar al servicio de registro
        const token = await register(name, email, password);

        if (token) {
          // Si el registro es exitoso, extraer el ID del usuario desde el token
          const { id } = parseJwt(token);
          const userData = await getUserData(id);

          // Guardar los datos del usuario en SecureStore
          await SecureStore.setItemAsync("user", JSON.stringify(userData));

          // Redirigir al Home
          router.replace("/home");
        }
      } else {
        setError("Por favor ingrese todos los campos");
      }
    } catch (error) {
      setError("Error al registrar el usuario. Intenta de nuevo.");
    } finally {
      setLoading(false); // Ocultar el indicador de carga después del proceso
    }
  };

  const navigateToLogin = () => {
    // Navegar a la pantalla de login
    router.push("/login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrarse</Text>
      {/* Título de la pantalla */}
      <TextInput
        style={[styles.input, error && styles.errorInput]}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
        placeholderTextColor={colors.secondaryTextLight} // Color del texto del placeholder
      />
      <TextInput
        style={[styles.input, error && styles.errorInput]}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholderTextColor={colors.secondaryTextLight} // Color del texto del placeholder
      />
      <TextInput
        style={[styles.input, error && styles.errorInput]}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor={colors.secondaryTextLight} // Color del texto del placeholder
      />
      {loading ? (
        <ActivityIndicator size="large" color={colors.secondaryTextLight} />
      ) : (
        <Button
          title="Registrarse"
          onPress={handleRegister}
          color={colors.primaryButtonColor} // Color del botón
        />
      )}
      {error && <Text style={styles.error}>{error}</Text>}
      <Text style={styles.loginLink} onPress={navigateToLogin}>
        ¿Ya tienes cuenta? Inicia sesión
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: colors.background, // Color de fondo de la pantalla
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primaryTextLight, // Color del texto del título
    textAlign: "center", // Centrar el título
    marginBottom: 20, // Separación entre el título y los inputs
  },
  input: {
    height: 40,
    borderColor: colors.borderColor, // Color del borde de los inputs
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    color: colors.primaryTextLight, // Color del texto en los inputs
    borderRadius: 4, // Redondear los bordes de los inputs
  },
  errorInput: {
    borderColor: colors.dangerButton, // Color de borde en caso de error
  },
  error: {
    color: colors.dangerButton, // Color del mensaje de error
    marginTop: 10,
    textAlign: "center", // Centrar el mensaje de error
  },
  loginLink: {
    color: colors.secondaryTextLight, // Color del enlace de login
    marginTop: 20,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
