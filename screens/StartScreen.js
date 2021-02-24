import React from 'react'
import { View, Button, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native'
import Logo from './components/Logo'

const StartScreen = ({ navigation }) => {
  const onLoginPress = () => navigation.navigate("Landing");

  return (
    <View style={styles.container}>
      <Logo />
      <TextInput style={styles.inputEmailPassword}
        label="Email"
        placeholder="Email"
      />
      <TextInput style={styles.inputEmailPassword}
        label="Password"
        placeholder="Password"
      />
      <TouchableOpacity
        style={styles.loginButton}
        onPress={onLoginPress}
      >
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.forgotPasswordRegister}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.forgotPasswordRegister}>Register</Text>
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
  forgotPasswordRegister: {
    color: 'brown',
  },
  inputEmailPassword: {
    width: 200,
    height: 40,
    margin: 5,
    backgroundColor: '#cfb991',
    color: 'black',
    borderRadius: 10,
  },
  loginButton: {
    alignItems: 'center',
    backgroundColor: '#8e6f3e',
    padding: 10,
    margin: 10,
    marginTop: 20,
    marginBottom: 30,
    borderRadius: 10,
  },
  loginText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },

})

export default StartScreen
