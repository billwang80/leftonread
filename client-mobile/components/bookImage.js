import React from "react";
import { Image } from "@rneui/themed";

const styles = {
  recommendedItem: {
    width: 130,
    height: 200,
    borderRadius: 25,
    marginRight: 30,
    marginBottom: 0,
  },
};

function BookImage({ navigation, book }) {
  return (
    <Image
      source={{ uri: book.cover_image_url }}
      style={styles.recommendedItem}
      onPress={() => navigation.navigate("Book", { book: book })}
    />
  );
}

export default BookImage;
