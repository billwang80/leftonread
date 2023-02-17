import React from 'react';
import {Text, StyleSheet, View} from 'react-native'
import {Image, Icon } from '@rneui/themed';

const IMAGE_URI = 'https://scontent-yyz1-1.xx.fbcdn.net/v/t39.30808-6/287743666_2675525765925777_631930729363776009_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=bJvb7Gxp_gEAX-9ISzk&_nc_ht=scontent-yyz1-1.xx&oh=00_AfDPmitdVlGOI45G1shcCk3mxTxwE_WKoz4tKm77xO3VUA&oe=63F2D9A9'

function AppHeader({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
          <Text style={styles.title}>Home</Text>
          <View style={styles.rightContainer}>
            <View style={styles.rightContainerContent}>
            <Icon 
              name='search'
              color= 'black' 
              size={50} 
              onPress={() => 
                navigation.navigate('Search')
              } 
            />
            <Image
              source={{ uri: IMAGE_URI }}
              style={styles.image}
            />
            </View>
          </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '100%'
  },
  main: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 40,
    marginBottom: 10
  },
  rightContainer: {
    height: 70,
  },  
  rightContainerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },  
  image: { 
    width: 40, 
    height: 40, 
    borderRadius: 25,
    alignSelf: 'flex-end',
    marginLeft: 20
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold'
  }
})

export default AppHeader;