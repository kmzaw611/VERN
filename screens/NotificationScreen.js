import React from 'react'
import {Text, StyleSheet, View, TouchableOpacity, Modal, TextInput, Image, Button, Alert, ScrollView} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class NotificationSceen extends React.Component {
  constructor() 
      {
        super();
        this.state={
          show: false,
            names: [],
            reload: false,
            title: "",
            bio: "",
            anchor: ""
          }
     }

  render() {
    return (
      <ScrollView>
        <TouchableOpacity>
        <TouchableOpacity style={{borderRadius: 3, padding: 15, margin: 10, borderWidth: 4, backgroundColor: 'blue'}}>
           <Text style={{color: 'white', fontWeight: 'bold'}}>Sample Notification</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </ScrollView>
  
    )
  }
  }
  

const styles = StyleSheet.create({
  inputEmailPassword: {
    width: 300,
    height: 125,
    margin: 10,
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
biocontainer2: {
  margin: 100,
  marginBottom: 20,
  alignItems: 'center'
},
followButton: {
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#0095ff',
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
  sampleGroupText: {
    alignContent: 'center',
    fontWeight: 'bold',
    fontSize: 20

  }
})

//export default LocalArtistProfile;
