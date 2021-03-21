import 'react-native-gesture-handler';
import React from 'react'
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
import EditScreen from './screens/EditScreen'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { registerRootComponent } from 'expo';

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()
// Get this from AsyncStorage
// const isLoggedIn = 

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
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartScreen">
        <Stack.Screen name="StartScreen" component={StartScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ActualRegister" component={ActualRegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
        <Stack.Screen name="Playlist" component={PlaylistScreen} />
        <Stack.Screen name="EditScreen" component={EditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
registerRootComponent(App);
export default App;
