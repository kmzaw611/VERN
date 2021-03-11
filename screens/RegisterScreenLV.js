import React from 'react'
import { View, Button, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native'

const RegisterScreenLV = ({ navigation }) => {
  const onLogoutPress = () => navigation.navigate("StartScreen");
  const onNextPress = () => navigation.navigate("StartScreen")
  return (
    <View style ={styles.container}>
      <Text>Fill out your venue information:</Text>
      
      <TextInput style={styles.inputInfo}
        label="VenueName"
        placeholder="Venue Name"
      />
      <TextInput style={styles.inputInfo}
        label="Address"
        placeholder="Address"
      />
      <TextInput style={styles.inputInfo}
        label="City"
        placeholder="City"
      />
      <TextInput style={styles.inputInfo}
        label="State"
        placeholder="State"
      />
      <TextInput style={styles.inputInfo}
        label="Zip"
        placeholder="Zip Code"
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

export default RegisterScreenLV;
