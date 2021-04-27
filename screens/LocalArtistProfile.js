import React from 'react'
import {Text, StyleSheet, View, TouchableOpacity, Modal, TextInput, Image, Button, Alert, ScrollView} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
const methods = require('../MondgoDB/testClient');

export default class LocalArtistProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            show2: false,
            reload: false,
            message: ""
        }
        this.id = {
            _id: ""
        }
        this.localID = "";
        this.user = null;
        this.local = null;
    }

    componentDidMount() {
        AsyncStorage.getItem('userID')
            .then(result => {
                this.id._id = ("" + result);
                methods.get_user(this.id, res => {
                    if (res != null) {
                        console.log(res);
                        this.user = res;
                        methods.get_local(res2 => {
                            console.log(res2);
                            if (res2 != null) {
                                this.local = res2;
                                this.localID = this.props.route.params.localID;
                                this.setState({ reload: true });
                            }
                            else {
                                console.log("no local found");
                            }
                        }, { creatorID: this.props.route.params.localID });
                    }
                    else {
                        console.log("no user found");
                    }
                });
            })
            .catch(err => {
                console.error(err);
            });
    }

    handleMessageSend = () => {
        methods.create_thread(result => {
            methods.make_post(res => {
                if (res != null && res != "Server Error: No thread found here")
                    console.log("Post Sent");
                else
                    console.log("Post Not Sent");
            }, {
                threadID: result.threadID,
                username: this.user.username,
                time: Date().toLocaleLowerCase(),
                title: this.user.username,
                content: this.state.message
            });
        }, { threadID: this.local.creatorID, threadTitle: this.local.name + "'s Messages" });
    }

    goToUpdates = () => {
        this.props.navigation.push("ThreadScreen", {
            threadID: this.local._id,
            header: (this.local.name + "'s Updates"),
            permissions: false
        });
    }

    render() {
        if (this.state.reload) {
            return (
                <View>
                    <Text style={styles.title2}>{this.local.name}</Text>
                    <View style={{ alignItems: 'center' }}></View>

                    <View style={styles.biocontainer}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, textAlign: 'justify', fontWeight: 'bold' }}>{"Genre:"}</Text>
                            <Text style={{ fontSize: 16, textAlign: 'justify', }}>{this.local.genre}</Text>
                            <Text style={{ fontSize: 20, textAlign: 'justify', fontWeight: 'bold' }}>{"Location:"}</Text>
                            <Text style={{ fontSize: 16, textAlign: 'justify', }}>{this.local.location}</Text>
                            <Text style={{ fontSize: 20, textAlign: 'justify', fontWeight: 'bold' }}>{"Bio:"}</Text>
                            <Text style={{ fontSize: 16, textAlign: 'justify', }}>{this.local.biography}</Text>
                        </View>
                    </View>
                    <View style={styles.biocontainer}>
                        {
                            this.user.isLocalBusiness ?
                                <TouchableOpacity
                                    onPress={() => { this.setState({ show2: true }) }}
                                    style={styles.followButton}
                                >
                                    <Text style={{ fontSize: 16, textAlign: 'justify', color: 'white', fontWeight: 'bold' }}>Contact</Text>
                                </TouchableOpacity>
                                : null
                        }
                        {
                            this.user.isLocalBusiness ?
                                <TouchableOpacity
                                    onPress={() => { this.setState({ show: true }) }}
                                    style={styles.followButton}
                                >
                                    <Text style={{ fontSize: 16, textAlign: 'justify', color: 'white', fontWeight: 'bold' }}>Send Message</Text>
                                </TouchableOpacity>
                            : null
                        }
                        <TouchableOpacity
                            onPress={() => { this.goToUpdates(); }}
                            style={styles.followButton}
                        >
                            <Text style={{ fontSize: 16, textAlign: 'justify', color: 'white', fontWeight: 'bold' }}>View Updates</Text>
                        </TouchableOpacity>
                    </View>
                    <Modal
                        transparent={true}
                        visible={this.state.show}
                    >
                        <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
                            <View style={{ backgroundColor: "#ffffff", margin: 50, padding: 40, borderRadius: 10, flex: 1 }}>
                                <Text style={styles.title}>Send Artist Message</Text>

                                <TextInput style={styles.inputEmailPassword}
                                    label="Name"
                                    placeholder="Send Message"
                                    value={this.state.message}
                                    onChangeText={(newValue) => this.setState({ message: newValue })}
                                />

                                <TouchableOpacity onPress={() => {
                                    this.handleMessageSend();
                                    this.setState({ show: false });
                                }}>
                                    <Text style={{ color: 'brown', marginTop: 15, fontSize: 14, fontWeight: 'bold', marginLeft: 15, textAlign: 'center' }}>Send</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => {
                                    this.setState({ show: false });
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
                                <Text style={styles.title}>Contact Information</Text>

                                <Text style={styles.infodata}>Phone Number</Text>
                                <Text style={styles.infotitle}>{this.local.phone}</Text>

                                <Text style={styles.infodata}>Email Address</Text>
                                <Text style={styles.infotitle}>{this.local.email}</Text>
                                <Text style={styles.infodata}>Instagram</Text>
                                <Text style={styles.infotitle}>{this.local.insta}</Text>
                                <Text style={styles.infodata}>Snapchat</Text>
                                <Text style={styles.infotitle}>{this.local.snap}</Text>
                                <Text style={styles.infodata}>Twitter</Text>
                                <Text style={styles.infotitle}>{this.local.twitter}</Text>

                                <TouchableOpacity onPress={() => {
                                    this.setState({ show2: false });
                                }}>
                                    <Text style={{ color: 'brown', marginTop: 15, fontSize: 14, fontWeight: 'bold', marginLeft: 15, textAlign: 'center' }}>Done</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                </View>
            );
        }
        else {
            return (
                <Text>Loading...</Text>
            );
        }
  }
}
  

const styles = StyleSheet.create({
  inputEmailPassword: {
    width: 225,
    height: 40,
    margin: 5,
    backgroundColor: '#cfb991',
    color: 'black',
    borderRadius: 10,
    textAlign: 'center'
  },
  biocontainer: {
    margin: 10,
    marginBottom: 20,
    alignItems: 'center'
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
editButton: {
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 10,
  padding: 10,
  margin: 10,
  
},
  inputEmailPasswordBio: {
    width: 225,
    height: 300,
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
    textAlign: 'center'
  },
  sampleGroup: {
    backgroundColor: '#8e6f3e',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    padding:15,
    margin: 20
    },
    title2: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#8e6f3e',
        marginBottom: 10,
        fontFamily: 'sans-serif-condensed',
        borderWidth: 5,
        width: '100%',
        textAlign: 'center',
        borderColor: 'black'
    },
  sampleGroupText: {
    alignContent: 'center',
    fontWeight: 'bold',
    fontSize: 20

  }
})

//export default LocalArtistProfile;
