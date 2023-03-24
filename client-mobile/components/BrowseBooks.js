import React, { useEffect, useState } from "react";
import { url } from "../constants";
import BookImage from "./BookImage";
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  books: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "center",
    marginTop: 30,
  },
});

function BrowseBooks({ navigation }) {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    fetch(url + "books/")
      .then((response) => response.json())
      .then((data) => setBooks(data));
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.books}>
          {books.map((item) => (
            <BookImage book={item} navigation={navigation} key={item.title} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default BrowseBooks;
