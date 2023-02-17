import React from 'react'
import {Text, FlatList, View, StyleSheet, SafeAreaView} from 'react-native'
import {Image} from '@rneui/themed';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const DATA = {
        profileTag: '@itsjoshissa',
        numFriends: 5,
        numFollowing: 5,
        readingGoal: 24,
        booksRead: 19,
    }
const Fill = [1,2,3]

function Profile() {
    return (
        <SafeAreaView style={styles.main}>
            <Image 
                source={{ uri: 'https://media.licdn.com/dms/image/C5603AQFj6oNhrUEycg/profile-displayphoto-shrink_800_800/0/1636739777705?e=1681948800&v=beta&t=PTXRkY3BGoUMfbB7U2Dcnroi4_qxeFESikMEEmo7KMw' }} 
                style={styles.profileImage}
            />
            <Text style={styles.profileTag}>{DATA.profileTag}</Text>
            <Text style={styles.socials}>{`${DATA.numFriends} friends - ${DATA.numFollowing} following`}</Text>
            <View style={styles.goalContainer}>
                <View style={styles.goals}>
                    <AnimatedCircularProgress
                        size={70}
                        width={8}
                        fill={DATA.booksRead / DATA.readingGoal * 100}
                        tintColor='#2c6c54'
                    >
                        {() => <Text>{DATA.booksRead}</Text>}
                    </AnimatedCircularProgress>
                    <View style={styles.goalText}>
                        <Text style={styles.goalTitle}>2023 Reading Goal</Text>
                        <Text style={styles.goalContent}>{`You have completed ${DATA.booksRead} out of ${DATA.readingGoal} books for this year.`}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.readingNowContainer}>
                <Text style={styles.readingNowTitle}>Reading Now</Text>
                <FlatList
                    data={Fill}    
                    renderItem={({item}) => <View backgroundColor='black' style={styles.book}></View>}
                    keyExtractor={item => item.id}
                    horizontal={true}
                    style={styles.recommended}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
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
        fontWeight: 'bold',
    },
    socials: {
        color: '#828282',
    },
    goalContainer: {
        height: 100,
        width: '90%',
        borderWidth: 0.5,
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
        borderColor: '#828282',
    },
    goals: {
        flex: 1,
        flexDirection: 'row',
    },
    goalText: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: 15,
    },
    goalTitle: {
        color: '#828282',
    },
    goalContent: {
        marginTop: 10,
        fontSize: 16,
    },
    readingNowContainer: {
        marginTop: 30,
        marginLeft: '5%',
    },
    readingNowTitle: {
        fontSize: 20,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    book: {
        width: 130, 
        height: 200, 
        borderRadius: 25, 
        marginRight: 30,
        marginBottom: 0
    }, 
    progressNumber: {
        fontSize: 24,
        fontWeight: 'bold',
    }
})

export default Profile