import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, Text, FlatList, SafeAreaView, View, ScrollView, StatusBar } from 'react-native';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter'

export default function App() {
  const DATA = []
  for (let i = 0; i < 3; i++) {
    DATA.push(i)
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={'dark-content'}/>
        <AppHeader />
        <ScrollView style={styles.main}>
          <Text style={styles.sectionName}>Recommended</Text>
          <FlatList
            data={DATA}    
            renderItem={({item}) => <View backgroundColor='red' style={styles.recommendedItem}></View>}
            keyExtractor={item => item.id}
            horizontal={true}
            style={styles.recommended}
          />
          <Text style={styles.sectionName}>Popular Content</Text>
          <FlatList
            data={DATA}    
            renderItem={({item}) => <View backgroundColor='red' style={styles.popularItem}></View>}
            keyExtractor={item => item.id}
            horizontal={true}
            style={styles.popular}
          />
          <Text style={styles.sectionName}>Your Friends are Reading</Text>
          <FlatList
            data={DATA}    
            renderItem={({item}) => <View backgroundColor='red' style={styles.recommendedItem}></View>}
            keyExtractor={item => item.id}
            horizontal={true}
            style={styles.recommended}
          />
        </ScrollView>
        <AppFooter />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  main: {
    backgroundColor: '#f4f4f4',
    paddingLeft: 40
  },
  sectionName: {
    marginTop: 40,
    marginBottom: 30,
    fontSize: 20,
    fontWeight: 'bold'
  },
  recommendedItem: {
    width: 130, 
    height: 200, 
    borderRadius: 25, 
    marginRight: 30,
    marginBottom: 0
  }, 
  recommended: {
    height: 210,
  },
  popularItem: {
    width: 300, 
    height: 200, 
    borderRadius: 25, 
    marginRight: 30,
    marginBottom: 0
  },
  popular: {
    height: 210
  }
});
