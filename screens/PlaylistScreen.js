import React from 'react'
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native'

const PlaylistScreen = ({ route, navigation }) => {
  const { playlistId, playlistName } = route.params;
  let playlistData;
  if (playlistId === 0) {
    playlistData = require("./test_json/top50campus_playlist.json");
  }
  else if (playlistId === 1) {
    playlistData = require("./test_json/localartist_playlist.json");
  }
  else if (playlistId === 2) {
    playlistData = require("./test_json/topsongs_playlist.json");
  }
  else {
    playlistData = require("./test_json/faketest_playlist.json");
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
      <Text style={styles.playlistTitle}>{playlistName}</Text>
      <FlatList
        data={playlistData}
        renderItem={renderPlaylistSong}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  playlistTitle: {
    fontSize: 20,
    padding: 15,
  },
  song: {
    padding: 10,
    margin: 5,
  },
})

export default PlaylistScreen;
