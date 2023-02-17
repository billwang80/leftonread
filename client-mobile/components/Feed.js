import React from 'react';
import {Text, FlatList, View, StyleSheet, SafeAreaView} from 'react-native'
import {AirbnbRating, Image} from '@rneui/themed';

const DATA = [
    {
        profile: 'https://media.licdn.com/dms/image/C5603AQFj6oNhrUEycg/profile-displayphoto-shrink_800_800/0/1636739777705?e=1681948800&v=beta&t=PTXRkY3BGoUMfbB7U2Dcnroi4_qxeFESikMEEmo7KMw',
        name: 'itsjoshuaissa',
        title: 'Wide Sargasso Sea',
        author: 'Jean Rhys',
        type: 'review',
        date: '1/10/2023',
        rating: 4,
        extra: 'Excellent book, should be required reading in school.',
    },
    {
        profile: 'https://media.licdn.com/dms/image/D5603AQHmpUkfETNpwQ/profile-displayphoto-shrink_800_800/0/1669596480163?e=1681948800&v=beta&t=cqIpNnDU3tllZw32g_wjooZzaG2XBSN2Ur2OlHp6Rbc',
        name: 'timyhe',
        title: 'East of Eden',
        author: 'John Steinbeck',
        type: 'review',
        date: '1/1/2023',
        rating: 5,
        extra: 'Beautiful world-building and storytelling. Would read this again and again and again.',
    },
    {
        profile: 'https://media.licdn.com/dms/image/D5603AQHmpUkfETNpwQ/profile-displayphoto-shrink_800_800/0/1669596480163?e=1681948800&v=beta&t=cqIpNnDU3tllZw32g_wjooZzaG2XBSN2Ur2OlHp6Rbc',
        name: 'timyhe',
        title: 'Beloved',
        author: 'Tony Morrison',
        type: 'wants',
        date: '2/10/2023',
        rating: 5,
        extra: '',
    },
]

function getPostType(type) {
    switch(type) {
        case 'review':
            return 'reviewed'
        case 'wants':
            return 'wants to read'
    }
}

function getTimeDifference(date) {
    const current = new Date()
    const postedDate = new Date(date)
    return Math.floor((current.getTime() - postedDate.getTime()) / (1000 * 60 * 60 * 24))
}

function Feed() {
    return (
        <SafeAreaView>
            <FlatList
                data={DATA}    
                renderItem={({item}) => (
                    <View style={styles.post}>           
                        <Image source={{ uri: item.profile }} style={styles.profile}/>
                        <View style={styles.postMain}>
                            <View style={styles.postTitle}>
                                <Text style={styles.userTitle}>{`${item.name} ${getPostType(item.type)}`}</Text>
                                <Text style={styles.date}>{`${getTimeDifference(item.date)} days ago`}</Text>
                            </View>
                            <Text style={styles.bookTitle}>{`${item.title} `} <Text style={styles.authorName}>{`by ${item.author}`}</Text></Text>
                            {item.type === 'review' ? 
                            <AirbnbRating 
                                isDisabled={true} 
                                count={item.rating} 
                                defaultRating={item.rating} 
                                showRating={false} 
                                selectedColor='#2c6c54' 
                                size={20}
                            /> : null}
                            <View style={styles.bookContent}>
                                <View style={styles.book}/>
                                <View style={styles.extra}>
                                    <Text>{item.extra}</Text>
                                </View>
                            </View>                         
                        </View>
                    </View>
                )}
                keyExtractor={item => item.id + item.title}
            />
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    profile: {
        height: 50,
        width: 50,
        borderRadius: 25,
    },
    post: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        margin: 15,
        padding: 20,
        borderRadius: 10,
    },
    postMain: {
        marginLeft: 20,
        flex: 1,
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    },  
    postHeader: {
        flex: 1,
        flexDirection: 'row',
    },
    book: {
        height: 150,
        width: 100,
        backgroundColor: 'black',
        marginTop: 10,
    },
    postTitle: {
        flex: 1,
        flexDirection: 'row',
    },
    userTitle: {
        color: '#828282',
        flex: 1,
    },
    bookTitle: {
        fontWeight: 'bold',
        marginTop: 5,
    },
    authorName: {
        color: '#828282',
        fontWeight: 'normal'
    },
    additionalText: {
        color: '#828282',
    },
    date: {
        marginLeft: 'auto',
        color: '#828282',
        fontSize: 12,
    },
    bookContent: {
        flex: 1,
        flexDirection: 'row',
    },
    extra: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
        marginLeft: 10,
    }
})

export default Feed;