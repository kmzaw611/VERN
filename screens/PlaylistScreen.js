import React from 'react'
import { Text, View, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native'

const PlaylistScreen = ({ route, navigation }) => {
  const { playlistId, playlistName } = route.params;
  let playlistData;
  let playlistImage;
  if (playlistId === 0) {
    playlistData = require("./test_json/top50campus_playlist.json");
    playlistImage = require("./assets/playlistCard1.jpg")
  }
  else if (playlistId === 1) {
    playlistData = require("./test_json/localartist_playlist.json");
    playlistImage = require("./assets/playlistCard2.jpg")
  }
  else if (playlistId === 2) {
    playlistData = require("./test_json/topsongs_playlist.json");
    playlistImage = require("./assets/playlistCard3.jpg")
  }
  else {
    playlistData = require("./test_json/faketest_playlist.json");
    playlistImage = require("./assets/playlistCard4.jpg")
  }

  const renderPlaylistSong = ({ item }) => (
    <TouchableOpacity style={styles.song}>
      <Text>{item.name}</Text>
      <Text>{item.duration}</Text>
      <Text>{item.artist}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <View style={styles.imagetitle_container}>
        <Image source={playlistImage} style={styles.playlistImage} />
        <Text style={styles.playlistTitle}>{playlistName}</Text>
        <TouchableOpacity style={styles.spotifyButton}>
          <Text style={styles.spotifyText}>Open in Spotify</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={playlistData}
        renderItem={renderPlaylistSong}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  imagetitle_container: {
    alignItems: 'center',
    marginTop: 20,
  },
  playlistImage: {
    width: 150,
    height: 150,
  },
  playlistTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 10,
    color: '#8e6f3e',
  },
  spotifyButton: {
    backgroundColor: '#8e6f3e',
    borderRadius: 15,
    padding: 10,
  },
  spotifyText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  song: {
    padding: 10,
    margin: 5,
  },
})

export default PlaylistScreen;
