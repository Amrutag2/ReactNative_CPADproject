import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    FlatList,
    StyleSheet,
    KeyboardAvoidingView,
    Modal,
    TouchableOpacity,
} from 'react-native';
import { auth, database } from '../../firebaseConfig';

interface Message {
    id: string;
    text: string;
    createdBy: string;
    username: string;
    timestamp: number;
}

export default function ChatScreen({ navigation }: any) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [text, setText] = useState('');
    const [userId, setUserId] = useState('');
    const [username, setUsername] = useState('');
    const [modalVisible, setModalVisible] = useState(true);
    const [inputUserId, setInputUserId] = useState('');
    const [inputUsername, setInputUsername] = useState('');

    // Save user details to Firebase
    const saveUserDetails = (id: string, name: string) => {
        const userRef = database().ref(`users/${id}`);
        userRef.set({
            username: name,
            id,
        });
    };

    // Fetch and listen for real-time updates to messages
    useEffect(() => {
        const messagesRef = database().ref('messages');
        const onValueChange = messagesRef.on('value', (snapshot: any) => {
            const fetchedMessages: Message[] = [];
            snapshot.forEach((childSnapshot: any) => {
                const message = childSnapshot.val();
                fetchedMessages.push({
                    id: childSnapshot.key!,
                    ...message,
                });
            });

            // Sort messages by timestamp
            fetchedMessages.sort((a, b) => a.timestamp - b.timestamp);
            setMessages(fetchedMessages);
        });

        return () => messagesRef.off('value', onValueChange); // Cleanup listener on unmount
    }, []);

    // Handle modal submission
    const handleSubmitDetails = () => {
        if (inputUserId.trim() === '' || inputUsername.trim() === '') {
            alert('Both User ID and Username are required');
            return;
        }
        setUserId(inputUserId.trim());
        setUsername(inputUsername.trim());
        saveUserDetails(inputUserId.trim(), inputUsername.trim());
        setModalVisible(false);
    };

    // Send a new message
    const sendMessage = async () => {
        if (text.trim() === '') return;

        try {
            const newMessageRef = database().ref('messages').push();
            await newMessageRef.set({
                text,
                createdBy: userId,
                username,
                timestamp: Date.now(), // Use client-side timestamp
            });
            setText('');
        } catch (error: any) {
            console.error('Error sending message:', error.message);
        }
    };

    // Render each message
    const renderMessage = ({ item }: { item: Message }) => (
        <View style={styles.messageContainer}>
            <Text style={styles.messageSender}>
                {item.username} ({item.createdBy})
            </Text>
            <Text style={styles.messageText}>{item.text}</Text>
        </View>
    );

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Modal visible={modalVisible} transparent={true} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Enter Your Details</Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="User ID"
                            value={inputUserId}
                            onChangeText={setInputUserId}
                        />
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Username"
                            value={inputUsername}
                            onChangeText={setInputUsername}
                        />
                        <Button title="Submit" onPress={handleSubmitDetails} />
                    </View>
                </View>
            </Modal>
            <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.messagesList}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message..."
                    value={text}
                    onChangeText={setText}
                />
                <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFD7', // Background color changed to #3cd7e4
        paddingTop: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    modalInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        height: 50,
        backgroundColor: '#f9f9f9',
    },
    messagesList: {
        padding: 10,
    },
    messageContainer: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        borderWidth: 1,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 1,
        elevation: 2,
    },
    messageSender: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#555',
    },
    messageText: {
        fontSize: 18,
        color: '#333',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        marginRight: 10,
        paddingHorizontal: 10,
        backgroundColor: '#f9f9f9',
    },
    sendButton: {
        backgroundColor: '#4CAF59',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
