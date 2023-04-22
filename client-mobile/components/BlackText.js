import React from "react";
import { Text, StyleSheet } from "react-native";

const defaultStyle = StyleSheet.create({
  text: {
    fontFamily: "Satoshi-Black",
  },
});

function BlackText({ style, children }) {
  return <Text style={{ ...defaultStyle.text, ...style }}>{children}</Text>;
}

export default BlackText;
