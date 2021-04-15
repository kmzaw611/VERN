import React, { useState, Component} from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Switch } from 'react-native';
const methods = require('../MondgoDB/testClient');
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme } from '@react-navigation/native';

// Ethan code for fetching db info before render
export default class ProfileScreen extends Component {
    // Defining states and variables
    constructor(props) {
        super(props);
        this.state = {
            darkModeEnabled: false,
            dataIsReturned: false,
            backgroundColor: 'white'
        };
        //Current User
        this.id = {
            _id: ""
        };
        //User being looked at
        this.nid = {
            _id: ""
        }
        this.userData = null;
        this.status = "";
    }

    //Where I get the data and change states
    componentDidMount() {
        this.nid._id = this.props.route.params.uid;
        AsyncStorage.getItem('userID')
            .then(result => {
                this.id._id = ("" + result);
                methods.get_user(this.id, (res) => {
                    //Check if following
                    this.status = "Follow";
                    for (var i = 0; i < res.following.length; i++) {
                        if (this.nid._id === res.following[i])
                            this.status = "Unfollow";
                    }
                    //Get User Data
                    methods.get_user(this.nid, (res) => {
                        this.userData = res;
                        this.setState({ dataIsReturned: true });
                    });

                });
            })
            .catch(err => {
                console.error(err);
            });
    }

    refresh_thing(params) {
        AsyncStorage.getItem('userID')
            .then(result => {
                this.id._id = ("" + result);
                methods.get_user(this.id, (res) => {
                    //Check if following
                    this.status = "Follow";
                    for (var i = 0; i < res.following.length; i++) {
                        if (this.nid._id === res.following[i])
                            this.status = "Unfollow";
                    }
                    methods.get_user(this.nid, (res) => {
                        this.userData = res;
                        this.setState({ dataIsReturned: true });
                    });

                });
            })
            .catch(err => {
                console.error(err);
            });
    }

    follow = () => {
        const data = {
                my_id: this.id._id,
                their_id: this.nid._id
        }
        if (this.status == "Follow") {
            methods.follow_user(resu => {
                if (resu == "SUCCESS") {
                    this.status = "Unfollow";
                    this.setState({ dataIsReturned: true });
                    //this.refresh_thing();
                }
                else {
                    console.log(resu);
                }
            }, data);
        }
        else if (this.status == "Unfollow") {
            methods.unfollow_user(resu => {
                if (resu === "SUCCESS") {
                    this.status = "Follow";
                    this.setState({ dataIsReturned: true });
                    //this.refresh_thing();
                }
                else {
                    console.log(resu);
                }
            }, data);
        }
    }

    //Where i put the render function
    render() {
        if (this.state.dataIsReturned === true) {
            return (
                <View style={styles.container}>
                    <View style={styles.nameinfo}>
                        <Text style={styles.name}>{this.userData.username}</Text>
                        <Text style={styles.infotitle}>Favourite Genre</Text>
                        <Text style={styles.infodata}>{this.userData.genre}</Text>
                        <Text style={styles.infotitle}>Favourite Song</Text>
                        <Text style={styles.infodata}>{this.userData.songID}</Text>
                    </View>

                    <View style={styles.biocontainer}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', }}>Bio</Text>
                        <Text style={{ fontSize: 16, textAlign: 'justify', }}>{this.userData.bio}</Text>
                    </View>

                    <View style={styles.followButtonsContainer}>
                        <TouchableOpacity
                            style={styles.followButton}
                            onPress={this.follow.bind(this)}
                        >
                            <Text style={styles.followText}>{this.status}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
        backgroundColor: 'white',
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
    }/*
    topScreen: {
        flex: 0.3,
        backgroundColor: "#3e3e3e",
        borderWidth: 5,
        borderTopLeftRadius: 20,
        borderTopRightRadius:20,
    }*/
})
