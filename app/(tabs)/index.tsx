<<<<<<< HEAD

import { createStackNavigator } from '@react-navigation/stack';

import Navigation from './Navigation';
const Stack = createStackNavigator();

export default function HomeScreen({navigation}:any) {
  return (
    <Navigation />
    
   
  );
}


=======
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'

export default function HomeScreen() {
  const [display, setDisplay] = useState("");

  // Function to append to the display
  const appendToDisplay = (value: string) => {
    setDisplay(display + value);
  };

  // Function to clear the display
  const clearDisplay = () => {
    setDisplay("");
  };

  // Function to calculate the result
  const calculateResult = () => {
    try {
      const result = eval(display); // Calculate the result using eval
      setDisplay(result.toString());
    } catch (error) {
      setDisplay("Error");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.display} value={display} editable={false} />
      
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={clearDisplay}>
          <Text style={styles.buttonText}>C</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => appendToDisplay('%')}>
          <Text style={styles.buttonText}>%</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => appendToDisplay('/')}>
          <Text style={styles.buttonText}>/</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => appendToDisplay('*')}>
          <Text style={styles.buttonText}>*</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => appendToDisplay('7')}>
          <Text style={styles.buttonText}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => appendToDisplay('8')}>
          <Text style={styles.buttonText}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => appendToDisplay('9')}>
          <Text style={styles.buttonText}>9</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => appendToDisplay('-')}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => appendToDisplay('4')}>
          <Text style={styles.buttonText}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => appendToDisplay('5')}>
          <Text style={styles.buttonText}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => appendToDisplay('6')}>
          <Text style={styles.buttonText}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => appendToDisplay('+')}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => appendToDisplay('1')}>
          <Text style={styles.buttonText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => appendToDisplay('2')}>
          <Text style={styles.buttonText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => appendToDisplay('3')}>
          <Text style={styles.buttonText}>3</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => appendToDisplay('0')}>
          <Text style={styles.buttonText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => appendToDisplay('.')}>
          <Text style={styles.buttonText}>.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.equalButton]} onPress={calculateResult}>
          <Text style={styles.buttonText}>=</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  display: {
    width: '100%',
    backgroundColor: '#eee',
    textAlign: 'right',
    fontSize: 36,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    color: '#000',
  },
  buttons: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    width: '22%',
    backgroundColor: '#008cba',
    padding: 20,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
  },
  equalButton: {
    backgroundColor: '#28a745',
    width: '47%',
  },
});
>>>>>>> 5afc81d8a6ccece98638bafd6f1a372e34cb2e43
