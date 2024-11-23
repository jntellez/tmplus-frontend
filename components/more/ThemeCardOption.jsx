import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import colors from "../../theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { getStorageItem, setStorageItem } from "../../services/storageService";

const ThemeOptionCard = () => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Estado del tema
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const getThemeValue = async () => {
      const themeValue = await getStorageItem("theme");
      if (!themeValue) {
        setStorageItem("theme", theme);
      }
      setTheme(themeValue);
    };

    getThemeValue();
  }, []);

  const onToggleTheme = (newTheme) => {
    setStorageItem("theme", newTheme);
    setTheme(newTheme);
  };

  const toggleSwitch = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    if (onToggleTheme) {
      onToggleTheme(isDarkMode ? "dark" : "light");
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Ionicons
          name={isDarkMode ? "moon-outline" : "sunny-outline"}
          size={24}
          color={colors.primaryTextLight}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Modo {isDarkMode ? "Oscuro" : "Claro"}</Text>
        <Text style={styles.description}>
          Cambia al tema {isDarkMode ? "claro" : "oscuro"}
        </Text>
      </View>
      <Switch
        trackColor={{
          false: colors.borderColor,
          true: colors.linkColor,
        }}
        thumbColor={colors.lightText}
        onValueChange={toggleSwitch}
        value={isDarkMode}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    marginBottom: 12,
    borderColor: colors.borderColor,
    borderWidth: 1,
  },
  iconContainer: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: colors.primaryTextLight,
    fontWeight: "bold",
  },
  description: {
    fontSize: 12,
    color: colors.secondaryTextLight,
    marginTop: 4,
  },
});

export default ThemeOptionCard;
