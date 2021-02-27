import React from 'react'
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native'

const playlistTitles = [
  {
    id: '1',
    title: 'Top 50 This Week on Campus',
  },
  {
    id: '2',
    title: 'Local Artist Corner',
  },
  {
    id: '3',
    title: 'Playlist #3',
  },
  {
    id: '4',
    title: 'Playlist #4',
  },
  {
    id: '5',
    title: 'Playlist #5',
  },
];

const HomeScreen = ({ navigation }) => {

  const renderPlaylistItem = ({ item }) => (
    <TouchableOpacity
      delayPressIn={100}
      style={styles.playlistCard}
    >
      <Text style={styles.playlistTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <View style={styles.sectionContainer}>
        <Text style={styles.title}>Curated Playlists</Text>
        <View style={styles.horizontalRule}></View>
        <FlatList
          horizontal={true}
          data={playlistTitles}
          renderItem={renderPlaylistItem}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.title}>Live Performances</Text>
        <View style={styles.horizontalRule}></View>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.title}>Statistics</Text>
        <View style={styles.horizontalRule}></View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
  playlistTitle: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
  },
  sectionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8e6f3e',
    textAlign: 'center',
  },

})

export default HomeScreen;
