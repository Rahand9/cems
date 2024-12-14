import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import EventList from '../components/EventList';
import RealTimeChat from '../components/RealTimeChat';
import EventRecommendations from '../components/EventRecommendations';
import SettingsScreen from '../screens/SettingsScreen';
import MyRegistrations from '../screens/MyRegistrations'; // Import My Registrations
import EventCreateScreen from '../screens/EventCreateScreen'; // Import Create Event

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Events') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Chat') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === 'Recommendations') {
            iconName = focused ? 'star' : 'star-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === 'My Registrations') {
            iconName = focused ? 'book' : 'book-outline'; // Icon for Registrations
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Events" component={EventList} />
      <Tab.Screen name="Chat" component={RealTimeChat} />
      <Tab.Screen name="Recommendations" component={EventRecommendations} />
      <Tab.Screen name="My Registrations" component={MyRegistrations} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;