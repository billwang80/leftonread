import React from "react";
import {
  FlatList,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Image, AirbnbRating } from "@rneui/themed";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { getTimeDifference } from "./Feed";
import RegularText from "./RegularText";
import BoldText from "./BoldText";
import BlackText from "./BlackText";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  main: {
    alignItems: "center",
  },
  profileImage: {
    marginTop: 50,
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  profileTag: {
    fontSize: 24,
    marginTop: 20,
    fontWeight: "bold",
  },
  socials: {
    color: "#828282",
  },
  goalContainer: {
    height: 100,
    width: "90%",
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    borderColor: "#828282",
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
  readingNowContainer: {
    marginTop: 30,
    marginLeft: 20,
    height: 250,
  },
  sectionHeader: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
    color: "black",
  },
  reviewsContainer: {
    marginTop: 30,
    width: "100%",
    marginLeft: 40,
  },
  book: {
    width: 130,
    height: 200,
    borderRadius: 25,
    marginRight: 30,
    marginBottom: 0,
  },
  progressNumber: {
    fontSize: 24,
    fontWeight: "bold",
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
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: "90%",
  },
  postMain: {
    marginLeft: 20,
    flex: 1,
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  postTitle: {
    flex: 1,
    flexDirection: "row",
  },
  bookTitle: {
    fontWeight: "bold",
    marginTop: 5,
  },
  authorName: {
    color: "#828282",
    fontWeight: "normal",
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
});

const DATA = {
  profileTag: "@itsjoshissa",
  numFriends: 5,
  numFollowing: 5,
  readingGoal: 24,
  booksRead: 19,
};

const READING = [
  {
    uri: "https://cdn.penguin.co.uk/dam-assets/books/9781784870140/9781784870140-jacket-large.jpg",
  },
  {
    uri: "https://cdn.penguin.co.uk/dam-assets/books/9780141040387/9780141040387-jacket-large.jpg",
  },
  {
    uri: "https://cdn.penguin.co.uk/dam-assets/books/9780141181479/9780141181479-jacket-large.jpg",
  },
];

const REVIEWS = [
  {
    profile:
      "https://media.licdn.com/dms/image/C5603AQFj6oNhrUEycg/profile-displayphoto-shrink_800_800/0/1636739777705?e=1681948800&v=beta&t=PTXRkY3BGoUMfbB7U2Dcnroi4_qxeFESikMEEmo7KMw",
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
      "https://media.licdn.com/dms/image/D5603AQHmpUkfETNpwQ/profile-displayphoto-shrink_800_800/0/1669596480163?e=1681948800&v=beta&t=cqIpNnDU3tllZw32g_wjooZzaG2XBSN2Ur2OlHp6Rbc",
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
];

function Profile() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.main}>
        <Image
          source={{
            uri: "https://github.com/billwang80/leftonread/blob/UIDevelopment/client-mobile/Josh_Issa.jpeg?raw=true",
          }}
          style={styles.profileImage}
        />
        <BoldText style={styles.profileTag}>{DATA.profileTag}</BoldText>
        <RegularText
          style={styles.socials}
        >{`${DATA.numFriends} friends - ${DATA.numFollowing} following`}</RegularText>
        <View style={styles.goalContainer}>
          <View style={styles.goals}>
            <AnimatedCircularProgress
              size={70}
              width={8}
              fill={(DATA.booksRead / DATA.readingGoal) * 100}
              tintColor="#2c6c54"
            >
              {() => <RegularText>{DATA.booksRead}</RegularText>}
            </AnimatedCircularProgress>
            <View style={styles.goalText}>
              <RegularText style={styles.goalTitle}>
                2023 Reading Goal
              </RegularText>
              <RegularText
                style={styles.goalContent}
              >{`You have completed ${DATA.booksRead} out of ${DATA.readingGoal} books for this year.`}</RegularText>
            </View>
          </View>
        </View>
        <View style={styles.readingNowContainer}>
          <BoldText style={styles.sectionHeader}>Reading Now</BoldText>
          <FlatList
            data={READING}
            renderItem={({ item }) => (
              <View>
                <Image source={{ uri: item.uri }} style={styles.book} />
              </View>
            )}
            keyExtractor={(item) => item.uri}
            horizontal={true}
          />
        </View>
        <View style={styles.reviewsContainer}>
          <BoldText style={styles.sectionHeader}>Reviews</BoldText>
          {REVIEWS.map((item) => (
            <View style={styles.post} key={item.imageURI}>
              <View style={styles.postMain}>
                <View style={styles.postTitle}>
                  <RegularText style={styles.date}>{`${getTimeDifference(
                    item.date
                  )} days ago`}</RegularText>
                </View>
                <BlackText
                  style={styles.bookTitle}
                >{`${item.title} `}</BlackText>
                <RegularText
                  style={styles.authorName}
                >{`by ${item.author}`}</RegularText>
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
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Profile;
