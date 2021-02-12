import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'

const Logo = () => (
  <View style={styles.container}>
    <Image source={require('../assets/Logo.png')} style={styles.image} />
    <Text style={styles.title}>VERN</Text>
    <Text style={styles.subtitle}>the social media app for music</Text>
  </View>
)

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: "sans-serif",
    fontStyle: "italic",
    fontSize: 16,
    color: "#8e6f3e",
  },
  title: {
    fontFamily: "sans-serif",
    fontWeight: "bold",
    fontSize: 40,
    color: "#8e6f3e",
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
})

export default Logo
