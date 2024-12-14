import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './navigation/BottomTabNavigator'; // Import BottomTabNavigator
import EventCreateScreen from './screens/EventCreateScreen'; // Event Create Screen
import LoginScreen from './screens/LoginScreen'; // Login Screen
import SignupScreen from './screens/SignupScreen'; // Signup Screen

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={BottomTabNavigator}  
          options={{ title: 'Event List' }} 
        />
        <Stack.Screen 
          name="Create Event" 
          component={EventCreateScreen} 
          options={{ title: 'Create Event' }} 
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ title: 'Login' }} 
        />
        <Stack.Screen 
          name="Signup" 
          component={SignupScreen} 
          options={{ title: 'Sign Up' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}