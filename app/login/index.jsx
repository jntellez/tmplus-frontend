import React, { useState } from "react";
import {
  Button,
  TextInput,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { login } from "../../services/authService"; // Importar el servicio de autenticación
import { useRouter } from "expo-router";
import colors from "../../theme/colors"; // Importa los colores del tema

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true); // Mostrar el indicador de carga
    setError(""); // Limpiar el mensaje de error antes de intentar el login

    try {
      if (email && password) {
        // Llamar al servicio de login
        const token = await login(email, password);

        if (token) {
          // Si el login es exitoso, redirigir al Home
          router.replace("/home");
        }
      } else {
        setError("Por favor ingrese el correo y la contraseña");
      }
    } catch (error) {
      setError("Error al iniciar sesión. Intenta de nuevo.");
    } finally {
      setLoading(false); // Ocultar el indicador de carga después del proceso
    }
  };

  const navigateToRegister = () => {
    // Navegar a la pantalla de registro
    router.push("/register");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>
      {/* Título de la pantalla */}
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
          title="Iniciar sesión"
          onPress={handleLogin}
          color={colors.primaryButtonColor}
        />
      )}
      {error && <Text style={styles.error}>{error}</Text>}
      <Text style={styles.registerLink} onPress={navigateToRegister}>
        ¿No tienes cuenta? Regístrate
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primaryTextLight,
    textAlign: "center",
    marginBottom: 20,
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
    borderColor: colors.dangerButton,
  },
  error: {
    color: colors.dangerButton,
    marginTop: 10,
  },
  registerLink: {
    color: colors.secondaryTextLight,
    marginTop: 20,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
