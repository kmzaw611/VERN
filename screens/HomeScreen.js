import React from 'react'
import { Text, View, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'

const playlistData = require('./test_json/playlists.json');
const performanceData = require('./test_json/performances.json');
const groupsData = require('./test_json/groups.json')

const HomeScreen = ({ navigation }) => {

  const renderPlaylistItem = ({ item }) => (
    <TouchableOpacity
      delayPressIn={100}
      style={styles.playlistCard}
    >
      <Text style={styles.playlistTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderPerformanceItem = ({ item }) => (
    <TouchableOpacity
      delayPressIn={100}
      style={styles.performanceCard}
    >
      <Text>Location: {item.location}</Text>
      <Text>Date: {item.date}</Text>
      <Text>Time: {item.time}</Text>
      <Text>Artists: {item.artists.toString()}</Text>
    </TouchableOpacity>
  );

  const renderGroupItem = ({ item }) => (
    <TouchableOpacity
      delayPressIn={100}
      style={styles.groupCard}
    >
      <Text>Name: {item.name}</Text>
      <Text>Members: {item.num_members}</Text>
      <Text>Description: {item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView>
      <View style={styles.sectionContainer}>
        <Text style={styles.title}>Curated Playlists</Text>
        <View style={styles.horizontalRule}></View>
        <FlatList
          horizontal={true}
          data={playlistData}
          renderItem={renderPlaylistItem}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.title}>Live Performances</Text>
        <View style={styles.horizontalRule}></View>
        <FlatList
          horizontal={true}
          data={performanceData}
          renderItem={renderPerformanceItem}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.title}>Your Groups</Text>
        <View style={styles.horizontalRule}></View>
        <FlatList
          horizontal={true}
          data={groupsData}
          renderItem={renderGroupItem}
          keyExtractor={item => item.id}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  groupCard: {
    width: 250,
    height: 350,
    margin: 10,
    padding: 20,
    borderRadius: 25,
    backgroundColor: '#cfb991',
  },
  horizontalRule: {
    borderBottomColor: 'black',
    borderBottomWidth: 1.0,
    width: 250,
  },
  playlistCard: {
    width: 200,
    marginTop: 20,
    margin: 10,
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#cfb991',
    justifyContent: 'center',
  },
  performanceCard: {
    width: 250,
    height: 350,
    margin: 10,
    padding: 20,
    borderRadius: 25,
    backgroundColor: '#cfb991',
  },
  playlistTitle: {
    fontSize: 24,
    color: 'brown',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: '',
  },
  sectionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8e6f3e',
    textAlign: 'center',
  },

})

export default HomeScreen;
