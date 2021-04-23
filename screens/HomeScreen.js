import React, { useState, Component } from 'react'
import { Text, View, FlatList, StyleSheet, TouchableOpacity, ScrollView, Image,
    ImageBackground
} from 'react-native'
const methods = require('../MondgoDB/testClient');
//import { ModalProvider } from "react-native-use-modal-hooks";

import AsyncStorage from '@react-native-async-storage/async-storage';
const playlistData = require('./test_json/playlists.json');
const performanceData = require('./test_json/performances.json');

export default class ProfileScreen extends Component {
  constructor() {
      super();
      this.state = {
          dataIsReturned: false,
      };
      this.id = {
          _id: ""
      };
      this.playlistData = require('./test_json/playlists.json');
      this.performanceData = require('./test_json/performances.json');
      this.groupsData = [];
  }

  componentDidMount() {
      AsyncStorage.getItem('userID')
          .then(result => {
              this.id._id = ("" + result);
              methods.get_user(this.id, (res) => {
                  const userData = res;
                  const groups = userData.groups;
                  /*
                  if (groups.length === 0) {
                    const currGroup = {
                      id: 0,
                      name: "You have no groups.",
                      num_members: 0,
                    }
                    this.groupsData.push(currGroup);
                  }
                  else {
                    // Parse data of groups into groupsData with title, numUsers
                    for (var i = 0; i < groups.length; i++) {
                      const currGroup = {
                        id: i,
                        name: groups[i].title,
                        num_members: groups[i].numUsers,
                      }
                      this.groupsData.push(currGroup);
                    }
                  }
                  */
                  //console.log("GroupsData 1st: " + this.groupsData[0].name);
                  this.setState({ dataIsReturned: true });
              });
          })
          .catch(err => {
              console.error(err);
          });
  }

  playlistImages = [
    require('./assets/playlistCard1.jpg'),
    require('./assets/playlistCard2.jpg'),
    require('./assets/playlistCard3.jpg'),
    require('./assets/playlistCard4.jpg'),
  ]

  getPlaylistScreen = index => () => {
    let playlistId = index;
    let playlistName;
    if (index === 0) {
      playlistName = "Top 50 This Week on Campus";
    }
    else if (index === 1) {
      playlistName = "Local Artist Corner";
    }
    else if (index === 2) {
      playlistName = "Your Top Songs";
    }
    else {
      playlistName = "Playlist #4";
    }

    this.props.navigation.navigate("Playlist", {
      playlistId: playlistId,
      playlistName: playlistName,
    })
    }
    getVenueScreen = index => () => {
        let venueId = index;
        let venueName;
        if (index === 0) {
            venueName = "Hillenbrand Hall";
        }
        else if (index === 1) {
            venueName = "Earhart Hall";
        }
        else if (index === 2) {
            venueName = "Elliot Concert Hall";
        }
        else {
            venueName = "Purdue Hotel UwU";
        }

        this.props.navigation.navigate("VenueScreen", {
            venueId: venueId,
            venueName: venueName,
        })
    }
   

