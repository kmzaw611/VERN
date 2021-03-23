import React, { useState } from 'react'
import { View, Button, StyleSheet, TouchableOpacity, Text, TextInput, Alert } from 'react-native'
import Logo from './components/Logo'
const methods = require('../MondgoDB/testClient');
import AsyncStorage from '@react-native-async-storage/async-storage';

const StartScreen = ({ navigation }) => {

  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");

  const onLoginPress = () => {
    const loginInfo = {
      email: email,
      password: password,
    };
    methods.login_user(function(result) {
      console.log(result);
      if (result === "No User With Email") {
        Alert.alert(
          "Invalid Email",
          "There is no VERN account with the email you entered. Please try another.",
          [
            { text: "OK" }
          ]
        );
      }
      else if (result === "Incorrect Password") {
        Alert.alert(
          "Incorrect Password",
          "The password you have entered is incorrect. Please try again.",
          [
            { text: "OK" }
          ]
        );
      }
      else if (result.message === "Valid Sign In") {
        // Update local storage => isLoggedIn: true and userID: user._id
        const userID = result.userID;
        const storeLoginInfo = async () => {
          try {
            console.log("Starting AsyncStorage")
            await AsyncStorage.setItem('isLoggedIn', 'true');
            await AsyncStorage.setItem('userID', userID);
            console.log("Successful AsyncStorage operation")
          } catch (err) {
            console.log(err);
          }
        }
        storeLoginInfo();
        // Send user to landing page if he has successfully logged in
        navigation.navigate("Landing");
      }
    }, loginInfo );

  }
  const onRegisterPress = () => navigation.navigate("Register");
  const onActualRegisterPress = () => navigation.navigate("ActualRegister")

  return (
    <View style={styles.container}>
      <Logo />
      <TextInput style={styles.inputEmailPassword}
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={onChangeEmail}
      />
      <TextInput style={styles.inputEmailPassword}
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={onChangePassword}
        secureTextEntry={true}
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
      <TouchableOpacity
        onPress={onActualRegisterPress}>
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
