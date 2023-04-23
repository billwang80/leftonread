import React, { useState } from "react";
import { Text, FlatList, View, StyleSheet, SafeAreaView } from "react-native";
import { AirbnbRating, Image, ButtonGroup } from "@rneui/themed";
import RegularText from "./RegularText";
import BoldText from "./BoldText";
import BlackText from "./BlackText";

const styles = StyleSheet.create({
  tabs: {
    marginTop: 0,
    backgroundColor: "white",
    paddingTop: 10,
    paddingBottom: 10,
  },
  tabButtonsContainer: {
    marginLeft: 15,
    marginRight: 15,
    padding: 3,
    borderRadius: 10,
    height: 40,
    backgroundColor: "#f4f4f4",
  },
  tabButtons: {
    borderRadius: 10,
  },
  selectedTab: {
    backgroundColor: "white",
  },
  tabText: {
    color: "black",
    fontFamily: "Satoshi-Regular",
  },
  profile: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  post: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    margin: 15,
    padding: 20,
    borderRadius: 10,
  },
  postMain: {
    marginLeft: 20,
    flex: 1,
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  postHeader: {
    flex: 1,
    flexDirection: "row",
  },
  book: {
    height: 150,
    width: 100,
    marginTop: 10,
  },
  postTitle: {
    flex: 1,
    flexDirection: "row",
  },
  userTitle: {
    color: "#828282",
    flex: 1,
  },
  bookTitle: {
    fontWeight: "bold",
    marginTop: 5,
  },
  authorName: {
    color: "#828282",
    fontWeight: "normal",
  },
  additionalText: {
    color: "#828282",
  },
  date: {
    marginLeft: "auto",
    color: "#828282",
    fontSize: 12,
  },
  bookContent: {
    flex: 1,
    flexDirection: "row",
  },
  extra: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    marginLeft: 10,
  },
  leaderBoard: { marginTop: 20 },
  leaderBoardEntry: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
    paddingEnd: 30,
    marginTop: 2.5,
    backgroundColor: "white",
  },
  leaderBoardIndex: {
    marginLeft: 30,
    marginRight: 30,
  },
  leaderBoardName: { marginLeft: 30 },
  leaderBoardPoints: {
    marginLeft: "auto",
    color: "#828282",
  },
});

const DATA = [
  {
    profile:
      "https://github.com/billwang80/leftonread/blob/UIDevelopment/client-mobile/Josh_Issa.jpeg?raw=true",
    name: "itsjoshuaissa",
    title: "Wide Sargasso Sea",
    author: "Jean Rhys",
    type: "review",
    date: "1/10/2023",
    rating: 4,
    extra: "Excellent book, should be required reading in school.",
    imageURI:
      "https://cdn.penguin.co.uk/dam-assets/books/9780241281901/9780241281901-jacket-large.jpg",
  },
  {
    profile:
      "https://github.com/billwang80/leftonread/blob/UIDevelopment/client-mobile/Tim_He.jpeg?raw=true",
    name: "timyhe",
    title: "East of Eden",
    author: "John Steinbeck",
    type: "review",
    date: "1/1/2023",
    rating: 5,
    extra:
      "Beautiful world-building and storytelling. Would read this again and again and again.",
    imageURI:
      "https://m.media-amazon.com/images/I/41q1alpbmuL._SY264_BO1,204,203,200_QL40_ML2_.jpg",
  },
  {
    profile:
      "https://github.com/billwang80/leftonread/blob/UIDevelopment/client-mobile/Tim_He.jpeg?raw=true",
    name: "timyhe",
    title: "Beloved",
    author: "Tony Morrison",
    type: "wants",
    date: "2/10/2023",
    rating: 5,
    extra: "",
    imageURI: "https://m.media-amazon.com/images/I/41weOaDmFwL._AC_UY218_.jpg",
  },
];

const LEADERBOARD_DATA = [
  {
    profile:
      "https://github.com/billwang80/leftonread/blob/UIDevelopment/client-mobile/Josh_Issa.jpeg?raw=true",
    name: "itsjoshuaissa",
    points: 13589,
  },
  {
    profile:
      "https://github.com/billwang80/leftonread/blob/UIDevelopment/client-mobile/Tim_He.jpeg?raw=true",
    name: "timyhe",
    points: 10124,
  },
  {
    profile:
      "https://github.com/billwang80/leftonread/blob/UIDevelopment/client-mobile/Jesse_Ren.jpeg?raw=true",
    name: "jesseren",
    points: 9999,
  },
];

function getPostType(type) {
  switch (type) {
    case "review":
      return "reviewed";
    case "wants":
      return "wants to read";
  }
}

export function getTimeDifference(date) {
  const current = new Date();
  const postedDate = new Date(date);
  return Math.floor(
    (current.getTime() - postedDate.getTime()) / (1000 * 60 * 60 * 24)
  );
}

function Feed() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <SafeAreaView>
      <View style={styles.tabs}>
        <ButtonGroup
          buttons={["Friends", "Leaderboard"]}
          selectedIndex={selectedIndex}
          onPress={(value) => {
            setSelectedIndex(value);
          }}
          containerStyle={styles.tabButtonsContainer}
          buttonStyle={styles.tabButtons}
          selectedButtonStyle={styles.selectedTab}
          selectedTextStyle={styles.tabText}
          innerBorderStyle={{ width: 0 }}
        />
      </View>
      {selectedIndex == 0 ? (
        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <View style={styles.post}>
              <Image source={{ uri: item.profile }} style={styles.profile} />
              <View style={styles.postMain}>
                <View style={styles.postTitle}>
                  <RegularText style={styles.userTitle}>{`${
                    item.name
                  } ${getPostType(item.type)}`}</RegularText>
                  <RegularText style={styles.date}>{`${getTimeDifference(
                    item.date
                  )} days ago`}</RegularText>
                </View>
                <BlackText style={styles.bookTitle}>
                  {`${item.title} `}{" "}
                  <RegularText
                    style={styles.authorName}
                  >{`by ${item.author}`}</RegularText>
                </BlackText>
                {item.type === "review" ? (
                  <AirbnbRating
                    isDisabled={true}
                    count={item.rating}
                    defaultRating={item.rating}
                    showRating={false}
                    selectedColor="#2c6c54"
                    size={20}
                  />
                ) : null}
                <View style={styles.bookContent}>
                  <Image source={{ uri: item.imageURI }} style={styles.book} />
                  <View style={styles.extra}>
                    <RegularText>{item.extra}</RegularText>
                  </View>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id + item.title}
        />
      ) : (
        <FlatList
          data={LEADERBOARD_DATA}
          renderItem={({ item, index }) => (
            <View style={styles.leaderBoardEntry}>
              <RegularText style={styles.leaderBoardIndex}>
                {index + 1}
              </RegularText>
              <Image source={{ uri: item.profile }} style={styles.profile} />
              <RegularText style={styles.leaderBoardName}>
                {item.name}
              </RegularText>
              <RegularText
                style={styles.leaderBoardPoints}
              >{`${item.points} points`}</RegularText>
            </View>
          )}
          style={styles.leaderBoard}
        />
      )}
    </SafeAreaView>
  );
}

export default Feed;
