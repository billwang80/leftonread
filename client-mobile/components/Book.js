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
    marginTop: 250,
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
    height: 50,
    width: 50,
    borderRadius: 25,
  },
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
      <ScrollView>
        <Image source={{ uri: book.cover_image_url }} style={styles.cover} />
        <View style={styles.main}>
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.author}>{book.author}</Text>
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
          <Text style={styles.description}>{book.description}</Text>
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
          {reviews.length > 0 ? (
            <Text style={styles.sectionHeader}>Reviews</Text>
          ) : null}
          {reviews.map((review, index) => (
            <View key={index}>
              <Image
                source={{
                  uri: users[review.user]?.profile_picture_url,
                }}
                style={styles.profile}
              />
              <AirbnbRating
                isDisabled={true}
                count={review.rating}
                defaultRating={review.rating}
                showRating={false}
                selectedColor="#2c6c54"
                size={20}
              />
              <Text>{users[review.user]?.user?.username}</Text>
              <Text>{review?.review_text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Book;
