import React from 'react';
import {Text, View, StyleSheet} from 'react-native'
import { Header, Image, Icon } from '@rneui/themed';

function AppFooter() {
  return (
    <View style={styles.container}>
        <View style={styles.main}>
            <View>
                <Icon name='home'color= 'black'/>
                <Text>Home</Text>
            </View>
            <View>
                <Icon name='book'color= 'black'/>
                <Text>Books</Text>
            </View>
            <View>
                <Icon type='font-awesome-5' name='wave-square' color= 'black'/>
                <Text>Feed</Text>
            </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      height: 60,
      width: '100%'
    },
    main: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginLeft: 40,
      marginRight: 40,
    },
});

export default AppFooter;