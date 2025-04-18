// Navigation.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer , NavigationIndependentTree} from '@react-navigation/native';
import IssueBookScreen from './IssueBookScreen';
import BooksListScreen from './BooksListScreen';
import ReturnBookScreen from './ReturnBookScreen';
import ChatScreen from './ChatScreen';
import MainScreen from './MainScreen';
import UserListScreen from './UserListScreeen';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="IssueBook" component={IssueBookScreen} />
        <Stack.Screen name="BookList" component={BooksListScreen} />
        <Stack.Screen name="ReturnBook" component={ReturnBookScreen} />
        <Stack.Screen name="ChatApp" component={ChatScreen} />
        <Stack.Screen name="UserList" component={UserListScreen} />
      </Stack.Navigator>
      </NavigationContainer>
      </NavigationIndependentTree>
  );
};

export default Navigation;
