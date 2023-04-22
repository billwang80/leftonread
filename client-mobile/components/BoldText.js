import React from "react";
import { Text, StyleSheet } from "react-native";

const defaultStyle = StyleSheet.create({
  text: {
    fontFamily: "Satoshi-Bold",
  },
});

function BoldText({ style, children }) {
  return <Text style={{ ...defaultStyle.text, ...style }}>{children}</Text>;
}

export default BoldText;
