import React, { useState } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Switch, SafeAreaView } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';

const EditScreen = ({ navigation }) => {
  const userData = require("./test_json/fake_user.json")[0];
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  //handleSave = () => { => navigation.navigate("ProfileScreen");
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.nameinfo}>
      <Text style={styles.name}>Edit Your Profile</Text>
    </View>

    <View style={styles.biocontainer}>
      <Text style={{fontSize: 18, fontWeight: 'bold',}}>Name:</Text>
      <TextInput style={{fontSize: 16, textAlign: 'justify', borderWidth: 1, width: 200}}
      //onChangeText={(val) => nname = val}
      >
      </TextInput>
    </View>

    <View style={styles.biocontainer}>
      <Text style={{fontSize: 18, fontWeight: 'bold',}}>Favorite Genre:</Text>
      <TextInput style={{fontSize: 16, textAlign: 'justify', borderWidth: 1, width: 200}}></TextInput>
    </View>

    <View style={styles.biocontainer}>
      <Text style={{fontSize: 18, fontWeight: 'bold',}}>Favorite Song:</Text>
      <TextInput style={{fontSize: 16, textAlign: 'justify', borderWidth: 1, width: 200}}></TextInput>
    </View>

    <View style={styles.biocontainer}>
      <Text style={{fontSize: 18, fontWeight: 'bold',}}>Bio:</Text>
      <TextInput style={{fontSize: 16, textAlign: 'justify', borderWidth: 1, width: 250, height: 100}}></TextInput>
    </View>

    <TouchableOpacity
    //onPress = {() => handleSave(this)}
    >
    <Text style={{fontSize: 18}}>Save Profile</Text>
    </TouchableOpacity>

  </SafeAreaView>
      
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  biocontainer: {
    margin: 10,
    marginBottom: 20,
  },
  logoutButton: {
    alignItems: 'center',
    backgroundColor: '#8e6f3e',
    padding: 10,
    margin: 10,
    marginTop: 5,
    marginBottom: 30,
    borderRadius: 10,
  },
  logoutText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  followButtonsContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 40,
  },
  followButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0095ff',
    borderRadius: 10,
    padding: 15,
    margin: 10,
  },
  followText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  nameinfo: {
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 15,
    borderColor: 'gray',
    margin: 20,
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
    alignSelf: 'center',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infotitle: {
    fontSize: 14,
  },
  infodata: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    fontSize: 16,
    textAlign: 'justify',
    borderWidth: 1,
    padding: 1,
    margin: 1,
    borderColor: 'black',


  },
})
export default EditScreen;
