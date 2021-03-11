import React from 'react'
import { View, Button, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native'

const RegisterScreenLA = ({ navigation }) => {
  const onLogoutPress = () => navigation.navigate("StartScreen");
  const onNextPress = () => navigation.navigate("Register3")
  return (
    <View style ={styles.container}>
      <Text>Fill out your artist information:</Text>
      
      <TextInput style={styles.inputInfo}
        label="ArtistName"
        placeholder="Artist Name"
      />
      <TextInput style={styles.inputInfo}
        label="Genre1"
        placeholder="Primary Genre"
      />
      <TextInput style={styles.inputInfo}
        label="Genre2"
        placeholder="Secondary Genre"
      />
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={onNextPress}
      >
        <Text style={styles.logoutText}>Next</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  logoutButton: {
    alignItems: 'center',
    backgroundColor: 'green',
    padding: 10,
    margin: 50,
    marginTop: 20,
    marginBottom: 100,
    borderRadius: 10,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  inputInfo: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 40,
    margin: 20,
    backgroundColor: '#cfb991',
    color: 'black',
    borderRadius: 10,
    
  }
   
})

export default RegisterScreenLA;
