import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import colors from "../theme/colors";

const CustomCheckBox = ({ value, onChange }) => (
  <TouchableOpacity onPress={() => onChange(!value)} style={styles.checkBox}>
    <View style={[styles.box, value && styles.boxChecked]} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  checkBox: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  box: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 4,
    backgroundColor: colors.background,
  },
  boxChecked: {
    backgroundColor: colors.linkColor,
  },
  text: {
    marginLeft: 10,
    color: colors.primaryTextLight,
  },
});

export default CustomCheckBox;
