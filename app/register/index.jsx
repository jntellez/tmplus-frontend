import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      return Alert.alert("Error", "Las contraseñas no coinciden");
    }

    try {
      // Lógica de registro (e.g., llamada a la API)
      const success = true; // Cambia esto según la respuesta de la API
      if (success) {
        Alert.alert("Éxito", "Cuenta creada exitosamente");
        router.replace("/login"); // Redirige a la pantalla de login
      } else {
        Alert.alert("Error", "No se pudo crear la cuenta");
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un problema al registrarse");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
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
      <TextInput
        placeholder="Confirmar contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Registrarse" onPress={handleRegister} />
      <Text style={styles.loginLink} onPress={() => router.push("/login")}>
        ¿Ya tienes cuenta? Inicia Sesión
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
  loginLink: { marginTop: 20, color: "blue", textAlign: "center" },
});
