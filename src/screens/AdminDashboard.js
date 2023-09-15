import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const AdminDashboard = ({navigation}) => {
  const navigateToUserManagement = () => {
    // Navigate to the user management screen
    navigation.navigate('UserManagement');
  };

  const navigateToPromoteEmployee = () => {
    // Navigate to the PromoteEmployeeToManager screen
    navigation.navigate('PromoteEmployeeToManager');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Admin Dashboard</Text>
      <View style={styles.iconContainer}>
        <Icon name="cogs" size={100} color="#007BFF" />
      </View>
      <Text style={styles.description}>
        Welcome to the admin dashboard. Here you can manage users and more.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={navigateToUserManagement}>
        <Text style={styles.buttonText}>Manage Users</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={navigateToPromoteEmployee}>
        <Text style={styles.buttonText}>Promote Employee to Manager</Text>
      </TouchableOpacity>
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
  iconContainer: {
    backgroundColor: 'white',
    borderRadius: 100,
    padding: 20,
    marginBottom: 30,
    elevation: 5,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 30,
    marginBottom: 30,
    color: 'gray',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AdminDashboard;
