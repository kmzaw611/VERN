import React from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Modal, TextInput, FlatList, Switch, ScrollView, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const methods = require('../MondgoDB/testClient');



export default class LocalArtistScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            reload: false
        }
        this.showTitle = "No Local Artists";
        this.id = {
            _id: ""
        };
        this.lid = {
            creatorID: ""
        };
        this.localList = [];
    }

    componentDidMount() {
        AsyncStorage.getItem('userID')
            .then(result => {
                this.id._id = ("" + result);
                this.refresh_thing();
            })
            .catch(err => {
                console.error(err);
            });
    }

    refresh_thing = () => {
        this.localList.splice(0, this.localList.length);
        methods.get_list((res) => {
            console.log(res)
            if (res != null && res != "") {
                for (var i = 0; i < res.length; i++) {
                    this.lid.creatorID = res[i];
                    methods.get_local((res2) => {
                        if (res2 != null) {
                            const dat = {
                                creatorID: res2.creatorID,
                                name: res2.name
                            }
                            this.localList.push(dat);
                        }
                        if (i == res.length)
                            this.setState({ reload: true });
                    }, this.lid);
                }
                if (res.length == 0) {
                    this.localList.push({
                        creatorID: "000000",
                        name: "No Artists Found"
                    });
                    this.setState({ reload: true });
                }
            }
            else {
                this.localList.push({
                    creatorID: "000000",
                    name: "No Artists Found"
                });
                this.setState({ reload: true });
                console.log("no artists found");
            }
        });
    }

    onLocalPress = (lID) => {
        this.props.navigation.navigate("LocalArtistProfile", { localID: lID });
    }

    render() {
        const renderLocal = ({ item }) => (
            <TouchableOpacity onPress={() => { this.onLocalPress.bind(this)(item.creatorID) }}
                style={styles.sampleGroup}>
                <Text style={styles.sampleGroupText}>{item.name}</Text>
            </TouchableOpacity>
        )
        if (this.state.reload === true) {
            return (
                <ScrollView>
                    <View>
                        <Text style={styles.title}>Local Artists</Text>
                        <TouchableOpacity style={styles.followButton}
                            onPress={() => { this.refresh_thing.bind(this)() }}>
                            <Text style={{ fontWeight: 'bold' }}>refresh</Text>
                        </TouchableOpacity>
                        <SafeAreaView style={{ flex: 1 }}>
                            <FlatList
                                data={this.localList}
                                renderItem={renderLocal}
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
    followButton: {
        alignItems: 'center',
        backgroundColor: '#cfb991',
        borderRadius: 10,
        padding: 10,
        margin: 5,
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
        padding: 15,
        margin: 20
    },
    sampleGroupText: {
        alignContent: 'center',
        fontWeight: 'bold',
        fontSize: 20

    }
})