  renderPlaylistItem = ({ item, index }) => (
    <TouchableOpacity
      delayPressIn={100}
      style={styles.playlistCard}
      onPress={this.getPlaylistScreen(index)}
    >
      <ImageBackground
        source={this.playlistImages[item.id-1]}
        style={styles.playlistImage}
      >
        <View style={styles.tintDarkContainer}>
          <Text style={styles.playlistTitle}>{item.title}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  renderPerformanceItem = ({ item, index }) => (
    <TouchableOpacity
          delayPressIn={100}
          style={styles.performanceCard}
          onPress={this.getVenueScreen(index)}
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

  renderGroupItem = ({ item }) => (
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

  render() {
    if (this.state.dataIsReturned === true) {
      return (
        <ScrollView>
          <View style={styles.sectionContainer}>
            <Text style={styles.title}>Curated Playlists</Text>
            <FlatList
              numColumns={2}
              data={this.playlistData}
              contentContainerStyle={{justifyContent: 'center',}}
              renderItem={this.renderPlaylistItem}
              keyExtractor={item => item.id}
            />
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.title}>Live Performances</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("Local Artists")}>
              <Text style={{color: 'brown', marginLeft: 10, fontSize: 14, fontWeight: 'bold', marginLeft: 15,}}>See all local artists </Text>
            </TouchableOpacity>
            <FlatList
              horizontal={true}
              data={this.performanceData}
              renderItem={this.renderPerformanceItem}
              keyExtractor={item => item.id}
            />
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.title}>Your Groups</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("Groups")}>
              <Text style={{color: 'brown', marginLeft: 10, fontSize: 14, fontWeight: 'bold', marginLeft: 15,}}>See all groups </Text>
            </TouchableOpacity>
            <FlatList
              horizontal={true}
              data={this.groupsData}
              renderItem={this.renderGroupItem}
              keyExtractor={item => item.id}
            />
          </View>

        </ScrollView>
      )
    }
    else {
      return (<Text> Loading </Text>);
    }
  }
}

/*
const HomeScreen = ({ navigation }) => {
  const playlistImages = [
    require('./assets/playlistCard1.jpg'),
    require('./assets/playlistCard2.jpg'),
    require('./assets/playlistCard3.jpg'),
    require('./assets/playlistCard4.jpg'),
  ]
  const renderPlaylistItem = ({ item, index }) => (
    <TouchableOpacity
      delayPressIn={100}
      style={styles.playlistCard}
      onPress={getPlaylistScreen(index)}
    >
      <ImageBackground
        source={playlistImages[item.id-1]}
        style={styles.playlistImage}
      >
        <View style={styles.tintDarkContainer}>
          <Text style={styles.playlistTitle}>{item.title}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  getPlaylistScreen = index => () => {
    let playlistId = index;
    let playlistName;
    if (index === 0) {
      playlistName = "Top 50 This Week on Campus";
    }
    else if (index === 1) {
      playlistName = "Local Artist Corner";
    }
    else if (index === 2) {
      playlistName = "Your Top Songs";
    }
    else {
      playlistName = "Playlist #4";
    }

    navigation.navigate("Playlist", {
      playlistId: playlistId,
      playlistName: playlistName,
    })
  }

  getVenueScreen = index => () => {
    let venueId = index;
    let venueName;
    if (index === 0) {
      venueName = "Hillenbrand Hall";
    }
    else if (index === 1) {
      venueName = "Earhart Hall";
    }
    else if (index === 2) {
      venueName = "Elliot Concert Hall";
    }
    else {
      venueName = "Purdue Hotel UwU";
    }

    navigation.navigate("VenueScreen", {
      venueId: venueId,
      venueName: venueName,
    })
  }

    /*modify navagate here*/
    /*
  const renderPerformanceItem = ({ item,index }) => (
    <TouchableOpacity
          delayPressIn={100}
          style={styles.performanceCard}
          //onPress={() => navigation.navigate('VenueScreen')}
          onPress={getVenueScreen(index)}
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
          contentContainerStyle={{justifyContent: 'center',}}
          renderItem={renderPlaylistItem}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.title}>Live Performances</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Local Artists")}>
          <Text style={{color: 'brown', marginLeft: 10, fontSize: 14, fontWeight: 'bold', marginLeft: 15,}}>See all local artists ></Text>
        </TouchableOpacity>
        <FlatList
          horizontal={true}
          data={performanceData}
          renderItem={renderPerformanceItem}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.title}>Your Groups</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Groups")}>
          <Text style={{color: 'brown', marginLeft: 10, fontSize: 14, fontWeight: 'bold', marginLeft: 15,}}>See all groups ></Text>
        </TouchableOpacity>
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
*/

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
})
