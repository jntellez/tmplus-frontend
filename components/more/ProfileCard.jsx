import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DefaultUserImage from "../../assets/default-user-image.webp";
import colors from "../../theme/colors";

export default function ProfileCard({ name, email, onViewProfile }) {
  return (
    <View style={styles.userCard}>
      <Image source={DefaultUserImage} style={styles.userImage} />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{name}</Text>
        <Text style={styles.userEmail}>{email}</Text>
        <TouchableOpacity style={styles.viewProfile} onPress={onViewProfile}>
          <Text style={styles.viewProfileText}>Mi perfil</Text>
          <Ionicons
            name="chevron-forward"
            size={12}
            color={colors.linkColor}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primaryTextLight,
  },
  userEmail: {
    fontSize: 14,
    color: colors.secondaryTextLight,
    marginBottom: 8,
  },
  viewProfile: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  viewProfileText: {
    fontSize: 14,
    color: colors.linkColor,
  },
  icon: {
    marginLeft: 4,
  },
});
