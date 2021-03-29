import React, { useState, Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Switch } from 'react-native';
const methods = require('../MondgoDB/testClient');
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation }) => {
  const onLogoutPress = () => {
    const deleteLoginInfo = async() => {
      try {
        await AsyncStorage.setItem('isLoggedIn', 'false');
        await AsyncStorage.setItem('userID', '');
        console.log("AsyncStorage Logging Out")
      } catch (err) {
        console.log(err);
      }
    }
    navigation.navigate("StartScreen");
  }

  const userData = require("./test_json/fake_user.json")[0];
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
    return (
      <View style={styles.container}>
        <View style={styles.nameinfo}>
          <Text style={styles.name}>{userData.name}</Text>
          <Text style={styles.infotitle}>Favourite Genre</Text>
          <Text style={styles.infodata}>{userData.genre}</Text>
          <Text style={styles.infotitle}>Favourite Song</Text>
          <Text style={styles.infodata}>{userData.songID}</Text>
        </View>
// Ethan code for fetching db info before render
export default class ProfileScreen extends Component {
    // Defining states and variables
    constructor() {
        super();
        this.state = {
            darkModeEnabled: false,
            dataIsReturned: false
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
                    this.setState({ dataIsReturned: true });
                });
            })
            .catch(err => {
                console.error(err);
            });
    }

    //Where i put the render function
    render() {
        //changes to true when data is retrieved from server
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
                        >
                            <Text style={styles.followText}>Follow</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.followButton}
                        >
                            <Text style={styles.followText}>Unfollow</Text>
                        </TouchableOpacity>
                    </View>

                    <Text>Enable Dark Mode</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={this.state.darkModeEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => {
                            this.setState({ darkModeEnabled: !darkModeEnabled })
                        }}
                        value={this.state.darkModeEnabled}
                    />

                    <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={() => this.props.navigation.push("StartScreen")}
                    >
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.push("EditScreen")}
                    >
                        <Text>Edit Profile</Text>


                    </TouchableOpacity>
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
    }
})
