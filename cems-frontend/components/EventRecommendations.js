// EventRecommendations.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function EventRecommendations() {
    const [recommendedEvents, setRecommendedEvents] = useState([]);
    const category = "Technology"; // You can dynamically change this if needed.

    useEffect(() => {
        axios.get(`http://192.168.100.132:5001/api/events/recommendations?category=${category}`)
            .then(response => {
                setRecommendedEvents(response.data); // Set recommended events
            })
            .catch(error => {
                console.error('Error fetching events:', error);
                Alert.alert('Error', 'Failed to fetch recommended events.'); // Error alert
            });
    }, [category]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recommended Events</Text>
            {recommendedEvents.length === 0 ? (
                <Text style={styles.noEvents}>No recommended events available.</Text>
            ) : (
                <FlatList
                    data={recommendedEvents}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.eventCard}>
                            <Text style={styles.eventTitle}>{item.title}</Text>
                            <Text>{item.description}</Text>
                            <Text>{new Date(item.date).toLocaleString()}</Text>
                            <Text>{item.location}</Text>
                            <Text style={styles.category}>{item.category}</Text>
                        </View>
                    )}
                />
            )}
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
    noEvents: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
        marginTop: 20,
    },
    eventCard: {
        backgroundColor: '#e3f2fd',
        padding: 10,
        borderRadius: 8,
        marginVertical: 8,
    },
    eventTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    category: {
        fontStyle: 'italic',
        marginTop: 5,
    },
});