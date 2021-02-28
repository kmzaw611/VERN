import React from 'react'
import { Text, View, FlatList, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native'

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
      <Image
        source={require('./assets/placeholder.jpg')}
        style={styles.performanceImage}
      />
      <Text style={styles.performanceTitle}>Artists</Text>
      <Text style={styles.performanceDetail}>{item.artists.toString()}</Text>
      <Text style={styles.performanceTitle}>Location</Text>
      <Text style={styles.performanceDetail}>{item.location.toString()}</Text>
      <Text style={styles.performanceTitle}>Date</Text>
      <Text style={styles.performanceDetail}>{item.date.toString()}</Text>
      <Text style={styles.performanceTitle}>Time</Text>
      <Text style={styles.performanceDetail}>{item.time.toString()}</Text>
    </TouchableOpacity>
  );

  const renderGroupItem = ({ item }) => (
    <TouchableOpacity
      delayPressIn={100}
      style={styles.groupCard}
    >
      <Text style={styles.groupName}>{item.name}</Text>
      <Text style={styles.groupMembers}>{item.num_members} members</Text>
      <Image
        source={require('./assets/placeholder.jpg')}
        style={styles.groupImage}
      />
    </TouchableOpacity>
  );

  return (
    <ScrollView>
      <View style={styles.sectionContainer}>
        <Text style={styles.title}>Curated Playlists</Text>
        <FlatList
          numColumns={2}
          data={playlistData}
          renderItem={renderPlaylistItem}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.title}>Live Performances</Text>
        <FlatList
          horizontal={true}
          data={performanceData}
          renderItem={renderPerformanceItem}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.title}>Your Groups</Text>
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
    borderRadius: 75,
    marginTop: 20,
    margin: 10,
    padding: 20,
    backgroundColor: '#cfb991',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2.0,
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
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  sectionContainer: {
    justifyContent: 'center',
    margin: 10,
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8e6f3e',
    margin: 10,
    marginBottom: 5,
    fontFamily: 'sans-serif-condensed',
  },

})

export default HomeScreen;
