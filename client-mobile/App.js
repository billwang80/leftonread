import React from 'react';
import { StyleSheet } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './components/Home'
import Search from './components/Search';
import AppHeader from './components/AppHeader';
import Feed from './components/Feed';

const Stack = createNativeStackNavigator();
const styles = StyleSheet.create({
  searchHeaderTitle: {
    fontSize: 36,
  },
})

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({headerTitle: () => <AppHeader navigation={navigation}/>})
          }
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{headerTitleStyle: styles.searchHeaderTitle, headerShadowVisible: false}}
        />
        <Stack.Screen
          name="Feed"
          component={Feed}
          options={{headerTitleStyle: styles.searchHeaderTitle, headerShadowVisible: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

