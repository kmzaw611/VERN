import React, { useState, Component } from 'react'
import {
    Text, View, FlatList, StyleSheet, TouchableOpacity, ScrollView, Image,
    ImageBackground
} from 'react-native'
const methods = require('../MondgoDB/testClient');
//import { ModalProvider } from "react-native-use-modal-hooks";

import AsyncStorage from '@react-native-async-storage/async-storage';
const playlistData = require('./test_json/playlists.json');
const performanceData = require('./test_json/performances.json');

export default class ProfileScreen extends Component {
    constructor() {
        super();
        this.state = {
            dataIsReturned: false,
        };
        this.id = {
            _id: ""
        };
        this.playlistData = require('./test_json/playlists.json');
        this.performanceData = require('./test_json/performances.json');
        this.groupsData = [];
    }

    componentDidMount() {
        AsyncStorage.getItem('userID')
            .then(result => {
                this.id._id = ("" + result);
                console.log("inside");
                methods.get_user(this.id, (res) => {
                    console.log(res);
                    var arr = res.groups;

                    //Fix groups to work
                    console.log(arr);
                    for (var i = 0; i < arr.length; i++) {
                        methods.get_group(res2 => {
                            if (res2 != null) {
                                this.groupsData.push({
                                    title: res2.title,
                                    numUsers: res2.numUsers
                                });
                            }
                            console.log(i);
                            if (i >= arr.length) {
                                console.log(this.groupsData);
                                this.setState({ dataIsReturned: true });

                            }
                        }, { _id: arr[i] })
                    }
                    if (arr.length == 0) {
                        this.groupsData.push({
                            title: "No Groups Found",
                            numUsers: 0
                        });
                        this.setState({ dataIsReturned: true });
                    }

                });
            })
            .catch(err => {
                console.error(err);
            });

    }

    playlistImages = [
        require('./assets/playlistCard1.jpg'),
        require('./assets/playlistCard2.jpg'),
        require('./assets/playlistCard3.jpg'),
        require('./assets/playlistCard4.jpg'),
    ]

    getPlaylistScreen = index => () => {
        let playlistId = index;
        let playlistName;
        if (index === 0) {
            playlistName = "Top 50 This Week on Campus";
        }
        else if (index === 1) {
            playlistName = "Local Artist Corner";
        }
        else if (index === 2) {
            playlistName = "Your Top Songs";
        }
        else {
            playlistName = "Playlist #4";
        }

        this.props.navigation.navigate("Playlist", {
            playlistId: playlistId,
            playlistName: playlistName,
        })
    }
    getVenueScreen = index => () => {
        let venueId = index;
        let venueName;
        if (index === 0) {
            venueName = "Hillenbrand Hall";
        }
        else if (index === 1) {
            venueName = "Earhart Hall";
        }
        else if (index === 2) {
            venueName = "Elliot Concert Hall";
        }
        else {
            venueName = "Purdue Hotel UwU";
        }

        this.props.navigation.navigate("VenueScreen", {
            venueId: venueId,
            venueName: venueName,
        })
    }


    renderPlaylistItem = ({ item, index }) => (
        <TouchableOpacity
            delayPressIn={100}
            style={styles.playlistCard}
            onPress={this.getPlaylistScreen(index)}
        >
            <ImageBackground
                source={this.playlistImages[item.id - 1]}
                style={styles.playlistImage}
            >
                <View style={styles.tintDarkContainer}>
                    <Text style={styles.playlistTitle}>{item.title}</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );

