import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MyRegistrations() {
    const [myRegistrations, setMyRegistrations] = useState([]);

    useEffect(() => {
        const fetchRegistrations = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                const response = await axios.get('http://192.168.100.132:5001/api/events/registrations', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMyRegistrations(response.data);
            } catch (error) {
                console.error('Error fetching registrations:', error);
                Alert.alert('Error', 'Failed to fetch your registrations.');
            }
        };

        fetchRegistrations();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Registrations</Text>
            <FlatList
                data={myRegistrations}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.eventCard}>
                        <Text style={styles.eventTitle}>{item.title}</Text>
                        <Text>{item.description}</Text>
                        <Text>{new Date(item.date).toLocaleString()}</Text>
                        <Text>{item.location}</Text>
                        <Text>{item.category}</Text>
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