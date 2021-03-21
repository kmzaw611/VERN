import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Button, Switch } from 'react-native';
const methods = require('../MondgoDB/testClient');
const uname = require('../MondgoDB/uname');
//Still Working on this, will implement soon - 3/21/21

/*
var userData;
let promise = new Promise((res, rej) => {
    var name = {
        username: "Man7"
    };
    uname.get_username(function (result) {
        name.username = result;
    });
    res(methods.get_user(name, function (result) {
        console.log(result);
        return result;
    }));
}); */
const ProfileScreen = /*async*/ ({ navigation }) => {
    const onLogoutPress = () => navigation.navigate("StartScreen");
/*userData = await promise;*/
    const userData = require("../MondgoDB/for_profile_screen.json");
    console.log(userData);
    const [darkModeEnabled, setDarkModeEnabled] = useState(false);
    console.log('placement PS')
    
    return (
        <View style={styles.container}>
            <View style={styles.nameinfo}>
                <Text style={styles.name}>{userData.username}</Text>
                <Text style={styles.infotitle}>Favourite Genre</Text>
                <Text style={styles.infodata}>{userData.genre}</Text>
                <Text style={styles.infotitle}>Favourite Song</Text>
                <Text style={styles.infodata}>{userData.songID}</Text>
            </View>

            <View style={styles.biocontainer}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', }}>Bio</Text>
                <Text style={{ fontSize: 16, textAlign: 'justify', }}>{userData.bio}</Text>
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
                thumbColor={darkModeEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => {
                    setDarkModeEnabled(previousState => !previousState)
                }}
                value={darkModeEnabled}
            />

            <TouchableOpacity
                style={styles.logoutButton}
                onPress={onLogoutPress}
            >
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>

        </View>
    )
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
    }
})
export default ProfileScreen;
