import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen({ navigation }) {
  const [userRole, setUserRole] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT token
          setUserRole(decodedToken.role);
          setUserName(decodedToken.name); // Assuming the JWT has user name as well
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      navigation.replace('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleCreateEvent = () => {
    if (userRole === 'organizer') {
      navigation.navigate('Create Event');
    } else {
      Alert.alert('Permission Denied', 'Only organizers can create events.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.userInfo}>Welcome, {userName}!</Text>
      <Text style={styles.userInfo}>Role: {userRole}</Text>

      {/* Show Create Event button only for organizers */}
      {userRole === 'organizer' && (
        <Button
          title="Create Event"
          onPress={handleCreateEvent}
          style={styles.createEventButton}
        />
      )}

      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userInfo: {
    fontSize: 18,
    marginBottom: 10,
  },
  createEventButton: {
    marginTop: 20,
  },
});