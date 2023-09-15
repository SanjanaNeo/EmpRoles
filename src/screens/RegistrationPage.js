import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Button, TextInput, RadioButton, HelperText } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function RegistrationPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee'); // Default role is 'employee'
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const registerUser = async () => {
    try {
      // Create the user account with email and password
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      // Get the newly created user's UID
      const userId = userCredential.user.uid;

      // Assign the chosen role to the user in Firestore
      await firestore().collection('users').doc(userId).set({
        email,
        role, // Assign the chosen role
        userId, // Store the UID as userId
      });

      setSuccessMessage('Registration successful!');
      setError('');
    } catch (error) {
      setError(error.message);
      setSuccessMessage('');
      console.error('Error registering user:', error);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.header}>Registration Page</Text>
        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          mode="outlined"
          style={styles.input}
        />
        <RadioButton.Group onValueChange={(value) => setRole(value)} value={role}>
          <Text style={styles.roleText}>Choose Role:</Text>
          <View style={styles.roleButton}>
            <RadioButton value="employee" />
            <Text>Employee</Text>
          </View>
          <View style={styles.roleButton}>
            <RadioButton value="manager" />
            <Text>Manager</Text>
          </View>
          <View style={styles.roleButton}>
            <RadioButton value="admin" />
            <Text>Admin</Text>
          </View>
        </RadioButton.Group>
        <Button
          mode="contained"
          onPress={registerUser}
          style={styles.registerButton}
        >
          Register
        </Button>
        {successMessage ? (
          <Text style={styles.successMessage}>{successMessage}</Text>
        ) : null}
        {error ? (
          <HelperText type="error" visible={true} style={styles.errorText}>
            {error}
          </HelperText>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  roleText: {
    fontSize: 18,
    marginBottom: 8,
  },
  roleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  registerButton: {
    marginTop: 20,
  },
  successMessage: {
    fontSize: 16,
    color: 'green',
    textAlign: 'center',
    marginTop: 10,
  },
  errorText: {
    marginTop: 10,
  },
});

export default RegistrationPage;
