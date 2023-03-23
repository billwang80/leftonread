import React from "react";
import { Text, View } from "react-native";
import { Image } from "@rneui/themed";

function contentImage({ uri, title }) {
  return (
    <View>
      <Image source={{ uri: uri }} style={styles.popularItem} />
      <Text>{title}</Text>
    </View>
  );
}

export default contentImage;
