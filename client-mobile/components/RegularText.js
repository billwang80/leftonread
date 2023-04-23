import React from "react";
import { Text, StyleSheet } from "react-native";

const defaultStyle = StyleSheet.create({
  text: {
    fontFamily: "Satoshi-Regular",
  },
});

function RegularText({ style, children, onPress }) {
  return (
    <Text style={{ ...defaultStyle.text, ...style }} onPress={onPress}>
      {children}
    </Text>
  );
}

export default RegularText;
