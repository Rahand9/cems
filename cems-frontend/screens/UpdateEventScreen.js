// UpdateEventScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UpdateEventScreen({ route, navigation }) {
  const { event } = route.params; // Get event data passed from the previous screen

  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [date, setDate] = useState(event.date);
  const [location, setLocation] = useState(event.location);
  const [category, setCategory] = useState(event.category);

  const handleUpdateEvent = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const updatedEvent = { id: event.id, title, description, date, location, category };

    try {
      await axios.put(
        `http://192.168.100.132:5001/api/events/${event.id}`,
        updatedEvent,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Alert.alert('Success', 'Event updated successfully!');
      navigation.goBack();  // Go back after updating
    } catch (error) {
      console.error('Error updating event:', error);
      Alert.alert('Error', 'Failed to update event');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Event</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Event Title" />
      <TextInput style={styles.input} value={description} onChangeText={setDescription} placeholder="Event Description" />
      <TextInput style={styles.input} value={date} onChangeText={setDate} placeholder="Event Date" />
      <TextInput style={styles.input} value={location} onChangeText={setLocation} placeholder="Event Location" />
      <TextInput style={styles.input} value={category} onChangeText={setCategory} placeholder="Event Category" />
      <Button title="Update Event" onPress={handleUpdateEvent} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});