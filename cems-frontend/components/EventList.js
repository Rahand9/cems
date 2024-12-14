import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EventList({ navigation }) {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Fetch all events from the backend
        axios.get('http://192.168.100.132:5001/api/events')
            .then((response) => {
                setEvents(response.data);  // Update the events state with the response data
            })
            .catch((error) => {
                console.error('Error fetching events:', error);  // Log error to console
                Alert.alert('Error', 'Failed to fetch events');
            });
    }, []);

    const handleRegister = async (eventId) => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const response = await axios.post(
                'http://192.168.100.132:5001/api/events/register',
                { eventId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.status === 200) {
                Alert.alert('Success', response.data);  // Show message that user is already registered
            }
        } catch (error) {
            console.error('Error registering for event:', error);
            Alert.alert('Error', 'Failed to register for the event.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Event List</Text>
            <FlatList
                data={events}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.eventCard}>
                        <Text style={styles.eventTitle}>{item.title}</Text>
                        <Text>{item.description}</Text>
                        <Text>{new Date(item.date).toLocaleString()}</Text>
                        <Text>{item.location}</Text>
                        <Text>{item.category}</Text>
                        <Button title="Register" onPress={() => handleRegister(item.id)} />
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    eventCard: {
        backgroundColor: '#e8f5e9',
        padding: 15,
        marginBottom: 10,
        borderRadius: 5,
    },
    eventTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});