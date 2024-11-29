import React from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import Logo from "../assets/Logo";
import { StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/colors";

// Obtener el tamaño de la ventana
const windowWidth = Dimensions.get("window").width;

export default function Layout() {
  const router = useRouter();
  const segments = useSegments();

  // Ajustar el tamaño del logo en función del tamaño de la ventana
  const logoWidth = windowWidth > 768 ? 130 : 40; // Tamaño mayor en pantallas grandes
  const logoHeight = windowWidth > 768 ? 100 : 32; // Tamaño mayor en pantallas grandes

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#009dff",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerTitle: () => (
          <Logo
            color={colors.background}
            style={{ width: logoWidth, height: logoHeight }}
          />
        ),
        headerRight: () => {
          if (
            segments.includes("profile") ||
            segments.includes("login") ||
            segments.includes("register")
          )
            return null;

          return (
            <TouchableOpacity
              style={styles.bubble}
              onPress={() => router.push("/profile")}
            >
              <Ionicons
                name="person-circle"
                size={37}
                color={colors.background}
              />
            </TouchableOpacity>
          );
        },
      }}
    >
      {/* Las pantallas se cargan automáticamente desde la carpeta pages */}
    </Stack>
  );
}

const styles = StyleSheet.create({
  bubble: {
    backgroundColor: "transparent",
    borderRadius: 20,
    width: 37,
    height: 37,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    padding: 0,
  },
});
