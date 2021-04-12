import React, { useState, Component } from 'react';
import { SafeAreaView,Text, StyleSheet, View, TouchableOpacity, Modal, TextInput, FlatList,Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const methods = require('../MondgoDB/testClient');
import QRCode from 'react-native-qrcode-svg';


const VenueScreen = ({ route, navigation }) => {
    const { venueId, venueName } = route.params;
    const [inputText, setInputText] = useState('');
    const [qrvalue, setQrvalue] = useState('');
    let userData;
    let id_u;

   // if (qrvalue = '') {
        AsyncStorage.getItem('userID')
            .then(result => {
                id_u = ("" + result);
                console.log(id_u);
                methods.get_user(id_u, (res) => {
                    userData = res;
                    console.log("b4: " + res);
                    //setQrvalue(res);
                    //console.log("after: " + qrvalue);
                });

            })
            .catch(err => {
                console.error(err);
            });
    //};
    //const [show,setCount] = React.useState(0)
    //this.state = { show: false };
    
    console.log(venueName);
    //const displayModal = () => {
    //    this.setState({isModalVisible})
    //};
    //setQrvalue()
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.titleStyle}>
                    Venue Check-IN
                </Text>
                <QRCode
                    //QR code value
                    value={"Check-in" + venueName}
                    //size of QR Code
                    size={250}
                    //Color of the QR Code (Optional)
                    color="black"
                    //Background Color of the QR Code (Optional)
                    backgroundColor="white"
                    //Logo of in the center of QR Code (Optional)
                   
                />
                
            </View>
        </SafeAreaView>
    );
};

    //STATE CHANGING IS NOT WORKING WITH FLATLIST

    /*
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
*/
//NEED TO DO NEXT -> ADD VENUE ITEMS ON PAGE FOR USERS TO INTERACT W/AND ADD TO + DB SUPP
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 10,
    },
    titleStyle: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    textStyle: {
        textAlign: 'center',
        margin: 10,
    },
    textInputStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    buttonStyle: {
        backgroundColor: '#51D8C7',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#51D8C7',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 30,
        padding: 10,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
});
/*
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
*/

export default VenueScreen;