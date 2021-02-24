import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StartScreen from './screens/StartScreen'
import HomeScreen from './screens/HomeScreen'
import GroupScreen from './screens/GroupScreen'
import ProfileScreen from './screens/ProfileScreen'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const Landing = () => {
  return (
    <Tab.Navigator initialRouteName="HomeScreen">
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Groups" component={GroupScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartScreen">
        <Stack.Screen name="StartScreen" component={StartScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
