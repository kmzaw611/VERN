import React, { useState, Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Switch, SafeAreaView } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
const methods = require('../MondgoDB/testClient');


export default class ProfileScreen extends Component {
    // Defining states and variables
    constructor() {
        super();
        this.state = {
            darkModeEnabled: false,
            dataIsReturned: false,
            name: "",
            genre: "",
            bio: "",
            favoriteSong: ""
        };
        this.id = {
            _id: ""
        };
        this.userData = null;
        
    }

    //Where I get the data and change states
    componentDidMount() {
        AsyncStorage.getItem('userID')
            .then(result => {
                this.id._id = ("" + result);
                methods.get_user(this.id, (res) => {
                    this.userData = res;
                    this.state.name = this.userData.username;
                    this.state.bio = this.userData.bio;
                    this.state.genre = this.userData.genre;
                    this.state.favoriteSong = this.userData.songID;
                    this.setState({ dataIsReturned: true });
                });
            })
            .catch(err => {
                console.error(err);
            });
    }

    handleSave() {
        var count = 0;
        var editjson = {
            _id: this.id._id
        };
        if (!(this.state.name === this.userData.username)) {
            editjson["username"] = this.state.name;
            count++;
        }
        if (!(this.state.genre === this.userData.genre)) {
            editjson["genre"] = this.state.genre;
            count++;
        }
        if (!(this.state.bio === this.userData.bio)) {
            editjson["bio"] = this.state.bio;
            count++;
        }
        if (!(this.state.favoriteSong === this.userData.songID)) {
            editjson["songID"] = this.state.favoriteSong;
            count++;
        }
        console.log(editjson);
        if (count > 0) {
            methods.edit_user((result) => {
                console.log(result);
                this.props.navigation.navigate("ProfileScreen");
            }, editjson);
        }
        else {
            this.props.navigation.navigate("ProfileScreen");
        }
    }

    render() {
        //changes to true when data is retrieved from server
        if (this.state.dataIsReturned === true) {
            return (
                <SafeAreaView style={styles.container}>
                    <View style={styles.nameinfo}>
                        <Text style={styles.title}>Edit Your Profile</Text>
                    </View>

                    <View style={styles.biocontainer}>
                        <Text style={styles.minititle}>Name:</Text>
                        <TextInput style={styles.inputEmailPassword}
                            label="Username"
                            placeholder={this.userData.username}
                            value={this.state.name}
                            onChangeText={(newValue) => this.setState({ name: newValue })}
                        />
                    </View>

                    <View style={styles.biocontainer}>
                        <Text style={styles.minititle}>Favorite Genre:</Text>
                        <TextInput style={styles.inputEmailPassword}
                            label="Favorite Genre"
                            placeholder={this.userData.genre}
                            value={this.state.genre}
                            onChangeText={(newValue) => this.setState({genre: newValue})}
                        />
                    </View>

                    <View style={styles.biocontainer}>
                        <Text style={styles.minititle}>Favorite Song:</Text>
                        <TextInput style={styles.inputEmailPassword}
                            label="Favorite Song"
                            placeholder={this.userData.songID}
                            value={this.state.favoriteSong}
                            onChangeText={(newValue) => this.setState({ favoriteSong: newValue })}
                        />
                    </View>

                    <View style={styles.biocontainer}>
                        <Text style={styles.minititle}>Bio:</Text>
                        <TextInput style={styles.inputEmailPasswordBio}
                            label="Bio"
                            placeholder={this.userData.bio}
                            value={this.state.bio}
                            onChangeText={(newValue) => this.setState({ bio: newValue })}
                        />
                    </View>

                    <TouchableOpacity
                    onPress = {this.handleSave.bind(this)}
                    >
                        <Text style={{ color: 'brown', marginLeft: 10, fontSize: 14, fontWeight: 'bold', marginLeft: 15, }}>Save Profile</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            );
        } else {
            return (<Text> Loading </Text>);
        }
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
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
        marginBottom: 40,
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
        fontSize: 18,
        fontWeight: 'bold',
    },
    input: {
        fontSize: 16,
        textAlign: 'justify',
        borderWidth: 1,
        padding: 1,
        margin: 1,
        borderColor: 'black',

    },
    inputEmailPassword: {
        width: 225,
        height: 40,
        margin: 5,
        backgroundColor: '#cfb991',
        color: 'black',
        borderRadius: 10,
        textAlign: 'center'
    },
    inputEmailPasswordBio: {
        width: 225,
        height: 100,
        margin: 5,
        backgroundColor: '#cfb991',
        color: 'black',
        borderRadius: 10,
        textAlign: 'center'
    },
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
    minititle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#8e6f3e',
        margin: 10,
        marginBottom: 5,
        fontFamily: 'sans-serif-condensed',
    },
});