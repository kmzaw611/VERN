import React, { useState, Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Switch, SafeAreaView, ScrollView, Modal } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
const methods = require('../MondgoDB/testClient');


export default class ContactInfoScreen extends Component {
    // Defining states and variables
    constructor(props) {
        super(props);
        this.state = {
            dataIsReturned: 0,

            name: "",
            genre: "",
            location: "",
            bio: "",
            phone: "",
            email: "",
            insta: "",
            snap: "",
            twitter: "",

            upd8: "",
            show1: false,
            show2: false
        };
        this.id = {
            _id: ""
        };
        this.artistData = null;
    }

    componentDidMount() {
        AsyncStorage.getItem('userID')
            .then(result => {
                this.id._id = ("" + result);
                this.refresh_local();
            })
            .catch(err => {
                console.error(err);
            });
    }

    refresh_local = () => {
        methods.get_local((res) => {
            console.log(res);
            if (res == null || res == "") {
                console.log("1");
                this.setState({ dataIsReturned: 1 });
            }
            else {
                console.log("2");
                this.artistData = res;
                this.state.name = this.artistData.name;
                this.state.bio = this.artistData.biography;
                this.state.genre = this.artistData.genre;
                this.state.location = this.artistData.location;
                this.state.phone = this.artistData.phone;
                this.state.email = this.artistData.email;
                this.state.insta = this.artistData.insta;
                this.state.snap = this.artistData.snap;
                this.state.twitter = this.artistData.twitter;
                this.setState({ dataIsReturned: 2 });
            }
        }, { creatorID: this.id });
    }

    handleCreate = () => {
        const data = {
            creatorID: this.id._id,
            name: this.state.name,
            genre: this.state.genre,
            location: this.state.location,
            biography: this.state.bio
        }
        console.log(data);
        methods.create_local(result => {
            console.log(result);
            if (result != null) {
                methods.create_thread(res => {
                    if (res != null) {
                        this.refresh_local();
                    }
                    else {
                        console.log("Some went wrong thread create");
                    }
                }, {
                    threadID: this.id._id,
                    threadTitle: this.state.name + " Thread"
                });
                
            }
            else {
                console.log("Some went wrong local create");
            }
        }, data);
    }

    handleEdit = () => {
        var count = 0;
        var editjson = {
            creatorID: this.id._id
        };
        if (!(this.state.name === this.artistData.name)) {
            editjson["name"] = this.state.name;
            count++;
        }
        if (!(this.state.genre === this.artistData.genre)) {
            editjson["genre"] = this.state.genre;
            count++;
        }
        if (!(this.state.bio === this.artistData.biography)) {
            editjson["biography"] = this.state.bio;
            count++;
        }
        if (!(this.state.location === this.artistData.location)) {
            editjson["location"] = this.state.location;
            count++;
        }
        console.log(editjson);
        if (count > 0) {
            methods.edit_local((result) => {
                console.log(result);
                if (result != null) {
                    this.artistData = result;
                    this.refresh_local();
                }
                else {
                    console.log("Edit local error: client");
                }
            }, editjson);
        }
    }

    handleContact = () => {
        //questionable about need for this
        var count = 0;
        var editjson = {
            creatorID: this.id._id
        };
        if (!(this.state.phone === this.artistData.phone)) {
            editjson["phone"] = this.state.phone;
            count++;
        }
        if (!(this.state.email === this.artistData.email)) {
            editjson["email"] = this.state.email;
            count++;
        }
        if (!(this.state.insta === this.artistData.insta)) {
            editjson["insta"] = this.state.insta;
            count++;
        }
        if (!(this.state.snap === this.artistData.snap)) {
            editjson["snap"] = this.state.snap;
            count++;
        }
        if (!(this.state.twitter === this.artistData.twitter)) {
            editjson["twitter"] = this.state.twitter;
            count++;
        }
        console.log(editjson);
        if (count > 0) {
            methods.edit_local((result) => {
                console.log(result);
                if (result != null) {
                    this.artistData = result;
                    this.refresh_local();
                }
                else {
                    console.log("Edit local contact error: client");
                }
            }, editjson);
        }
    }

