import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const PromoteEmployeeToManager = () => {
  const [employeeEmail, setEmployeeEmail] = useState('');
  const [promotionStatus, setPromotionStatus] = useState('');

  const handlePromoteEmployee = async () => {
    try {
      // Query Firestore to find the employee document by email
      const employeeQuery = await firestore()
        .collection('users')
        .where('email', '==', employeeEmail)
        .get();

      if (!employeeQuery.empty) {
        // Get the employee document
        const employeeDoc = employeeQuery.docs[0];

        // Update the employee's role to 'manager'
        await firestore()
          .collection('users')
          .doc(employeeDoc.id)
          .update({role: 'manager'});

        setPromotionStatus('Employee promoted to manager successfully.');
      } else {
        setPromotionStatus('Employee not found.');
      }
    } catch (error) {
      console.error('Error promoting employee to manager:', error);
      setPromotionStatus('Error promoting employee.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Promote Employee to Manager</Text>
      <TextInput
        placeholder="Employee Email"
        value={employeeEmail}
        onChangeText={text => setEmployeeEmail(text)}
        style={styles.input}
      />
      <Button title="Promote Employee" onPress={handlePromoteEmployee} />
      <Text style={styles.status}>{promotionStatus}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 20,
  },
  status: {
    fontSize: 16,
    color: 'green',
    marginTop: 10,
  },
});

export default PromoteEmployeeToManager;
