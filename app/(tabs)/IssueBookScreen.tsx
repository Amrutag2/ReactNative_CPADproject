import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import firebase from '../../firebaseConfig'; // Import your Firebase initialization file
import { auth, database } from '../../firebaseConfig';

export default function IssueBookScreen({ navigation }: any) {
    const [userId, setUserId] = useState('');
    const [bookId, setBookId] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [dateOfIssue] = useState(new Date().toLocaleDateString()); // Current date
    const [issuedBooks, setIssuedBooks] = useState<any[]>([]);

    // Fetch issued books from Firebase
    const fetchIssuedBooks = async () => {
        const snapshot = await database().ref('issuedBooks').once('value');
        const issuedBooksData = snapshot.val();
        const issuedBooksList: any[] = [];
        for (const key in issuedBooksData) {
            issuedBooksList.push({ id: key, ...issuedBooksData[key] });
        }
        setIssuedBooks(issuedBooksList);
    };

    useEffect(() => {
        fetchIssuedBooks();
    }, []);

    // Issue a new book
    const issueBook = () => {
        if (userId && bookId && returnDate) {
            const issueDetails = {
                userId,
                bookId,
                dateOfIssue,
                returnDate,
            };
            database().ref('issuedBooks').push(issueDetails);
            setUserId('');
            setBookId('');
            setReturnDate('');
            fetchIssuedBooks(); // Refresh the list after issuing a book
        }
    };

    // Render each issued book
    const renderIssuedBook = ({ item }: any) => (
        <View style={styles.bookItem}>
            <Text style={styles.bookText}>User ID: {item.userId}</Text>
            <Text style={styles.bookText}>Book ID: {item.bookId}</Text>
            <Text style={styles.bookText}>Date of Issue: {item.dateOfIssue}</Text>
            <Text style={styles.bookText}>Return Date: {item.returnDate}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="User ID"
                placeholderTextColor="#888"
                value={userId}
                onChangeText={setUserId}
            />
            <TextInput
                style={styles.input}
                placeholder="Book ID"
                placeholderTextColor="#888"
                value={bookId}
                onChangeText={setBookId}
            />
            <TextInput
                style={styles.input}
                placeholder="Return Date"
                placeholderTextColor="#888"
                value={returnDate}
                onChangeText={setReturnDate}
            />
            <TouchableOpacity style={styles.button} onPress={issueBook}>
                <Text style={styles.buttonText}>Issue Book</Text>
            </TouchableOpacity>

            <Text style={styles.header}>Issued Books</Text>
            <FlatList
                data={issuedBooks}
                renderItem={renderIssuedBook}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFD7',
        padding: 20,
    },
    input: {
        height: 50,
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#333',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 2,
    },
    button: {
        backgroundColor: '#4CAF59',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
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
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        color: '#333',
    },
    listContainer: {
        paddingBottom: 20,
    },
    bookItem: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
    },
    bookText: {
        fontSize: 16,
        color: '#555',
    },
});
