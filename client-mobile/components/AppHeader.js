import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Icon, Image } from "@rneui/themed";
import BoldText from "./BoldText";

const IMAGE_URI =
  "https://media.licdn.com/dms/image/C5603AQFj6oNhrUEycg/profile-displayphoto-shrink_800_800/0/1636739777705?e=1681948800&v=beta&t=PTXRkY3BGoUMfbB7U2Dcnroi4_qxeFESikMEEmo7KMw";

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
