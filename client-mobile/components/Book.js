import React, { useEffect, useState } from "react";
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
import { url } from "../constants";
import RegularText from "./RegularText";
import BoldText from "./BoldText";
import BlackText from "./BlackText";

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
    top: -150,
    left: "10%",
  },
  title: {
    marginTop: 200,
    fontSize: 32,
    fontWeight: "bold",
  },
  author: {
    fontSize: 20,
    fontWeight: "bold",
  },
  rating: {
    flexDirection: "row",
  },
  ratingText: {
    fontSize: 18,
    fontWeight: "bold",
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
    marginLeft: 20,
  },
  sectionHeader: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20,
    fontWeight: "bold",
    color: "black",
  },
  profile: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  reviewTopRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  reviewContainer: {
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: "#828282",
    width: 350,
    height: 100,
    padding: 15,
  },
  reviewProfile: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  reviewText: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
  },
  username: { marginEnd: 10, color: "#828282" },
});

const image = { uri: "https://m.media-amazon.com/images/I/81FWMAwqkmL.jpg" };
const DATA = [];
for (let i = 0; i < 3; i++) {
  DATA.push({ uri: "https://m.media-amazon.com/images/I/51lyOfcaA8L.jpg" });
}
function Book({ route }) {
  const { book } = route.params;
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState({});
  const [highlight, setHighlight] = useState(null);

  const reviewsURL = url + "reviews/" + book.id + "/";
  const usersURL = url + "profile/";

  useEffect(() => {
    fetch(reviewsURL)
      .then((response) => response.json())
      .then((data) => {
        const usersData = {};
        for (const review of data) {
          fetch(usersURL + String(review.user) + "/")
            .then((response) => response.json())
            .then((data) => {
              usersData[review.user] = data;
              setUsers(usersData);
            });
        }
        setReviews(data);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ width: "100%" }}>
        <Image source={{ uri: book.cover_image_url }} style={styles.cover} />
        <View style={styles.main}>
          <BoldText style={styles.title}>{book.title}</BoldText>
          <BoldText style={styles.author}>{book.author}</BoldText>
          <View style={styles.rating}>
            <AirbnbRating
              isDisabled={true}
              count={4}
              defaultRating={4}
              showRating={false}
              selectedColor="#2c6c54"
              size={20}
            />
            <BoldText style={styles.ratingText}>4.1/5</BoldText>
          </View>
          <BlackText style={styles.description}>{book.description}</BlackText>
          {/* <Button
            title="Play Quiz"
            icon={{
              name: "controller-play",
              size: 20,
              color: "#2c6c54",
              type: "entypo",
            }}
            buttonStyle={styles.quizButton}
            titleStyle={styles.quizButtonText}
          /> */}
        </View>
        <View style={styles.actions}>
          <View>
            <Icon
              name="eye"
              color={highlight == 0 ? "green" : "white"}
              size={30}
              type="feather"
              onPress={() => setHighlight(0)}
            />
            <RegularText
              style={{
                ...styles.actionLabel,
                color: highlight == 0 ? "green" : "white",
              }}
            >
              To Read
            </RegularText>
          </View>
          <View>
            <Icon
              name="bookmark"
              color={highlight == 1 ? "green" : "white"}
              size={30}
              type="entypo"
              onPress={() => setHighlight(1)}
            />
            <RegularText
              style={{
                ...styles.actionLabel,
                color: highlight == 1 ? "green" : "white",
              }}
            >
              Reading
            </RegularText>
          </View>
          <View>
            <Icon
              name="checkmark-circle-outline"
              color={highlight == 2 ? "green" : "white"}
              size={30}
              type="ionicon"
              onPress={() => setHighlight(2)}
            />
            <RegularText
              style={{
                ...styles.actionLabel,
                color: highlight == 2 ? "green" : "white",
              }}
            >
              Mark Done
            </RegularText>
          </View>
        </View>
        <View style={styles.additionalContent}>
          {reviews.length > 0 ? (
            <BoldText style={styles.sectionHeader}>Reviews</BoldText>
          ) : null}
          {reviews.map((review, index) => (
            <View style={styles.reviewContainer} key={index}>
              <View style={styles.reviewTopRow}>
                <AirbnbRating
                  isDisabled={true}
                  count={review.rating}
                  defaultRating={review.rating}
                  showRating={false}
                  selectedColor="#2c6c54"
                  size={20}
                />
                <View style={styles.reviewProfile}>
                  <RegularText style={styles.username}>
                    {users[review.user]?.user?.username}
                  </RegularText>
                  <Image
                    source={{
                      uri: users[review.user]?.profile_picture_url,
                    }}
                    style={styles.profile}
                  />
                </View>
              </View>
              <RegularText style={styles.reviewText}>
                {review?.review_text}
              </RegularText>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Book;
