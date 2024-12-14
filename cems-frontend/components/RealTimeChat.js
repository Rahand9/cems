import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet, Text } from 'react-native';
import io from 'socket.io-client';

const socket = io('http://192.168.100.132:5001'); // Ensure correct backend URL

export default function RealTimeChat() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // When the component mounts, start the socket connection
        socket.on('message', (newMessage) => {
            console.log('Received message:', newMessage);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        // Clean up the socket connection when component unmounts
        return () => {
            socket.off('message');  // Unsubscribe from the 'message' event
            socket.disconnect();    // Disconnect socket on cleanup
        };
    }, []);

    const sendMessage = () => {
        console.log('Sending message:', message);
        socket.emit('sendMessage', message);
        setMessage('');  // Clear message input after sending
    };

    return (
        <View style={styles.container}>
            {/* Render messages using FlatList */}
            <FlatList
                data={messages}
                keyExtractor={(item, index) => index.toString()} // Ensure proper key extraction
                renderItem={({ item }) => <Text style={styles.message}>{item}</Text>} // Directly render the message (assuming 'item' is a string)
            />
            <TextInput
                style={styles.input}
                value={message}
                onChangeText={setMessage}
                placeholder="Type a message"
            />
            <Button title="Send" onPress={sendMessage} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginVertical: 10,
    },
    message: {
        marginVertical: 5,
        padding: 10,
        backgroundColor: '#e8f5e9',
        borderRadius: 5,
    },
});
