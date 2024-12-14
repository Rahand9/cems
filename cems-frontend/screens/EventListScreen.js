import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Mock function to check if the user is an organizer
const isOrganizer = (user) => {
  // Replace with actual logic to check user role
  return user.role === 'organizer';
};

// Mock function to fetch events from the database
const fetchEvents = async () => {
  // Replace with actual API call to fetch events
  return [
    { id: '1', title: 'Event 1' },
    { id: '2', title: 'Event 2' },
  ];
};

const EventListScreen = ({ user }) => {
  const [events, setEvents] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const loadEvents = async () => {
      const fetchedEvents = await fetchEvents();
      setEvents(fetchedEvents);
    };
    loadEvents();
  }, []);

  const handleCreateEvent = () => {
    navigation.navigate('CreateEvent');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.eventTitle}>Event List</Text>
      {/* Render the create button only if the user is an organizer */}
      {isOrganizer(user) && (
        <TouchableOpacity style={styles.createEventButton} onPress={handleCreateEvent}>
          <Text style={{ color: 'white' }}>Create Event</Text>
        </TouchableOpacity>
      )}
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.eventItem}>
            <Text>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  createEventButton: {
    position: 'absolute',
    right: 20,
    top: 40,
    backgroundColor: 'blue',  // Blue background for the button
    padding: 10,
    borderRadius: 5,  // For a subtle rounded button
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  eventItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default EventListScreen;