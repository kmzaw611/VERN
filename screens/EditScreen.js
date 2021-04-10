import React, { useState, Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Switch, SafeAreaView, Modal } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
const methods = require('../MondgoDB/testClient');


export default class EditScreen extends Component {
    // Defining states and variables
    constructor(props) {
        super(props);
        this.state = {
            darkModeEnabled: false,
            dataIsReturned: false,
            name: "",
            genre: "",
            bio: "",
            favoriteSong: "",
            show: false
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
<<<<<<< HEAD
=======
                //this.setState({ dataIsReturned: false });
                //need a refresh() call here from profilescreen to change states to update
                //this.props.navigation.state.params.refresh();
                //this.props.navigation.goBack();
                console.log(result);
>>>>>>> matt_branch
                this.props.route.params.refresh(true);
                this.props.navigation.goBack();
            }, editjson);
        }
        else {
<<<<<<< HEAD
            this.props.route.params.refresh(true);//.navigation.params);
            //this.props.navigation.params.refresh(true);
=======
            //this.props.navigation.state.params.refresh();
            //this.props.navigation.state.params.forceUpdate();
            this.props.route.params.refresh(true);//.navigation.params);

>>>>>>> matt_branch
            this.props.navigation.goBack();
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
                        <TouchableOpacity onPress={() => { this.setState({ show: true }) }}>
                            <Text style={styles.minititle}>Favorite Genre:</Text>
                        </TouchableOpacity>
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
                    <Modal
                        transparent={true}
                        visible={this.state.show}

                    >
                        <View style={{ backgroundColor: "#000000aa", flex: 1 }}
                        >
                            <View style={{ backgroundColor: "#ffffff", margin: 40, padding: 20, borderRadius: 5, flex: 1 }}>
                                <Text style={styles.title}>Pick Your Favorite Genre</Text>

                                <TouchableOpacity onPress={() => {
                                    //var p = " POP ";
                                        var rep = this.state.genre.concat(" POP ")
                                        //this.setState({ genre: "" })
                                        this.setState({genre: rep})
                                    }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', borderRadius: 10, margin: 10 }}>POP</Text>
                                    
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => {
                                    //var p = " POP ";
                                    var rep = this.state.genre.concat(" RAP ")
                                    //this.setState({ genre: "" })
                                    this.setState({ genre: rep })
                                }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', borderRadius: 10, margin: 10 }}>RAP</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => {
                                    //var p = " POP ";
                                    var rep = this.state.genre.concat(" ROCK ")
                                    //this.setState({ genre: "" })
                                    this.setState({ genre: rep })
                                }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', borderRadius: 10, margin: 10 }}>ROCK</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => {
                                    //var p = " POP ";
                                    var rep = this.state.genre.concat(" METAL ")
                                    //this.setState({ genre: "" })
                                    this.setState({ genre: rep })
                                }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', borderRadius: 10, margin: 10 }}>METAL</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => {
                                    //var p = " POP ";
                                    var rep = this.state.genre.concat(" JAZZ ")
                                    //this.setState({ genre: "" })
                                    this.setState({ genre: rep })
                                }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', borderRadius: 10, margin: 10 }}>JAZZ</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => {
                                    //var p = " POP ";
                                    var rep = this.state.genre.concat(" DJENT ")
                                    //this.setState({ genre: "" })
                                    this.setState({ genre: rep })
                                }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', borderRadius: 10, margin: 10 }}>DJENT</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => { this.setState({ show: false }) }}>
                                    <Text style={{ color: 'brown', marginTop: 15, fontSize: 14, fontWeight: 'bold', marginLeft: 15, textAlign: 'center', }}>Done</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                    </Modal>

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
        marginBottom: 15,
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