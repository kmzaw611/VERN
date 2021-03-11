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
import Ionicons from 'react-native-vector-icons/Ionicons';
import { registerRootComponent } from 'expo';

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

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

const Register = () => {
  return (
    <Tab.Navigator initialRouteName="RegisterScreen">
      <Tab.Screen name="Registration" component={RegisterScreen} />
    </Tab.Navigator>
  );
}

const Register2 = () => {
  return (
    <Tab.Navigator initialRouteName="RegisterScreen2">
      <Tab.Screen name="Registration2" component={RegisterScreen2} />
    </Tab.Navigator>
  );
}

const Register3 = () => {
  return (
    <Tab.Navigator initialRouteName="RegisterScreen3">
      <Tab.Screen name="Registration3" component={RegisterScreen3} />
    </Tab.Navigator>
  );
}

const RegisterLA = () => {
  return (
    <Tab.Navigator initialRouteName="RegisterScreenLA">
      <Tab.Screen name="RegistrationLA" component={RegisterScreenLA} />
    </Tab.Navigator>
  );
}

const RegisterLV = () => {
  return (
    <Tab.Navigator initialRouteName="RegisterScreenLV">
      <Tab.Screen name="RegistrationLV" component={RegisterScreenLV} />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartScreen">
        <Stack.Screen name="StartScreen" component={StartScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
        <Stack.Screen name="Playlist" component={PlaylistScreen} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="Register2" component={Register2} options={{ headerShown: false }} />
        <Stack.Screen name="Register3" component={Register3} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterLA" component={RegisterLA} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterLV" component={RegisterLV} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
registerRootComponent(App);