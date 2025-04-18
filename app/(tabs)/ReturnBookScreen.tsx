import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import database from '@react-native-firebase/database';

export default function ReturnBookScreen({ navigation }: any) {
    const [bookId, setBookId] = useState('');
    const [issuedBooks, setIssuedBooks] = useState<any[]>([]);

    // Fetch the list of issued books from Firebase
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

    // Handle book return (delete the book from the issuedBooks)
    const returnBook = async () => {
        if (bookId) {
            // Find the book entry by the entered bookId and remove it
            const bookToRemove = issuedBooks.find((book) => book.bookId === bookId);

            if (bookToRemove) {
                // If the book is found, delete it from the database
                await database().ref('issuedBooks').child(bookToRemove.id).remove();
                setBookId(''); // Clear the input field
                fetchIssuedBooks(); // Refresh the list after returning a book
            } else {
                alert('No issued book found with that Book ID');
            }
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
                placeholder="Enter Book ID to Return"
                value={bookId}
                onChangeText={setBookId}
                placeholderTextColor="#888"
            />
            <TouchableOpacity style={styles.button} onPress={returnBook}>
                <Text style={styles.buttonText}>Return Book</Text>
            </TouchableOpacity>

            <Text style={styles.header}>Remaining Issued Books</Text>
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
    },
    button: {
        backgroundColor: '#4CAF59',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    listContainer: {
        paddingBottom: 20,
    },
    bookItem: {
        backgroundColor: '#FFFFFF',
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
