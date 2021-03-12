import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Button } from 'react-native'

const ProfileScreen = ({ navigation }) => {
  const onLogoutPress = () => navigation.navigate("StartScreen");

    
        return (
                <><View>
                <Text>PROFILE SCREEN</Text>
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={onLogoutPress}
                >
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
                <View style={styles.followButton}>
                    <View style={styles.followButtonContainer}>
                        <Button title="Follow" />
                    </View>
                    <View style={styles.followButtonContainer}>
                        <Button title="Unfollow" />
                    </View>
                </View></>
        )
    }


const styles = StyleSheet.create({
  logoutButton: {
    alignItems: 'center',
    backgroundColor: '#8e6f3e',
    padding: 10,
    margin: 10,
    marginTop: 20,
    marginBottom: 30,
    borderRadius: 10,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  followButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    followButtonContainer: {
        flex: 1,
    }
})

export default ProfileScreen
