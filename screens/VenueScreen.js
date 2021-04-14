import React, { useState, Component } from 'react';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity, Modal, TextInput, FlatList, Button, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const methods = require('../MondgoDB/testClient');
import QRCode from 'react-native-qrcode-svg';
//import { useModal } from "react-native-use-modal-hooks";


const VenueScreen = ({ route, navigation }) => {
    const { venueId, venueName } = route.params;
    //const [inputText, setInputText] = useState('');
    const [qrvalue, setQrvalue] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
      /*  //useModal(() => (
        <Modal
            animationType="slide"
            transparent={true}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Rate!</Text>

                    <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                        onPress={hideModal}
                    >
                        <Text style={styles.textStyle}>Hide Modal</Text>
                    </TouchableHighlight>
                </View>
            </View>

        </Modal>
        ))*/
        
            //let userData = "meep";
    let id_u = {
        _id: ""
    };
    //console.log(route);
    //console.log(navigation);
   // if (qrvalue = '') {
        AsyncStorage.getItem('userID')
            .then(result => {
                id_u._id = ("" + result);
                //console.log(id_u);
                methods.get_user(id_u, (res) => {
                    //userData = res.username;
                    //console.log("b4: " + qrvalue);
                    setQrvalue(res.username);
                    
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
    
    //console.log(venueName);
    //const displayModal = () => {
    //    this.setState({isModalVisible})
    //};
    //setQrvalue()
    return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.venuetitle}>{venueName}</Text>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(!modalVisible)}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                        <Text style={styles.modalText}>Check-in Code</Text>

                        <QRCode
                            //QR code value
                            value={"Check-in " + venueName + " " + qrvalue}
                            //size of QR Code
                            size={150}
                            //Color of the QR Code (Optional)
                            color="black"
                            //Background Color of the QR Code (Optional)
                            backgroundColor="white"
                        //Logo of in the center of QR Code (Optional)

                        />


                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Close</Text>

                        </TouchableHighlight>

                    </View>

                </View>


            </Modal>


                <Button
                    title="Venue Check-In"
                    onPress={() => setModalVisible(true)}
                />
                    
               
                
            </View>

    );
};

    //STATE CHANGING IS NOT WORKING WITH FLATLIST

    /* 
     * <QRCode
                    //QR code value
                    value={"Check-in " + venueName + " " + qrvalue}
                    //size of QR Code
                    size={250}
                    //Color of the QR Code (Optional)
                    color="black"
                    //Background Color of the QR Code (Optional)
                    backgroundColor="white"
                    //Logo of in the center of QR Code (Optional)
                   
                />
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TouchableOpacity
                        style={{ backgroundColor: "#ffffff", margin: 40, padding: 20, borderRadius: 5, flex: 1 }}
                        onPress={hideModal}
                        >

                        <Text style={{ color: 'brown', marginTop: 15, fontSize: 14, fontWeight: 'bold', marginLeft: 15, textAlign: 'center', }}>Done</Text>


                    </TouchableOpacity>
                </View>
            </View>

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^important


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
        //justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 10,
    },
    titleStyle: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    textStyle: {
        textAlign: 'center',
        margin: 15,
    },
    textInputStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    venuetitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
        padding: 30
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        flex:1,
        margin: 40,
        backgroundColor: "white",
        borderRadius: 5,
        padding: 80,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 200

    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginTop: -70,
        marginBottom: 15,
        textAlign: "center",
        fontSize: 18,
        fontWeight: 'bold'
    }
    
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