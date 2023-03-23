import React from "react";
import {
  Text,
  FlatList,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { AirbnbRating, Image, Button } from "@rneui/themed";
import { Icon } from "@rneui/base";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  cover: {
    position: "fixed",
    top: 0,
    opacity: 0.5,
    height: 500,
    width: "100%",
  },
  main: {
    width: "80%",
    position: "absolute",
    top: -80,
    left: "10%",
  },
  title: {
    marginTop: 250,
    fontSize: 32,
    color: "white",
  },
  author: {
    color: "#828082",
    fontSize: 20,
    fontWeight: "bold",
  },
  rating: {
    flexDirection: "row",
  },
  ratingText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#828082",
    flex: 1,
    alignSelf: "center",
  },
  description: {
    fontSize: 16,
    color: "black",
    marginTop: 20,
    fontWeight: "bold",
  },
  quizButton: {
    width: 330,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    marginTop: 30,
  },
  quizButtonText: {
    color: "#2c6c54",
    fontWeight: "bold",
  },
  actions: {
    position: "absolute",
    top: 500,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    backgroundColor: "black",
    paddingLeft: "10%",
    paddingRight: "10%",
    paddingTop: 25,
    height: 100,
    width: "100%",
  },
  actionLabel: {
    color: "white",
    fontSize: 16,
    flex: 1,
    marginTop: "auto",
  },
  additionalContent: {
    position: "absolute",
    top: 600,
  },
});

const image = { uri: "https://m.media-amazon.com/images/I/81FWMAwqkmL.jpg" };
const DATA = [];
for (let i = 0; i < 3; i++) {
  DATA.push({ uri: "https://m.media-amazon.com/images/I/51lyOfcaA8L.jpg" });
}
function Book({ book }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image source={image} style={styles.cover} />
        <View style={styles.main}>
          <Text style={styles.title}>Moby Dick</Text>
          <Text style={styles.author}>by Herman Melville</Text>
          <View style={styles.rating}>
            <AirbnbRating
              isDisabled={true}
              count={4}
              defaultRating={4}
              showRating={false}
              selectedColor="#2c6c54"
              size={20}
            />
            <Text style={styles.ratingText}>4.1/5</Text>
          </View>
          <Text style={styles.description}>
            On board the whaling ship Pequod a crew of wise men and fools,
            renegades and seeming phantoms is hurled through treacherous seas by
            crazed Captain Ahab, a man hell-bent on hunting down the mythic
            White Whale.
          </Text>
          <Button
            title="Play Quiz"
            icon={{
              name: "controller-play",
              size: 20,
              color: "#2c6c54",
              type: "entypo",
            }}
            buttonStyle={styles.quizButton}
            titleStyle={styles.quizButtonText}
          />
        </View>
        <View style={styles.actions}>
          <View>
            <Icon name="eye" color="white" size={30} type="feather" />
            <Text style={styles.actionLabel}>To Read</Text>
          </View>
          <View>
            <Icon name="bookmark" color="white" size={30} type="entypo" />
            <Text style={styles.actionLabel}>Reading</Text>
          </View>
          <View>
            <Icon
              name="checkmark-circle-outline"
              color="white"
              size={30}
              type="ionicon"
            />
            <Text style={styles.actionLabel}>Mark Done</Text>
          </View>
        </View>
        <View style={styles.additionalContent}>
          <Text>Related Content</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Book;
