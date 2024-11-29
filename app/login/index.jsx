import React, { useState } from "react";
import {
  Button,
  TextInput,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";
import { login, parseJwt } from "../../services/authService";
import { useRouter } from "expo-router";
import colors from "../../theme/colors";
import { getUserData } from "../../services/userService";
import { setStorageItem } from "../../services/storageService";

const { width } = Dimensions.get("window"); // Obtiene el ancho de la pantalla

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    if (!email || !password) {
      setError("Por favor ingrese el correo y la contraseña");
      setLoading(false);
      return;
    }

    try {
      const token = await login(email, password);

      if (token) {
        const { id } = parseJwt(token);
        const userData = await getUserData(id);

        setStorageItem("user", JSON.stringify(userData));

        router.replace("/home");
      } else {
        setError("Credenciales incorrectas. Intente de nuevo.");
      }
    } catch (error) {
      setError(
        "Error al iniciar sesión. Verifique su conexión e intente de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  const navigateToRegister = () => {
    router.push("/register");
  };

  return (
    <View style={styles.outerContainer}>
      {" "}
      {/* Contenedor principal que centra el contenido */}
      <View style={styles.container}>
        <Text style={styles.title}>Iniciar sesión</Text>
        <TextInput
          style={[styles.input, error && styles.errorInput]}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor={colors.secondaryTextLight}
          autoCapitalize="none"
        />
        <TextInput
          style={[styles.input, error && styles.errorInput]}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor={colors.secondaryTextLight}
        />
        {loading ? (
          <ActivityIndicator size="large" color={colors.primaryButtonColor} />
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
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: "center", // Centra el contenido en el eje vertical
    alignItems: "center", // Centra el contenido en el eje horizontal
    backgroundColor: colors.background,
    padding: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    width: "100%", // Ancho por defecto para móviles
    maxWidth: 600, // Tamaño máximo del contenedor
  },
  title: {
    fontSize: width > 1024 ? 30 : 24, // Ajuste de tamaño de fuente dependiendo del ancho
    fontWeight: "bold",
    color: colors.primaryTextLight,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: colors.borderColor,
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    color: colors.primaryTextLight,
    borderRadius: 4,
  },
  errorInput: {
    borderColor: colors.dangerButton,
  },
  error: {
    color: colors.dangerButton,
    marginTop: 10,
    textAlign: "center",
  },
  registerLink: {
    color: colors.secondaryTextLight,
    marginTop: 20,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
