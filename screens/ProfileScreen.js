import React, { useState, Component} from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Switch, ScrollView } from 'react-native';
const methods = require('../MondgoDB/testClient');
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme } from '@react-navigation/native';
import { Avatar, Button } from 'react-native-elements';
import { color } from 'react-native-reanimated';

/*
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

            */
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
        this.song1 = {
            name: "Default",
            artist: "Default"
        }
        this.song2 = {
            name: "Default",
            artist: "Default"
        }
        this.song3 = {
            name: "Default",
            artist: "Default"
        }
        this.token = "";
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
    test_songs = () => {
        this.song1.name = "Test";
        this.setState({ dataIsReturned: true });
    }
    get_songs = () => {
        const data1 = {
            refreshToken: this.userData.refreshToken,
            range: "short"
        }
        const data2 = {
            refreshToken: this.userData.refreshToken,
            range: "medium"
        }
        const data3 = {
            refreshToken: this.userData.refreshToken,
            range: "long"
        }
        methods.top_songs(result => {
            this.song1.name = result.songs[0].title;
            this.song1.artist = result.songs[0].artist;
            methods.top_songs(result2 => {
                this.song2.name = result2.songs[0].title;
                this.song2.artist = result2.songs[0].artist;
                methods.top_songs(result3 => {
                    this.song3.name = result3.songs[0].title;
                    this.song3.artist = result3.songs[0].artist;
                    this.setState({ dataIsReturned: true })
                }, data3)
            },data2)
        }, data1)
    }

    //Where i put the render function
    render() {
        if (this.state.dataIsReturned === true) {
            return (
                //<View style={styles.container}>
                <ScrollView>
                    <View style={{ flex: 1, alignItems: 'center', backgroundColor: this.state.color }}>

<Avatar
    size="large"
    overlayContainerStyle={{ backgroundColor: this.state.avatarColor }}
    icon={{ name: this.state.avName, color: 'white', type: 'font-awesome' }}
    //{isbackgroundColordef
   //     ? onPress={ onAvatarblue }
  //      : onPress = {onAvatardef}
 //   }
    onPress={this.state.isbackgroundColordef ? this.onAvatarblue : this.onAvatardef}
    activeOpacity={0.7}
    containerStyle={{marginTop:10}}
/>

<TouchableOpacity style={styles.followButton}
onPress={() => this.props.navigation.navigate("MyLocalArtistProfile")}
>
    <Text style={styles.followText}>Manage My Page</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.followButton} 
onPress={() => this.props.navigation.navigate("SpotifyAuthenticationScreen")}
>
    <Text style={styles.followText}>Link Spotify</Text>
</TouchableOpacity>

<TouchableOpacity onPress={() => this.props.navigation.navigate("ContactInfoScreen")}>
<View style={styles.nameinfo}>
    <Text style={styles.name}>{this.userData.username}</Text>
    <Text style={styles.infotitle}>Favourite Genre</Text>
    <Text style={styles.infodata}>{this.userData.genre}</Text>
    <Text style={styles.infotitle}>Favourite Song</Text>
    <Text style={styles.infodata}>{this.userData.songID}</Text>
</View>
</TouchableOpacity>

<View style={styles.followButtonsContainer}>
    <View style={styles.tintDarkContainer}>
        <Text style={{fontSize: 20, paddingBottom: 25, fontWeight: 'bold'}}>   Short Term   </Text>
        <Text>{this.song1.name}</Text>
        <TouchableOpacity style={styles.followButton} onPress = {() => this.get_songs.bind(this)()}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>Publish</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.tintDarkContainer}>
        <Text style={{fontSize: 20, paddingBottom: 25, fontWeight: 'bold'}}>   Medium Term   </Text>
        <Text>{this.song2.name}</Text>
        <TouchableOpacity style={styles.followButton}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>Publish</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.tintDarkContainer}>
        <Text style={{fontSize: 20, paddingBottom: 25, fontWeight: 'bold'}}>   Long Term   </Text>
        <Text>{this.song3.name}</Text>
        <TouchableOpacity style={styles.followButton}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>Publish</Text>
        </TouchableOpacity>
    </View>
</View>

<View>
    
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
    //ios_backgroundColor="#3e3e3e"
    //backgroundColor = "3e3e3e"
    //backgroundColor = {DarkTheme}
    onChange={() => {
        //styles = {[
       //     styles.container,
       //     { backgroundColor: this.state.backgroundColor('#3e3e3e')},
     //   ]},

        //this.setState({backgroundColor: '#3e3e3e' })
        //<View style={styles.topScreen} />
        //this.setState({ backgroundColor: "#3e3e3e" }),
        this.setState({ darkModeEnabled: !darkModeEnabled})
        //console.log("sec")
    }}
    value={this.state.darkModeEnabled}
/>

<TouchableOpacity
    style={styles.logoutButton}
    onPress={() => {
        //const deleteLoginInfo = async () => {
          //  try {
                AsyncStorage.setItem('isLoggedIn', 'false');
        AsyncStorage.setItem('userID', '');
                AsyncStorage.setItem('GroupID', '');
                console.log("AsyncStorage Logging Out")
           // } catch (err) {
             //   console.log(err);
            //}
        //}
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
    },
    tintDarkContainer: {
        //flex: 1,
        borderColor: 'black',
        borderRadius: 1,
        borderWidth: 1
        //justifyContent: 'center',
      },/*
    topScreen: {
        flex: 0.3,
        backgroundColor: "#3e3e3e",
        borderWidth: 5,
        borderTopLeftRadius: 20,
        borderTopRightRadius:20,
    }*/
})
