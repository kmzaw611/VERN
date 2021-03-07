import React from 'react'
import { Text, View, FlatList, TouchableOpacity } from 'react-native'

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
    <TouchableOpacity>
      <Text>{item.name}</Text>
      <Text>{item.duration}</Text>
      <Text>{item.artist}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <Text>{playlistName}</Text>
      <FlatList
        data={playlistData}
        renderItem={renderPlaylistSong}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

export default PlaylistScreen;
