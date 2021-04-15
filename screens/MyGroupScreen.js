
import React, { useState, Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, FlatList, TextInput } from 'react-native'
const methods = require('../MondgoDB/testClient');
import AsyncStorage from '@react-native-async-storage/async-storage';



export default class MyGroupScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reload: false,
            pass: ""
        }
        this.gid = {
            _id: ""
        }
        this.inGroup = false,
        this.title = "",
        this.bio = "",
        this.userList = [];
        this.myid = ""
        this.private = false;
    }
    componentDidMount() {
        AsyncStorage.getItem('userID')
            .then(result => {
                this.myid = result;
            })
            .catch(err => {
                console.log("notFound");
            })
        this.gid._id = this.props.route.params.id;
        this.refresh_thing();
    }

    refresh_thing = () => {
        this.userList.splice(0, this.userList.length);
        this.inGroup = false;
        methods.get_group((res) => {
            if (res != null) {
                this.title = res.title;
                this.bio = res.bio;
                this.private = res.private;
                for (var i = 0; i < res.users.length; i++) {
                    const userid = {
                        _id: res.users[i]
                    };
                    if (userid._id === this.myid)
                        this.inGroup = true;
                    methods.get_user(userid, res1 => {
                        if (res1 != "Server: No User Found" && !(res1 === "post failed")) {
                            this.userList.push(res1);
                        }
                        if (i == res.users.length) {
                            this.setState({ reload: true });
                        }
                    });
                }
                if (res.users.length == 0)
                    this.setState({ reload: true });
            }
        }, this.gid);
    }

    handleUserPress = (usersid) => {
        if (this.myid === usersid) {
            this.props.navigation.navigate("ProfileScreen");
        }
        else {
            this.props.navigation.navigate("OtherUserProfile", { uid: usersid })
        }
    }

    handleButton = () => {
        const data = {
                _id: this.gid._id,
                userID: this.myid
        }
        if (this.inGroup) {
            methods.group_remove(res => {
                if (res != null && res != "User is not in this group")
                    this.refresh_thing();
                this.props.route.params.refresh();
                this.props.navigation.goBack();
            }, data);
        }
        else {
            if (this.private) {
                const stuff = {
                    _id: this.gid._id,
                    password: this.state.pass
                };
                methods.group_access(result => {
                    if (result === "SUCCESS") {
                        methods.group_add((res) => {
                            if (res != null)
                                this.refresh_thing();
                            this.props.route.params.refresh();
                            this.props.navigation.goBack();
                        }, data);
                    }
                }, stuff);
            }
            else {
                methods.group_add((res) => {
                    if (res != null)
                        this.refresh_thing();
                    this.props.route.params.refresh();
                    this.props.navigation.goBack();
                }, data);
            }
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

                        {
                            (this.private && !this.inGroup) ?
                                <TextInput
                                    style={styles.inputEmailPassword}
                                    label="Password"
                                    placeholder="Please enter the password"
                                    value={this.state.pass}
                                    onChangeText={(newValue) => this.setState({ pass: newValue })}
                                /> : null
                        }

                        <View style={styles.followButtonsContainer}>
                            <TouchableOpacity
                                style={styles.followButton}
                                onPress={() => { this.handleButton.bind(this)() }}
                            >
                                {
                                    this.inGroup ?
                                        <Text style={styles.followText}>Leave Group</Text>
                                        :
                                        <Text style={styles.followText}>Join Group</Text>
                                }
                            </TouchableOpacity>

                        </View>

                        <Text style={styles.title}>Users</Text>
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
    alignContent: 'center',
    textAlign: 'center',
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