import React, { useState } from 'react'
import { View, Button, StyleSheet, TouchableOpacity, Text, TextInput, CheckBox } from 'react-native'
const methods = require('../MondgoDB/testClient');

const ActualRegisterScreen = ({ navigation }) => {

  const [username, onChangeUsername] = useState("");
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [isLocalArtist, setIsLocalArtist] = useState(false);
  const [isLocalBusiness, setIsLocalBusiness] = useState(false);

  const onSignUpPress = () => {

    const newUser = {
      username: username,
      email: email,
      password: password,
      genre: "",
      color: "",
      bio: "",
      token: "",
      songID: "",
      isLocalArtist: isLocalArtist,
      isLocalBusiness: isLocalBusiness,
    };
    methods.create_user(function(result) {
      console.log("HIHI");
      console.log(result);
    }, newUser );
  }

  return (
    <View style ={styles.container}>
      <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 20,}}>REGISTER</Text>
      <View style={{marginBottom: 20,}}>
        <TextInput style={styles.inputInfo}
          label="username"
          placeholder="Enter your username"
          value={username}
          onChangeText={onChangeUsername}
        />
        <TextInput style={styles.inputInfo}
          label="email"
          placeholder="Enter your email"
          value={email}
          onChangeText={onChangeEmail}
        />
        <TextInput style={styles.inputInfo}
          label="password"
          placeholder="Enter your password"
          value={password}
          onChangeText={onChangePassword}
          secureTextEntry={true}
        />
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text>Are you a local artist?</Text>
        <CheckBox
          disabled={false}
          value={isLocalArtist}
          onValueChange={(newValue) => setIsLocalArtist(newValue)}
        />
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text>Are you a local business?</Text>
        <CheckBox
          disabled={false}
          value={isLocalBusiness}
          onValueChange={(newValue) => setIsLocalBusiness(newValue)}
        />
      </View>
      <TouchableOpacity
        style={styles.signUpButton}
        onPress={onSignUpPress}
      >
        <Text style={styles.signUpText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginTop: 30,
  },
  inputInfo: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#cfb991',
    width: 250,
    height: 40,
    margin: 5,
    color: 'black',
    borderRadius: 10,
    margin: 10,
  },
  signUpButton: {
    alignItems: 'center',
    backgroundColor: '#8e6f3e',
    padding: 10,
    margin: 10,
    marginTop: 20,
    marginBottom: 30,
    width: 150,
  },
  signUpText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
})

export default ActualRegisterScreen;
