import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/Home";
import Search from "./components/Search";
import AppHeader from "./components/AppHeader";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Book from "./components/Book";
import BrowseBooks from "./components/BrowseBooks";
import { useFonts } from "expo-font";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Satoshi-Regular": require("./OTF/Satoshi-Regular.otf"),
    "Satoshi-Black": require("./OTF/Satoshi-Black.otf"),
    "Satoshi-Bold": require("./OTF/Satoshi-Bold.otf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  const styles = StyleSheet.create({
    searchHeaderTitle: {
      fontSize: 36,
      fontFamily: "Satoshi-Bold",
    },
  });
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            headerTitle: () => <AppHeader navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            headerTitleStyle: styles.searchHeaderTitle,
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="Feed"
          component={Feed}
          options={{
            headerTitleStyle: styles.searchHeaderTitle,
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerTitleStyle: styles.searchHeaderTitle,
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="Book"
          component={Book}
          options={{
            headerTitleStyle: styles.searchHeaderTitle,
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="Browse"
          component={BrowseBooks}
          options={{
            headerTitleStyle: styles.searchHeaderTitle,
            headerShadowVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
