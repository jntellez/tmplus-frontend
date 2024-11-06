import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // Aquí realizarías la lógica de autenticación.
    // Si tienes una función de autenticación, llámala aquí.
    if (email && password) {
      try {
        // Lógica de autenticación (e.g., llamada a la API)
        const success = true; // Cambia esto según la respuesta de la API
        if (success) {
          router.replace("/home"); // Redirige al usuario al Home si tiene éxito
        } else {
          Alert.alert("Error", "Credenciales incorrectas");
        }
      } catch (error) {
        Alert.alert("Error", "Ocurrió un problema al iniciar sesión");
      }
    } else {
      Alert.alert("Error", "Por favor, ingrese su correo y contraseña");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Iniciar Sesión" onPress={handleLogin} />
      <Text
        style={styles.registerLink}
        onPress={() => router.push("/register")}
      >
        ¿No tienes cuenta? Regístrate
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  registerLink: { marginTop: 20, color: "blue", textAlign: "center" },
});
