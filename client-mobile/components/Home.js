import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  StyleSheet,
  Text,
  FlatList,
  SafeAreaView,
  View,
  ScrollView,
  StatusBar,
} from "react-native";
import { Image } from "@rneui/themed";
import AppFooter from "./AppFooter";
import BookImage from "./BookImage";
import { url } from "../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  main: {
    backgroundColor: "#f4f4f4",
    paddingLeft: 40,
  },
  sectionName: {
    marginTop: 20,
    marginBottom: 30,
    fontSize: 20,
    fontWeight: "bold",
  },
  recommendedItem: {
    width: 130,
    height: 200,
    borderRadius: 25,
    marginRight: 30,
    marginBottom: 0,
  },
  recommended: {
    height: 210,
  },
  popularItem: {
    width: 300,
    height: 200,
    borderRadius: 25,
    marginRight: 30,
    marginBottom: 0,
  },
  popular: {
    height: 220,
  },
});

function Home({ navigation }) {
  const friendsURL = url + "friend-books/1/";
  const recommendedURL = url + "genre-recommend/1/";
  const DATA = [
    { uri: "https://m.media-amazon.com/images/I/51lyOfcaA8L.jpg" },
    { uri: "https://m.media-amazon.com/images/I/51E7yd+G-cL.jpg" },
    {
      uri: "https://m.media-amazon.com/images/I/41sSGNdakQL._SY264_BO1,204,203,200_QL40_ML2_.jpg",
    },
  ];
  const POPULAR = [
    {
      uri: "https://media.npr.org/assets/img/2021/09/30/banned-books_wide-9d1987389d6b402261e7bcff80a85a52daa54db8-s1400-c100.jpg",
      title: "Banned Books in Texas",
    },
  ];

  const [recommended, setRecommended] = useState([]);
  const [friendsBooks, setfriendsBooks] = useState([]);

  useEffect(() => {
    fetch(recommendedURL)
      .then((response) => response.json())
      .then((data) => setRecommended(data));
    fetch(friendsURL)
      .then((response) => response.json())
      .then((data) => setfriendsBooks(data));
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={"dark-content"} />
        <ScrollView style={styles.main}>
          <Text style={styles.sectionName}>Recommended</Text>
          <FlatList
            data={recommended}
            renderItem={({ item }) => (
              <View>
                <BookImage
                  book={item}
                  navigation={navigation}
                  key={item.title}
                />
              </View>
            )}
            keyExtractor={(item) => item.title}
            horizontal={true}
            style={styles.recommended}
          />
          <Text style={styles.sectionName}>Popular Content</Text>
          <FlatList
            data={POPULAR}
            renderItem={({ item }) => (
              <View key={item.title}>
                <Image source={{ uri: item.uri }} style={styles.popularItem} />
                <Text>{item.title}</Text>
              </View>
            )}
            keyExtractor={(item) => item.title}
            horizontal={true}
            style={styles.popular}
          />
          <Text style={styles.sectionName}>Your Friends are Reading</Text>
          <FlatList
            data={friendsBooks}
            renderItem={({ item }) => (
              <BookImage book={item} navigation={navigation} key={item.title} />
            )}
            keyExtractor={(item) => item.title}
            horizontal={true}
            style={styles.recommended}
          />
        </ScrollView>
        <AppFooter navigation={navigation} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default Home;
