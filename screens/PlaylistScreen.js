import React, { useEffect } from 'react'
import { Text, View, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native'
const methods = require('../MondgoDB/testClient');
//const prompt = require('prompt');
import Sound from 'react-native-sound';

data1 = {
    refreshToken: "AQCzVfJhvvDF8KvxRKP6ANQ_hfmYbqDdsVQ7XR0FlLlA4soBz6CnmK1HUIas6c9hQHpQ2sV_dDkfYApzJlVkoFMeyjsnVj7Kgdzzd4jG8OwUAbKvzPiVaM5ijhxRhkrdeLU"
}

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
  else if (playlistId === 2) { //here is for the linking between -> server for grabbing top_songs json
      playlistData = require("./test_json/topsongs_playlist.json");/*methods.top_songs(async function (result) {
          console.log("PlaylistScreen");
          console.log(result);
          console.log("PostPlaylistScreen");
      }, data1);*/
      playlistImage = require("./assets/playlistCard3.jpg")

  }
  else {
    playlistData = require("./test_json/faketest_playlist.json");
    playlistImage = require("./assets/playlistCard4.jpg")
  }



    playTrack = () => {
        const track = new Sound('https://p.scdn.co/mp3-preview/3eb16018c2a700240e9dfb8817b6f2d041f15eb1?cid=774b29d4f13844c495f206cafdad9c86', null, (e) => {
            if (e) {
                console.log('error loading track:', e)
            } else {
                console.log("playtest"),
                track.play()
            }
        })
    }
    /*
    let sound1;
    useEffect(() => {
        Sound.setCategory('Playback', true);
        return () => {
            if (sound1) sound1.release();
        };
    }, []);
    const audioList = [
        {
            url: 'https://p.scdn.co/mp3-preview/3eb16018c2a700240e9dfb8817b6f2d041f15eb1?cid=774b29d4f13844c495f206cafdad9c86',
        },
    ];
    const playSound = (sound_item) => {
        sound1 = new Sound(sound_item.url, (error, _sound) => {
            if (error) {
                alert('error' + error.message);
                return;
            }
            sound1.play(() => {
                sound1.release();
            });
        });
    };*/
    //style={styles.song} how is rendering done
    const renderPlaylistSong = ({ item }) => (
      <TouchableOpacity
            style={styles.song}
            //onPress={playTrack()}

      >
      <View style={styles.songcontainer}>
        <View>
          <Text style={styles.songtitle}>{item.title}</Text>
          <Text style={{color: 'gray'}}>{"Popularity: "+item.length}</Text>
        </View>
        <Text style={{marginLeft: "auto"}}>{item.artist}</Text>
      </View>
    </TouchableOpacity>
  );



    //FlatList how its used
  return (
    <View style={{flex: 1}}>
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
        keyExtractor={(item,index) => item.title}
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
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
  },
  songcontainer: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 0.2,
    paddingBottom: 5,
  },
  songtitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
})

export default PlaylistScreen;
