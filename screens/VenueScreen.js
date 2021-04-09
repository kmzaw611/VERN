import React, { useState, Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Modal, TextInput, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const methods = require('../MondgoDB/testClient');

const VenueScreen = ({ route, navigation }) => {
    const { venueId, venueName } = route.params;
    console.log(venueName);
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View>
                <Text style={styles.venuetitle}>{venueName}</Text>
            </View>
       
         
        </View>
    )

}




const styles = StyleSheet.create({
    venuetitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
})

export default VenueScreen;