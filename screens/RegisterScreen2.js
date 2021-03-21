import React from 'react'
import { View, Switch, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native'

const RegisterScreen2 = ({ navigation }) => {
  const onLogoutPress = () => navigation.navigate("StartScreen");
  const onYesPress = () => navigation.navigate("RegisterLA")
  const onNoPress = () => navigation.navigate("Register3")

  return (
    <View style ={styles.container}>
      <Text>Are you a local artist?</Text> 
      <TouchableOpacity
        style={styles.yesButton}
        onPress={onYesPress}
      >
        <Text style={styles.logoutText}>Yes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.noButton}
        onPress={onNoPress}
      >
        <Text style={styles.logoutText}>No</Text>
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
  yesButton: {
    alignItems: 'center',
    backgroundColor: 'green',
    padding: 10,
    margin: 10,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
  noButton: {
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 10,
    margin: 10,
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

export default RegisterScreen2;
