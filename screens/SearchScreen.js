import React from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Modal, TextInput, FlatList, Switch, ScrollView, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const methods = require('../MondgoDB/testClient');


export default class MyGroupScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reload: false,
            search: ""
        }
        this.groupList = [];
    }
    componentDidMount() {
        this.refresh_thing();
    }

    refresh_thing = () => {
        this.groupList.splice(0, this.groupList.length);
        this.groupList.push({
            _id: "000000",
            title: "No Groups Found"
        });
        this.setState({ reload: true });
    }

    handleButton = () => {
        const data = {title: this.state.search};
        this.groupList.splice(0, this.groupList.length);

        methods.get_groups((res) => {
            if (res != null) {
                for (var i = 0; i < res.length; i++) {
                    const res2 = res[i];
                    if (res2 != null) {
                        const dat = {   //Keep
                            _id: res2._id,
                            title: res2.title
                        }           
                        this.groupList.push(dat);   //keep
                    }
                    if (i == (res.length - 1))
                        this.setState({ reload: true }); //Keep
                }
                if (res.length == 0) {
                    this.groupList.push({
                        _id: "000000",
                        title: "No Groups Found"
                    });
                    this.setState({ reload: true });
                }
            }
            else {
                console.log("null received");
            }
        }, data);
    }

    onGroupPress = (groupID) => {
        this.props.navigation.navigate("MyGroupScreen",
            {
                refresh: this.refresh_thing.bind(this),
                id: groupID
            });
    }

    render = () => {
        const renderGroup = ({ item }) => (
            <TouchableOpacity onPress={() => { this.onGroupPress.bind(this)(item._id) }}
                style={styles.sampleGroup}>
                <Text style={styles.sampleGroupText}>{item.title}</Text>
            </TouchableOpacity>
        )
        if (this.state.reload === true) {
            return (
                <ScrollView>
                    <View>
                        <View style={styles.followButtonsContainer}>
                            <TextInput style={styles.inputEmailPassword}
                                label="searchbar"
                                placeholder="search"
                                value={this.state.search}
                                onChangeText={(newValue) => this.setState({ search: newValue })}
                            />
                            <TouchableOpacity style={styles.followButton}
                                onPress={() => { this.handleButton.bind(this)() }}>
                                <Text>search</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.title}>results</Text>
                                <SafeAreaView style={{ flex: 1 }}>
                                    <FlatList
                                        data={this.groupList}
                                        renderItem={renderGroup}
                                        keyExtractor={(item, index) => item._id}
                                    />
                                </SafeAreaView>
                    </View>
                </ScrollView>
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
        textAlign: 'center',
        justifyContent: 'center'
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
        padding: 10,
        margin: 5,
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
        padding: 15,
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