    postUpd = () => {
        //Take to the thread Screen for the artist (permission is true)
        methods.create_thread(result => {
            methods.make_post(res => {
                if (res != null && res != "Server Error: No thread found here")
                    this.setState({ upd8: "" });
                else
                    console.log("Post Not Sent");
            }, {
                threadID: result.threadID,
                username: this.artistData.name,
                time: Date().toLocaleLowerCase(),
                title: "Update",
                content: this.state.upd8
            });
        }, { threadID: this.artistData._id, threadTitle: this.artistData.name + "'s Updates" });
    }

    render() {
        if (this.state.dataIsReturned == 2) {
            return (
                <View style={{alignItems: 'center'}}>
                    <Text style={styles.title2}>{this.artistData.name}</Text>
                    <View style={{ alignItems: 'center' }}></View>

                    <View style={styles.biocontainer}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, textAlign: 'justify', fontWeight: 'bold' }}>{"Genre:"}</Text>
                            <Text style={{ fontSize: 16, textAlign: 'justify', }}>{this.artistData.genre}</Text>
                            <Text style={{ fontSize: 20, textAlign: 'justify', fontWeight: 'bold'}}>{"Location:"}</Text>
                            <Text style={{ fontSize: 16, textAlign: 'justify', }}>{this.artistData.location}</Text>
                            <Text style={{ fontSize: 20, textAlign: 'justify', fontWeight: 'bold'}}>{"Bio:"}</Text>
                            <Text style={{ fontSize: 16, textAlign: 'justify', }}>{this.artistData.biography}</Text>
                        </View>
                    </View>

                    <View style={styles.biocontainer}>
                        <View style={styles.followButtonsContainer}>
                        <TouchableOpacity
                            onPress={() => { this.setState({ show1: true }) }}
                            style={styles.followButton}
                        >
                            <Text style={{ fontSize: 16, textAlign: 'justify', color: 'white', fontWeight: 'bold' }}>Edit Page</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { this.setState({ show2: true }) }}
                            style={styles.followButton}
                        >
                            <Text style={{ fontSize: 16, textAlign: 'justify', color: 'white', fontWeight: 'bold' }}>Contact Info</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{alignItems: 'center'}}>
                        <TextInput style={styles.inputEmailPassword}
                            multiline
                            label="Status Update"
                            placeholder={"What's New?"}
                            value={this.state.upd8}
                            onChangeText={(newValue) => this.setState({ upd8: newValue })}
                        />

                        <TouchableOpacity
                            onPress={this.postUpd.bind(this)}
                        >
                            <Text style={{ color: 'brown', marginLeft: 10, fontSize: 20, fontWeight: 'bold', marginLeft: 15, }}>Post</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Modal
                        transparent={true}
                        visible={this.state.show1}
                    >
                        <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
                            <View style={{ backgroundColor: "#ffffff", margin: 50, padding: 40, borderRadius: 10, flex: 1 }}>
                                <Text style={styles.title}>Page Info</Text>

                                <ScrollView>
                                <View style={styles.biocontainer}>
                                    <Text style={styles.minititle}>Name:</Text>
                                    <TextInput style={styles.inputEmailPassword}
                                        label="Name"
                                        placeholder={this.artistData.name}
                                        value={this.state.name}
                                        onChangeText={(newValue) => this.setState({ name: newValue })}
                                    />
                                </View>

                                <View style={styles.biocontainer}>
                                    <Text style={styles.minititle}>Genre:</Text>
                                    <TextInput style={styles.inputEmailPassword}
                                        label="Genre"
                                        placeholder={this.artistData.genre}
                                        value={this.state.genre}
                                        onChangeText={(newValue) => this.setState({ genre: newValue })}
                                    />
                                </View>

                                <View style={styles.biocontainer}>
                                    <Text style={styles.minititle}>Location:</Text>
                                    <TextInput style={styles.inputEmailPassword}
                                        label="Location"
                                        placeholder={this.artistData.location}
                                        value={this.state.location}
                                        onChangeText={(newValue) => this.setState({ location: newValue })}
                                    />
                                </View>

                                <View style={styles.biocontainer}>
                                    <Text style={styles.minititle}>Bio:</Text>
                                    <TextInput style={styles.inputEmailPassword}
                                        label="Bio"
                                        placeholder={this.artistData.bio}
                                        value={this.state.bio}
                                        onChangeText={(newValue) => this.setState({ bio: newValue })}
                                    />
                                </View>
                                </ScrollView>

                                <TouchableOpacity onPress={() => {
                                    this.handleEdit();
                                    this.setState({ show1: false });
                                }}>
                                    <Text style={{ color: 'brown', marginTop: 15, fontSize: 14, fontWeight: 'bold', marginLeft: 15, textAlign: 'center' }}>Done</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    this.setState({ show1: false });
                                }}>
                                    <Text style={{ color: 'brown', marginTop: 15, fontSize: 14, fontWeight: 'bold', marginLeft: 15, textAlign: 'center' }}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    <Modal
                        transparent={true}
                        visible={this.state.show2}
                    >
                        <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
                            <View style={{ backgroundColor: "#ffffff", margin: 50, padding: 40, borderRadius: 10, flex: 1 }}>
                                
                                <Text style={styles.title}>Contact Info</Text>
                                <ScrollView>
                                <View style={styles.biocontainer}>
                                    <Text style={styles.minititle}>Phone:</Text>
                                    <TextInput style={styles.inputEmailPassword}
                                        label="Phone"
                                        placeholder={this.artistData.phone}
                                        value={this.state.phone}
                                        onChangeText={(newValue) => this.setState({ phone: newValue })}
                                    />
                                </View>

                                <View style={styles.biocontainer}>
                                    <Text style={styles.minititle}>Email:</Text>
                                    <TextInput style={styles.inputEmailPassword}
                                        label="Email"
                                        placeholder={this.artistData.email}
                                        value={this.state.email}
                                        onChangeText={(newValue) => this.setState({ email: newValue })}
                                    />
                                </View>

                                <View style={styles.biocontainer}>
                                    <Text style={styles.minititle}>Instagram:</Text>
                                    <TextInput style={styles.inputEmailPassword}
                                        label="Insta"
                                        placeholder={this.artistData.insta}
                                        value={this.state.insta}
                                        onChangeText={(newValue) => this.setState({ insta: newValue })}
                                    />
                                </View>

                                <View style={styles.biocontainer}>
                                    <Text style={styles.minititle}>Snapchat:</Text>
                                    <TextInput style={styles.inputEmailPassword}
                                        label="Snap"
                                        placeholder={this.artistData.snap}
                                        value={this.state.snap}
                                        onChangeText={(newValue) => this.setState({ snap: newValue })}
                                    />
                                </View>

                                <View style={styles.biocontainer}>
                                    <Text style={styles.minititle}>Twitter:</Text>
                                    <TextInput style={styles.inputEmailPassword}
                                        label="Twitter"
                                        placeholder={this.artistData.twitter}
                                        value={this.state.twitter}
                                        onChangeText={(newValue) => this.setState({ twitter: newValue })}
                                    />
                                </View></ScrollView>

                                <TouchableOpacity onPress={() => {
                                    this.handleContact();
                                    this.setState({ show2: false });
                                }}>
                                    <Text style={{ color: 'brown', marginTop: 15, fontSize: 14, fontWeight: 'bold', marginLeft: 15, textAlign: 'center' }}>Done</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    this.setState({ show2: false });
                                }}>
                                    <Text style={{ color: 'brown', marginTop: 15, fontSize: 14, fontWeight: 'bold', marginLeft: 15, textAlign: 'center' }}>Cancel</Text>
                                </TouchableOpacity>
                               
                            </View> 
                        </View>
                    </Modal>
                </View>
            );
        }
        else if (this.state.dataIsReturned == 1) {
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>Haven't Created a Page Yet?</Text>
                    <TouchableOpacity
                        onPress={() => { this.setState({ show1: true }) }}
                        style={styles.followButton}
                    >
                        <Text style={{ fontSize: 16, textAlign: 'justify', color: 'white', fontWeight: 'bold' }}>Click here to get started!</Text>
                    </TouchableOpacity>
                    <Modal
                        transparent={true}
                        visible={this.state.show1}
                    >
                        <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
                            <View style={{ backgroundColor: "#ffffff", margin: 50, padding: 40, borderRadius: 10, flex: 1 }}>
                                <Text style={styles.title}>Create a New Page</Text>

                                <ScrollView>
                                <View style={styles.biocontainer}>
                                    <Text style={styles.minititle}>Name:</Text>
                                    <TextInput style={styles.inputEmailPassword}
                                        label="Name"
                                        placeholder="Name"
                                        value={this.state.name}
                                        onChangeText={(newValue) => this.setState({ name: newValue })}
                                    />
                                </View>

                                <View style={styles.biocontainer}>
                                    <Text style={styles.minititle}>Genre:</Text>
                                    <TextInput style={styles.inputEmailPassword}
                                        label="Genre"
                                        placeholder="Genre"
                                        value={this.state.genre}
                                        onChangeText={(newValue) => this.setState({ genre: newValue })}
                                    />
                                </View>

                                <View style={styles.biocontainer}>
                                    <Text style={styles.minititle}>Location:</Text>
                                    <TextInput style={styles.inputEmailPassword}
                                        label="Location"
                                        placeholder="Location"
                                        value={this.state.location}
                                        onChangeText={(newValue) => this.setState({ location: newValue })}
                                    />
                                </View>

                                <View style={styles.biocontainer}>
                                    <Text style={styles.minititle}>Bio:</Text>
                                    <TextInput style={styles.inputEmailPassword}
                                        label="Bio"
                                        placeholder="Bio"
                                        value={this.state.bio}
                                        onChangeText={(newValue) => this.setState({ bio: newValue })}
                                    />
                                    </View>
                                </ScrollView>

                                <TouchableOpacity onPress={() => {
                                    this.handleCreate();
                                    this.setState({ show1: false });
                                }}>
                                    <Text style={{ color: 'brown', marginTop: 15, fontSize: 14, fontWeight: 'bold', marginLeft: 15, textAlign: 'center' }}>Done</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    this.setState({ show1: false });
                                }}>
                                    <Text style={{ color: 'brown', marginTop: 15, fontSize: 14, fontWeight: 'bold', marginLeft: 15, textAlign: 'center' }}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
            );
        }
        else if (this.state.dataIsReturned == 0) {
            return (<Text>Loading...</Text>);
        }
        else {
            console.log("Frontend state error");
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    biocontainer: {
        fontSize: 14
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
        backgroundColor: '#8e6f3e',
        color: 'black',
        width: '40%',
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
        fontSize: 20,
        borderRadius: 15,
        borderColor: 'black', 
        marginBottom: 10
    },
    infodata: {
        fontSize: 24,
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
        fontSize: 32,
        fontWeight: 'bold',
        color: '#8e6f3e',
        margin: 10,
        marginBottom: 10,
        fontFamily: 'sans-serif-condensed',
    },
    title2: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#8e6f3e',
        margin: 10,
        marginBottom: 10,
        fontFamily: 'sans-serif-condensed',
        borderWidth: 5,
        width: '100%',
        textAlign: 'center',
        borderColor: 'black'
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
