import React from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import Logo from "../assets/Logo";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/colors";

export default function Layout() {
  const router = useRouter();
  const segments = useSegments();

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
          <Logo color={colors.background} style={{ width: 10, height: 8 }} />
        ),
        headerRight: () => {
          if (segments.includes("profile")) return null;

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