    renderPerformanceItem = ({ item, index }) => (
        <TouchableOpacity
            delayPressIn={100}
            style={styles.performanceCard}
            onPress={this.getVenueScreen(index)}
        >
            <Image
                source={require('./assets/placeholder.jpg')}
                style={styles.performanceImage}
            />
            <Text style={styles.performanceTitle}>Artists</Text>
            <Text style={styles.performanceDetail}>{item.artists.toString()}</Text>
            <Text style={styles.performanceTitle}>Location</Text>
            <Text style={styles.performanceDetail}>{item.location.toString()}</Text>
            <Text style={styles.performanceTitle}>Date</Text>
            <Text style={styles.performanceDetail}>{item.date.toString()}</Text>
            <Text style={styles.performanceTitle}>Time</Text>
            <Text style={styles.performanceDetail}>{item.time.toString()}</Text>
        </TouchableOpacity>
    );

    renderGroupItem = ({ item }) => (
        <TouchableOpacity
            delayPressIn={100}
            style={styles.groupCard}
        >
            <Text style={styles.groupName}>{item.title}</Text>
            <Text style={styles.groupMembers}>{item.numUsers} members</Text>
            <Image
                source={require('./assets/placeholder.jpg')}
                style={styles.groupImage}
            />
        </TouchableOpacity>
    );

    render() {
        if (this.state.dataIsReturned === true) {
            return (
                <ScrollView>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.title}>Curated Playlists</Text>
                        <FlatList
                            numColumns={2}
                            data={this.playlistData}
                            contentContainerStyle={{ justifyContent: 'center', }}
                            renderItem={this.renderPlaylistItem}
                            keyExtractor={item => item.id}
                        />
                    </View>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.title}>Live Performances</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Local Artists")}>
                            <Text style={{ color: 'brown', marginLeft: 10, fontSize: 14, fontWeight: 'bold', marginLeft: 15, }}>See all local artists </Text>
                        </TouchableOpacity>
                        <FlatList
                            horizontal={true}
                            data={this.performanceData}
                            renderItem={this.renderPerformanceItem}
                            keyExtractor={item => item.id}
                        />
                    </View>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.title}>Your Groups</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Groups")}>
                            <Text style={{ color: 'brown', marginLeft: 10, fontSize: 14, fontWeight: 'bold', marginLeft: 15, }}>See all groups </Text>
                        </TouchableOpacity>
                        <FlatList
                            horizontal={true}
                            data={this.groupsData}
                            renderItem={this.renderGroupItem}
                            keyExtractor={item => item.id}
                        />
                    </View>

                </ScrollView>
            )
        }
        else {
            return (<Text> Loading </Text>);
        }
    }
}

const styles = StyleSheet.create({
    groupCard: {
        width: 250,
        height: 250,
        margin: 10,
        padding: 20,
        borderRadius: 25,
        backgroundColor: 'white',
        borderWidth: 2.0,
        alignItems: 'center',
    },
    groupName: {
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'left',
    },
    groupMembers: {
        fontFamily: 'sans-serif',
        fontSize: 14,
    },
    groupImage: {
        width: 225,
        height: 150,
        borderRadius: 15,
        marginTop: 15,
    },
    horizontalRule: {
        borderBottomColor: 'black',
        borderBottomWidth: 1.0,
        width: 250,
    },
    playlistCard: {
        width: 150,
        height: 150,
        marginTop: 20,
        margin: 10,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    playlistImage: {
        width: 150,
        height: 150,
    },
    performanceCard: {
        width: 225,
        margin: 10,
        padding: 10,
        borderRadius: 25,
        backgroundColor: 'white',
        borderWidth: 0.5,
        alignItems: 'center'
    },
    performanceDetail: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'monospace',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    performanceImage: {
        width: 200,
        height: 150,
        borderRadius: 15,
        marginBottom: 20,
    },
    performanceTitle: {
        color: 'gray',
        fontSize: 14,
        fontFamily: 'sans-serif-medium',
        textAlign: 'center',
    },
    playlistTitle: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'monospace',
        padding: 10,
    },
    sectionContainer: {
        justifyContent: 'center',
        margin: 10,
        marginBottom: 5,
    },
    tintDarkContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#8e6f3e',
        margin: 10,
        marginBottom: 5,
        fontFamily: 'sans-serif-condensed',
    },
})