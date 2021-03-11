import React from 'react'
import { View, Button, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native'

const RegisterScreen = ({ navigation }) => {
  const onLogoutPress = () => navigation.navigate("StartScreen");
  const onNextPress = () => navigation.navigate("Register2")
  return (
    <View style ={styles.container}>
      <Text>REGISTER</Text>
      
      <TextInput style={styles.inputInfo}
        label="Name"
        placeholder="Full Name"
      />
      <TextInput style={styles.inputInfo}
        label="Email"
        placeholder="School Email"
      />
      <TextInput style={styles.inputInfo}
        label="Password"
        placeholder="Password"
      />
      <TextInput style={styles.inputInfo}
        label="RePassword"
        placeholder="Re-enter password"
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

export default RegisterScreen;
