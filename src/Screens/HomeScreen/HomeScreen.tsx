// App.js
import React, {useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Client, Account} from 'appwrite';

const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite Endpoint
  .setProject('65f69e4c399f9d7e2938'); // Your project ID

const account = new Account(client); // Init your Web SDK

const HomeScreen = () => {
  useEffect(() => {
    // Check if the user is already registered
    AsyncStorage.getItem('registered').then((value: any) => {
      if (value === 'true') {
        console.log('User is already registered');
        // Redirect or do something else if needed
      } else {
        console.log('User is not registered');
        // Uncomment the following line to register the user
        // registerUser();
      }
    });
  }, []);

  const registerUser = () => {
    const name = 'Shubham'; // User's name
    const email = 'email@example.com'; // User's email
    const password = 'pa123456'; // User's password

    account
      .create(name, email, password)
      .then(function (response) {
        console.log('User registered successfully:', response);
        // Set a flag in AsyncStorage indicating that the user is registered
        AsyncStorage.setItem('registered', 'true');
        console.log(response);
      })
      .catch(function (error) {
        console.error('Error registering user:', error);
      });
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Welcome to MyApp</Text>
      <Button title="Register" onPress={registerUser} />
    </View>
  );
};

export default HomeScreen;
