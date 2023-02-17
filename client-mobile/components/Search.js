import React, {useState, useRef} from 'react';
import { StyleSheet, Text, FlatList, SafeAreaView, View, ScrollView, StatusBar } from 'react-native';
import { SearchBar, Icon } from '@rneui/themed';

const DATA = [
        {topic: 'Genres', icon: 'moon', type: 'feather'},
        {topic: 'Time Period', icon: 'clockcircleo', type: 'antdesign'},
        {topic: 'Popular Books', icon: 'staro', type: 'antdesign'},
        {topic: 'Countries or languages', icon: 'flag', type: 'feather'},
    ]

function Search() {

        const [search, setSearch] = useState("");

        const searchRef = useRef(null)
        
        const updateSearch = (search) => {
          setSearch(search);
        };

    return (
        <SafeAreaView style={styles.main}>
            <View style={{height: 100}}>
                <View style={styles.searchRow}>
                    <SearchBar
                        ref = {searchRef}
                        placeholder="Search by title or author"
                        onChangeText={updateSearch}
                        value={search}
                        lightTheme={true}
                        containerStyle={styles.searchContainer}
                        inputContainerStyle={styles.searchBar}
                    />
                    <Text 
                        style={styles.cancel}
                        onPress={() => searchRef.current.blur()}
                    >
                        Cancel
                    </Text>
                </View>
            </View>
            <Text style={styles.explore}>Explore different...</Text>
            <FlatList
                data={DATA}    
                renderItem={({item}) => (
                    <View style={styles.topic}>
                        <Icon type={item.type} name={item.icon} color= 'black' size={40} containerStyle={styles.icon}/>
                        <Text style={{fontSize: 20}}>{item.topic}</Text>
                        <Icon type='simple-line-icon' name='arrow-right' color= '#828282' size={30} containerStyle={{marginLeft: 'auto', flex: 0}}/>
                    </View>
                )}
                keyExtractor={item => item.id}
                style={styles.recommended}
            />
        </SafeAreaView>
      )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'white',
        paddingStart: 20,
    },
    searchContainer: {
        backgroundColor: 'white',
        width: '80%',
        padding: 0,
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        marginRight: 10
    },
    searchBar: {
        backgroundColor: '#f4f4f4',
        borderRadius: 10,
    },
    searchRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    cancel: {
        fontSize: 16,
    },
    explore: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        marginLeft: 10,
    },
    topic: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 20,
        paddingBottom: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#f4f4f4'
    },
    icon: {
        marginEnd: 20,
    }
  })

export default Search