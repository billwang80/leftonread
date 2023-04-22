import React from "react";
import { Text, View, StyleSheet, TouchableHighlight } from "react-native";
import { Icon } from "@rneui/themed";
import RegularText from "./RegularText";

function AppFooter({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <TouchableHighlight>
          <View>
            <Icon name="home" color="black" />
            <RegularText>Home</RegularText>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => navigation.navigate("Browse")}>
          <View>
            <Icon name="book" color="black" />
            <RegularText>Books</RegularText>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => navigation.navigate("Feed")}>
          <View>
            <Icon
              name="search"
              color="black"
              onPress={() => navigation.navigate("Search")}
            />
            <RegularText>Search</RegularText>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => navigation.navigate("Feed")}>
          <View>
            <Icon type="font-awesome-5" name="wave-square" color="black" />
            <RegularText>Feed</RegularText>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: "100%",
  },
  main: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 40,
    marginRight: 40,
  },
});

export default AppFooter;
