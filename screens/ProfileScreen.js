import React, { useState, Component} from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Switch } from 'react-native';
const methods = require('../MondgoDB/testClient');
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme } from '@react-navigation/native';
import { Avatar, Button } from 'react-native-elements';
import { color } from 'react-native-reanimated';

// Ethan code for fetching db info before render
export default class ProfileScreen extends Component {
    // Defining states and variables
    constructor() {
        super();
        this.state = {
            darkModeEnabled: false,
            dataIsReturned: false,
            isbackgroundColordef: true,
            avatarColor: 'black',
            avName: 'rocket',
            color: 'white'
        };
        this.id = {
            _id: ""
        };
        this.userData = null;
    }

    onAvatarblue = () => {
        //if(avatarColor ===)
        this.setState({ avatarColor: 'blue' });
        this.setState({ isbackgroundColordef: false });
    }
    onAvatardef = () => {
        this.setState({ avatarColor: 'black' });
        this.setState({ isbackgroundColordef: true });
    }
    //Where I get the data and change states
    componentDidMount() {
        this.onLoad();
        AsyncStorage.getItem('userID')
            .then(result => {
                this.id._id = ("" + result);
                methods.get_user(this.id, (res) => {
                    this.userData = res;
                    this.setState({ dataIsReturned: true });
                });
            })
            .catch(err => {
                console.error(err);
            });
    }
    onLoad = () => {
        this.props.navigation.addListener('didFocus',() => console.log('x'))
    }

    refresh_thing(params) {
        methods.get_user(this.id, (res) => {
            this.userData = res;
            this.setState({ dataIsReturned: true });
        });
    }

    contButton = () => {
        if (this.userData.isLocalArtist)
            this.props.navigation.navigate("ContactInfoScreen");
    }

    notifButton = () => {
        if (this.userData.isLocalArtist)
            this.props.navigation.push("ThreadScreen", {
                threadID: this.id._id,
                header: ("Notifications"),
                permissions: false
            })
    }

    //Where i put the render function
    render() {
        if (this.state.dataIsReturned === true) {
            return (
                <ScrollView>
                    
                    <View style={{ flex: 1, alignItems: 'center', backgroundColor: this.state.color }}>
                        <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row', marginTop: '2%', paddingHorizontal: '5%' }}>
                            {
                                this.userData.isLocalArtist ?
                                    <TouchableOpacity
                                        style={{ textAlign: 'center' }}
                                        onPress={() => this.notifButton.bind(this)()}>
                                        <Text>Notifications</Text>
                                    </TouchableOpacity>
                                : null
                            }
                            {
                                this.userData.isLocalArtist ?
                                    <TouchableOpacity
                                        style={{textAlign: 'center'}}
                                        onPress={() => this.contButton.bind(this)()}>
                                        <Text>Manage Page</Text>
                                    </TouchableOpacity>
                                : null
                            }
                        </View>
                        <Avatar
                            size="large"
                            overlayContainerStyle={{ backgroundColor: this.state.avatarColor }}
                            icon={{ name: this.state.avName, color: 'white', type: 'font-awesome' }}
                            onPress={this.state.isbackgroundColordef ? this.onAvatarblue : this.onAvatardef}
                            activeOpacity={0.7}
                            containerStyle={{marginTop:10}}
                        />
                        <View style={styles.nameinfo}>
                            <Text style={styles.name}>{this.userData.username}</Text>
                            <Text style={styles.infotitle}>Favourite Genre</Text>
                            <Text style={styles.infodata}>{this.userData.genre}</Text>
                            <Text style={styles.infotitle}>Favourite Song</Text>
                            <Text style={styles.infodata}>{this.userData.songID}</Text>
                        </View>

                        

                        <View style={styles.biocontainer}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', }}>Bio</Text>
                            <Text style={{ fontSize: 16, textAlign: 'justify', }}>{this.userData.bio}</Text>
                        </View>

                        <View style={styles.followButtonsContainer}>
                            <TouchableOpacity
                                style={styles.followButton}
                                onPress={() => this.props.navigation.navigate("Playlist", { playlistId: 2, playlistName: "Your Top Songs" })}

                            >
                                <Text style={styles.followText}>Add Favorite Song?</Text>
                            </TouchableOpacity>

                        </View>


                        <Text style={styles.minititle}>Background Color</Text>
                        <View style={styles.followButtonsContainer}>
                            <TouchableOpacity style={styles.colorButton}
                                onPress={() => { this.setState({ color: 'white' }) }}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>White</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.colorButton}
                                onPress={() => { this.setState({ color: 'red' }) }}>
                                <Text style={{ color: 'red', fontWeight: 'bold' }}>Red</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.colorButton}
                                onPress={() => { this.setState({ color: 'green' }) }}>
                                <Text style={{ color: 'green', fontWeight: 'bold' }}>Green</Text>
                            </TouchableOpacity>
                        </View>



                        <Text>Enable Dark Mode</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={this.state.darkModeEnabled ? "#f5dd4b" : "#f4f3f4"}
                            onChange={() => {
                                this.setState({ darkModeEnabled: !darkModeEnabled})
                            }}
                            value={this.state.darkModeEnabled}
                        />


                        <TouchableOpacity
                            style={styles.logoutButton}
                            onPress={() => {
                                AsyncStorage.setItem('isLoggedIn', 'false');
                                AsyncStorage.setItem('userID', '');
                                console.log("AsyncStorage Logging Out")
                                this.props.navigation.navigate("StartScreen");
                            }}
                        >
                            <Text style={styles.logoutText}>Logout</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => this.props.navigation.push("EditScreen", { refresh: this.refresh_thing.bind(this) })}
                        >
                            <Text>Edit Profile</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            );
        } else {
            return (<Text> Loading </Text>);
        }
    }
}

//Style Sheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        //backgroundColor: 'white',
    },
    colorButton: {
        alignItems: 'center',
        backgroundColor: 'black',
        padding: 10,
        marginTop: 15,
        margin: 10,
        borderRadius: 10,
    },
    minititle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        margin: 1,
        marginBottom: 5,
        fontFamily: 'sans-serif-condensed',
        textAlign: 'center'
    },
    biocontainer: {
        margin: 10,
        marginBottom: 20,
    },
    logoutButton: {
        alignItems: 'center',
        backgroundColor: '#8e6f3e',
        padding: 10,
        margin: 10,
        marginTop: 5,
        marginBottom: 30,
        borderRadius: 10,
    },
    logoutText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    followButtonsContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 10,
    },
    followButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0095ff',
        borderRadius: 10,
        padding: 15,
        margin: 10,
    },
    followText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
    },
    nameinfo: {
        alignItems: 'center',
        borderWidth: 0.5,
        borderRadius: 15,
        borderColor: 'gray',
        margin: 20,
        padding: 10,
        paddingLeft: 50,
        paddingRight: 50,
        alignSelf: 'center',
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    infotitle: {
        fontSize: 14,
    },
    infodata: {
        fontSize: 16,
        fontWeight: 'bold',
    }/*
    topScreen: {
        flex: 0.3,
        backgroundColor: "#3e3e3e",
        borderWidth: 5,
        borderTopLeftRadius: 20,
        borderTopRightRadius:20,
    }*/
})
