import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  StyleSheet,
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
import BoldText from "./BoldText";
import BlackText from "./BlackText";
import RegularText from "./RegularText";
import { AnimatedCircularProgress } from "react-native-circular-progress";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    fontFamily: "Satoshi-Regular",
  },
  main: {
    backgroundColor: "#f4f4f4",
    paddingLeft: 20,
    fontFamily: "Satoshi-Regular",
  },
  sectionName: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 20,
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
  goalContainer: {
    height: 100,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    marginRight: 20,
  },
  goals: {
    flex: 1,
    flexDirection: "row",
  },
  goalText: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: 15,
  },
  goalTitle: {
    color: "#828282",
  },
  goalContent: {
    marginTop: 10,
    fontSize: 16,
  },
  mainContent: {
    marginLeft: 20,
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
          <View style={styles.goalContainer}>
            <View style={styles.goals}>
              <AnimatedCircularProgress
                size={70}
                width={8}
                fill={(19 / 24) * 100}
                tintColor="#2c6c54"
              >
                {() => <RegularText>{19}</RegularText>}
              </AnimatedCircularProgress>
              <View style={styles.goalText}>
                <RegularText style={styles.goalTitle}>
                  2023 Reading Goal
                </RegularText>
                <RegularText
                  style={styles.goalContent}
                >{`You have completed 19 out of 24 books for this year.`}</RegularText>
              </View>
            </View>
          </View>
          <View style={styles.mainContent}>
            <BoldText style={styles.sectionName}>Recommended</BoldText>
            <FlatList
              data={recommended}
              renderItem={({ item }) => (
                <View>
                  <BookImage book={item} navigation={navigation} />
                </View>
              )}
              keyExtractor={(item) => item.id}
              horizontal={true}
              style={styles.recommended}
            />
            <BoldText style={styles.sectionName}>Popular Content</BoldText>
            <FlatList
              data={POPULAR}
              renderItem={({ item }) => (
                <View key={item.title}>
                  <Image
                    source={{ uri: item.uri }}
                    style={styles.popularItem}
                  />
                  <BlackText>{item.title}</BlackText>
                </View>
              )}
              keyExtractor={(item) => item.title}
              horizontal={true}
              style={styles.popular}
            />
            <BoldText style={styles.sectionName}>
              Your Friends are Reading
            </BoldText>
            <FlatList
              data={friendsBooks}
              renderItem={({ item }) => (
                <BookImage book={item} navigation={navigation} />
              )}
              keyExtractor={(item) => item.id}
              horizontal={true}
              style={styles.recommended}
            />
          </View>
        </ScrollView>
        <AppFooter navigation={navigation} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default Home;
