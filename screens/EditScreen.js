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
      <Text style={styles.title}>Edit Your Profile</Text>
    </View>

    <View style={styles.biocontainer}>
      <Text style={styles.minititle}>Name:</Text>
      <TextInput style={styles.inputEmailPassword}
                label="Name"
                placeholder="Name"
                //value={email}
                //onChangeText={onChangeEmail}
              />
    </View>

    <View style={styles.biocontainer}>
      <Text style={styles.minititle}>Favorite Genre:</Text>
      <TextInput style={styles.inputEmailPassword}
                label="Favorite Genre"
                placeholder="Favorite Genre"
                //value={email}
                //onChangeText={onChangeEmail}
              />
    </View>

    <View style={styles.biocontainer}>
      <Text style={styles.minititle}>Favorite Song:</Text>
      <TextInput style={styles.inputEmailPassword}
                label="Favorite Song"
                placeholder="Favorite Song"
                //value={email}
                //onChangeText={onChangeEmail}
              />
    </View>

    <View style={styles.biocontainer}>
      <Text style={styles.minititle}>Bio:</Text>
      <TextInput style={styles.inputEmailPasswordBio}
                label="Bio"
                placeholder="Bio"
                //value={email}
                //onChangeText={onChangeEmail}
              />
    </View>

    <TouchableOpacity
    //onPress = {() => handleSave(this)}
    >
    <Text style={{color: 'brown', marginLeft: 10, fontSize: 14, fontWeight: 'bold', marginLeft: 15,}}>Save Profile</Text>
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
  inputEmailPassword: {
    width: 225,
    height: 40,
    margin: 5,
    backgroundColor: '#cfb991',
    color: 'black',
    borderRadius: 10,
    textAlign: 'center'
  },
  inputEmailPasswordBio: {
    width: 225,
    height: 100,
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
export default EditScreen;
