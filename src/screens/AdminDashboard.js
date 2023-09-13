// AdminDashboard.js
import React from 'react';
import {View, Text, Button} from 'react-native';

function AdminDashboard({navigation}) {
  const navigateToUserManagement = () => {
    // Navigate to the user management screen
    navigation.navigate('UserManagement');
  };

  return (
    <View>
      <Text>Welcome to Admin Dashboard</Text>
      <Button title="Manage Users" onPress={navigateToUserManagement} />
    </View>
  );
}

export default AdminDashboard;
