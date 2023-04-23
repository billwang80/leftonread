import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Icon, Image } from "@rneui/themed";
import BoldText from "./BoldText";

const IMAGE_URI =
  "https://github.com/billwang80/leftonread/blob/UIDevelopment/client-mobile/Josh_Issa.jpeg?raw=true";

function AppHeader({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <BoldText style={styles.title}>Home</BoldText>
        <View style={styles.rightContainer}>
          <View style={styles.rightContainerContent}>
            <Image
              source={{ uri: IMAGE_URI }}
              style={styles.image}
              onPress={() => navigation.navigate("Profile")}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: "100%",
  },
  main: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 20,
    marginRight: 40,
    marginBottom: 10,
  },
  rightContainer: {
    height: 70,
  },
  rightContainerContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginLeft: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
  },
});

export default AppHeader;
