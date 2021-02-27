import React from 'react'
import { Text, View, FlatList, StyleSheet } from 'react-native'

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <View style={styles.sectionContainer}>
        <Text style={styles.title}>Curated Playlists</Text>
        <View style={styles.horizontalRule}></View>
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
  sectionContainer: {
    alignItems: 'center',
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
