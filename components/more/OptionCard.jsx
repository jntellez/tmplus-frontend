import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import colors from "../../theme/colors"; // Ajusta la ruta según tu estructura

const OptionCard = ({ title, icon: Icon, route }) => {
  const router = useRouter();

  const handlePress = () => {
    if (route) {
      router.push(route);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}>
      <View style={styles.iconContainer}>
        {Icon && <Icon size={24} color={colors.primaryTextLight} />}{" "}
        {/* Ajusta el tamaño y color del ícono */}
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: colors.cardBackground, // Fondo del card
    borderRadius: 8,
    marginBottom: 12,
    borderColor: colors.borderColor,
    borderWidth: 1,
  },
  iconContainer: {
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    color: colors.primaryTextLight, // Texto del título
    fontWeight: "bold",
  },
});

export default OptionCard;
