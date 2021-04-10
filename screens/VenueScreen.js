import React, { useState, Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Modal, TextInput, FlatList,Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const methods = require('../MondgoDB/testClient');

const VenueScreen = ({ route, navigation }) => {
    const { venueId, venueName } = route.params;

    //const [show,setCount] = React.useState(0)
    //this.state = { show: false };

    console.log(venueName);
    //const displayModal = () => {
    //    this.setState({isModalVisible})
    //};


    //STATE CHANGING IS NOT WORKING WITH FLATLIST


    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.venuetitle}>{venueName}</Text>
            </View>
            <TouchableOpacity onPress={() => {}}>
                <Text style={styles.minititle}>Rate</Text>
            </TouchableOpacity>

           












             
        </View>




    );

}

//NEED TO DO NEXT -> ADD VENUE ITEMS ON PAGE FOR USERS TO INTERACT W/AND ADD TO + DB SUPP


const styles = StyleSheet.create({
    venuetitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    ReviewButton: {
        alignItems: 'center',
        backgroundColor: '#8e6f3e',
        padding: 10,
        margin: 10,
        marginTop: 5,
        marginBottom: 30,
        borderRadius: 10,
    },
    minititle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#8e6f3e',
        margin: 10,
        marginBottom: 5,
        fontFamily: 'sans-serif-condensed',
    },
})

export default VenueScreen;