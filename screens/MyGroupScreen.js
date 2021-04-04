import React, { useState, Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, FlatList } from 'react-native'
const methods = require('../MondgoDB/testClient');
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
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
    textAlign: 'center',
    //alignContent: 'center',
    //textAlign: 'center',
    justifyContent: 'center',
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
    songcontainer: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 0.2,
        paddingBottom: 5,
    },
  sampleGroupText: {
    alignContent: 'center',
    fontWeight: 'bold',
    fontSize: 20

  }
})

export default class MyGroupScreen extends Component {
    constructor() {
        super();
        this.state = {
            reload: false,
        }
        this.id = {
            _id: ""
        }
        this.title = "",
        this.bio = "",
            this.userList = [];
        this.myid = ""
    }
    componentDidMount() {
        AsyncStorage.getItem('userID')
            .then(result => {
                this.myid = result;
            })
            .catch(err => {
                console.log("fart");
            })
        AsyncStorage.getItem('GroupID')
            .then(result => {
                if (result != null) {
                    this.id._id = ("" + result);
                    methods.get_group((res) => {
                        // Fill data with stuff
                        if (res != null) {
                            this.title = res.title;
                            this.bio = res.bio;
                            for (var i = 0; i < res.users.length; i++) {
                                const userid = {
                                    _id: res.users[i]
                                };
                                methods.get_user(userid, res1 => {
                                    if (res1 != null && !(res1 === "post failed")) {
                                        this.userList.push(res1);
                                    }
                                    if (i == res.users.length) {
                                        this.setState({ reload: true });
                                    }
                                });
                            }
                        }
                    }, this.id);
                }
                else {
                    console.log("No Group Found");
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

    handleUserPress = (usersid) => {
        if (this.myid === usersid) {
            this.props.navigation.navigate("ProfileScreen");
        }
        else {
            this.props.navigation.navigate("OtherUserProfile", { uid: usersid })
        }
    }

    
    

    render = () => {
        const renderUser = ({ item }) => (
            <TouchableOpacity onPress={() => { this.handleUserPress.bind(this)(item._id) }}>
                <View style={styles.songcontainer}>
                    <Text style={styles.sampleGroupText}>{item.username}</Text>
                </View>
            </TouchableOpacity>
        )
        if (this.state.reload == true) {
            return (
                <View
                >
                    <View style={{ justifyContent: 'center', textAlign: 'center' }}>
                        <Text style={styles.title}>{this.title}</Text>

                        <Text style={styles.inputEmailPasswordBio}>{this.bio}</Text>


                        <Text style={styles.title}>Users</Text>
                        

                        <View>

                        </View>
                        <FlatList
                            data={this.userList}
                            renderItem={renderUser}
                            keyExtractor={(item, index) => item._id}
                        />
                    </View>
                </View>
            )
        }
        else {
            return (<Text> Loading </Text>);
        }
    }
}

