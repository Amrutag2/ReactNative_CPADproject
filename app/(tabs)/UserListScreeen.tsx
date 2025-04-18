import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import firebase from '../../firebaseConfig'; // Import your Firebase initialization file
import { database } from '../../firebaseConfig';

export default function UserListScreen({ navigation }: any) {
    const [users, setUsers] = useState<any[]>([]);

    // Fetch users from Firebase
    const fetchUsers = async () => {
        try {
            const snapshot = await database().ref('users').once('value');
            const usersData = snapshot.val();
            console.log('Fetched users:', usersData);
            const usersList: any[] = [];
            for (const key in usersData) {
                usersList.push({ id: key, ...usersData[key] });
            }
            setUsers(usersList);
        } catch (error: any) {
            console.error('Error fetching users:', error.message);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Render each user
    const renderUser = ({ item }: any) => (

        <View style={styles.userItem}>
            <Text style={styles.userText}>User ID: {item.id}</Text>
            <Text style={styles.userText}>Username: {item.username}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>User List</Text>
            <FlatList
                data={users}
                renderItem={renderUser}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('MainScreen')}
            >
                <Text style={styles.buttonText}>Back to Main Screen</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFD7',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff',
        textAlign: 'center',
    },
    listContainer: {
        paddingBottom: 20,
    },
    userItem: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
    },
    userText: {
        fontSize: 16,
        color: '#000',

    },
    button: {
        backgroundColor: '#4CAF59',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 2,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
