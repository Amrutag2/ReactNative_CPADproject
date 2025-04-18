import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function MainScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Library Management for Admin</Text> {/* Heading */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('IssueBook')}>
        <Text style={styles.buttonText}>Go to Issue Book</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BookList')}>
        <Text style={styles.buttonText}>Go to Book List</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ReturnBook')}>
        <Text style={styles.buttonText}>Go to Return Book</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ChatApp')}>
        <Text style={styles.buttonText}>Chat Box</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UserList')}>
        <Text style={styles.buttonText}>All Users</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFD7', // Background color for the screen
    padding: 20,
  },
  heading: {
    fontSize: 75, // Larger font size for the heading
    fontWeight: 'bold', // Bold text
    color: '#000', // White color for the heading
    marginBottom: 30, // Space between heading and buttons
    textAlign: 'center', // Center align the heading
  },
  button: {
    width: '80%', // Makes buttons wider
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#4CAF59', // Green background for buttons
    borderRadius: 8, // Rounded corners
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff', // White text color
    fontSize: 20,
    fontWeight: 'bold',
  },
});
