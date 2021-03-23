import 'react-native-gesture-handler';
import React, { useEffect, useReducer, useMemo, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StartScreen from './screens/StartScreen'
import HomeScreen from './screens/HomeScreen'
import GroupScreen from './screens/GroupScreen'
import ProfileScreen from './screens/ProfileScreen'
import LocalArtistScreen from './screens/LocalArtistScreen'
import PlaylistScreen from './screens/PlaylistScreen'
import RegisterScreen from './screens/RegisterScreen'
import RegisterScreen2 from './screens/RegisterScreen2'
import RegisterScreen3 from './screens/RegisterScreen3'
import RegisterScreenLA from './screens/RegisterScreenLA'
import RegisterScreenLV from './screens/RegisterScreenLV'
import ActualRegisterScreen from './screens/ActualRegisterScreen'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()
// This context manages what the starting screen is depending on the user's login status
const AuthContext = React.createContext();


const Landing = () => {
  return (
    <Tab.Navigator initialRouteName="HomeScreen"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Groups') {
            iconName = focused ? 'globe' : 'globe-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'reorder-three' : 'reorder-three-outline';
          } else if (route.name === 'Local Artists') {
            iconName = focused ? 'people-circle' : 'people-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Groups" component={GroupScreen} />
      <Tab.Screen name="Local Artists" component={LocalArtistScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const App = () => {

  const [loginState, dispatchLoginState] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'GET_USERID':
          return {
            ...prevState,
            userID: action.userID,
            isLoggedIn: action.isLoggedIn,
          };
      }
    },
    {
      isLoggedIn: 'false',
      userID: null,
    }
  )


  // Get login status and user id info
  useEffect(() => {
    const getLoginInfo = async() => {
      let isLoggedIn;
      let userID;
      try {
        isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
          userID = await AsyncStorage.getItem('userID');
        }
        else {
          isLoggedIn = 'false';
        }
        // console.log("StartUp Login Info: " + isLoggedIn);
        // console.log("UserID: " + userID);
      } catch (err) {
        console.log(err);
      }
      dispatchLoginState({ type: 'GET_USERID', userID: userID, isLoggedIn: isLoggedIn });
    }
    getLoginInfo();
  }, []);


  const authContext = useMemo(
    () => ({

    })
  )


  return (
    <NavigationContainer>
      <AuthContext.Provider value={authContext}>
      <Stack.Navigator>
        {(loginState.isLoggedIn === 'true') ? (
          // User is logged in. Start at the landing page.
          <>
          <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
          <Stack.Screen name="Playlist" component={PlaylistScreen} />
          </>

        ) : (
          // User not signed in. Start at the StartScreen.
          <>
          <Stack.Screen name="StartScreen" component={StartScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ActualRegister" component={ActualRegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
          <Stack.Screen name="Playlist" component={PlaylistScreen} />
          </>
        )}
      </Stack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  )
}

export default App;
