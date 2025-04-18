import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import firebase from '../../firebaseConfig'; // Import your Firebase initialization file
import { auth, database } from '../../firebaseConfig';

interface Book {
    bookId: string;
    bookName: string;
}

export default function BooksListScreen({ navigation }: any) {
    const [books, setBooks] = useState<Book[]>([]);  // Type the state as an array of books
    const [bookId, setBookId] = useState('');
    const [bookName, setBookName] = useState('');

    // Fetch books from Firebase
    const fetchBooks = async () => {
        const snapshot = await database().ref('books').once('value');
        const booksData = snapshot.val();
        const booksList: Book[] = [];

        for (const key in booksData) {
            booksList.push({ bookId: key, ...booksData[key] });
        }

        setBooks(booksList);  // Update the books list
    };

    // Fetch books on component mount
    useEffect(() => {
        fetchBooks();
    }, []);

    // Add a new book to Firebase and refresh the book list
    const addBook = async () => {
        if (bookId && bookName) {
            try {
                await database().ref('books/' + bookId).set({ bookId, bookName });
                setBookId('');
                setBookName('');
                fetchBooks();  // Refresh the list of books
            } catch (error) {
                console.error("Error adding book: ", error);
            }
        }
    };

    const renderBook = ({ item }: { item: Book }) => (
        <View style={styles.bookItem}>
            <Text style={styles.bookText}>{item.bookId}: {item.bookName}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter Book ID"
                value={bookId}
                onChangeText={setBookId}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter Book Name"
                value={bookName}
                onChangeText={setBookName}
            />
            <TouchableOpacity style={styles.button} onPress={addBook}>
                <Text style={styles.buttonText}>Add Book</Text>
            </TouchableOpacity>
            <FlatList
                data={books}
                renderItem={renderBook}
                keyExtractor={(item) => item.bookId}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFFFD7', // Background color for the container
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
        fontSize: 20,
        backgroundColor: '#fff', // White background for the input fields
    },
    button: {
        backgroundColor: '#4CAF59', // Green background for the button
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff', // White text for the button
        fontSize: 18,
        fontWeight: 'bold',
    },
    bookItem: {
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        elevation: 2,
    },
    bookText: {
        fontSize: 20, // Increased font size for book text
        fontWeight: 'bold',
    },
});
