
import React, { useState, Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, FlatList, TextInput, ScrollView, Modal } from 'react-native'
const methods = require('../MondgoDB/testClient');
import AsyncStorage from '@react-native-async-storage/async-storage';



export default class MyGroupScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            reload: false,
            title: "",
            content: ""
        }
        this.tid = {
            threadID: ""
        }
        this.header = "";
        this.postList = [];
        this.myid = "";
        this.myusername = "";
        this.permissions = false;
    }
    componentDidMount() {
        //Get key information here
        AsyncStorage.getItem('userID')
            .then(result => {
                this.myid = result;
                methods.get_user({ _id: this.myid }, res1 => {
                    if (res1 != "Server: No User Found" && !(res1 === "post failed")) {
                        this.myusername = res1.username;
                        this.tid.threadID = this.props.route.params.threadID;
                        this.header = this.props.route.params.header;
                        this.permissions = this.props.route.params.permissions;
                        this.refresh_thing();
                    }
                    else {
                        console.log(res1);
                    }
                });
            })
            .catch(err => {
                console.log("notFound");
            })
    }

    refresh_thing = () => {
        this.postList.splice(0, this.postList.length);
        //Get thread or create it if it doesnt exist
        methods.create_thread((res) => {
            if (res != null) {
                //Populate postList
                for (var i = 0; i < res.posts.length; i++) {
                    this.postList.push(res.posts[i]);
                    if (i == res.posts.length - 1)
                        this.setState({ reload: true });
                }
                if (res.posts.length == 0) {
                    this.postList.push({
                        username: "",
                        time: "",
                        title: "Be the first to create a post!",
                        content: ""
                    });
                    this.setState({ reload: true });
                }
            }
        }, { threadID: this.tid.threadID, threadTitle: ("Thread: " + this.tid.threadID) });
    }

    add_post = () => {
        var postjson = {
            threadID: this.tid.threadID,
            username: this.myusername,
            time: Date().toLocaleLowerCase(),
            title: this.state.title,
            content: this.state.content
        };
        console.log(postjson);
        methods.make_post(result => {
            console.log(result);
            if (result != null && result != "Server Error: No thread found here") {
                console.log("Lit");
                this.refresh_thing();
            }
        }, postjson);
    }


    render = () => {
        const renderPost = ({ item }) => (
            <View style={{ flex: 1, alignContent: 'center', borderBottomWidth: 5, borderColor: '#8e6f3e', paddingBottom: 20 }}>
                <View style={styles.followButtonsContainer2}>
                    <Text style={{ color: 'gray', fontSize: 15 }}>{item.username}</Text>
                    <Text style={{ color: 'gray' }}>{item.time}</Text>
                </View>
                <View>
                    <Text style={{ fontWeight: 'bold', fontSize: 22, alignContent: 'center' }}>{item.title}</Text>
                    <Text style={{ fontSize: 18}}>{item.content}</Text>
                </View>
            </View>
        )
        if (this.state.reload == true) {
            return (
                <View style={{ justifyContent: 'center', textAlign: 'center', paddingBottom: 5 }}>
                    <Text style={styles.title}>{this.header}</Text>

                    <Modal
                        transparent={true}
                        visible={this.state.show}
                    >
                        <View style={{ backgroundColor: "#000000aa", flex: 1 }}
                        >
                            <View style={{ backgroundColor: "#ffffff", margin: 50, padding: 40, borderRadius: 10, flex: 1 }}>
                                <Text style={styles.title}>Create a Post</Text>

                                <TextInput
                                    style={styles.inputEmailPassword}
                                    label="Post Title"
                                    placeholder="Title"
                                    value={this.state.title}
                                    onChangeText={(newValue) => this.setState({ title: newValue })}
                                />

                                <TextInput style={styles.inputEmailPasswordBio}
                                    label="Post Content"
                                    placeholder="Content"
                                    value={this.state.content}
                                    onChangeText={(newValue) => this.setState({ content: newValue })}
                                />

                                <TouchableOpacity onPress={() => {
                                    this.add_post.bind(this)();
                                    this.setState({ show: false });
                                }}>
                                    <Text style={{ color: 'brown', marginTop: 15, fontSize: 14, fontWeight: 'bold', marginLeft: 15, textAlign: 'center' }}>Done</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    this.setState({ show: false });
                                }}>
                                    <Text style={{ color: 'brown', marginTop: 10, fontSize: 14, fontWeight: 'bold', marginLeft: 15, textAlign: 'center' }}>Cancel</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </Modal>

                    <View style={styles.followButtonsContainer}>
                        {
                            this.permissions ?
                                <TouchableOpacity
                                    style={styles.followButton}
                                    onPress={() => { this.setState({ show: true }) }}>
                                    <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold' }}>Add Post</Text>
                                </TouchableOpacity>
                            : null
                        }
                        <TouchableOpacity
                            style={styles.followButton}
                            onPress={() => { this.refresh_thing.bind(this)() }}>
                            <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold' }}>Refresh</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={{ borderWidth: 5, borderColor: 'black', maxHeight: '85%', marginHorizontal: '5%' }}>
                        <FlatList
                            data={this.postList}
                            renderItem={renderPost}
                            keyExtractor={(item, index) => item._id}
                        />
                    </ScrollView>
                    <View>
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
    followButtonsContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 10,
    },
    followButtonsContainer2: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 10,
    },
    followButton: {
        textAlign: 'center',
        color: 'black',
        backgroundColor: '#8e6f3e',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#8e6f3e',
        margin: 10,
        marginBottom: 5,
        fontFamily: 'sans-serif-condensed',
        textAlign: 'center'
    }
})