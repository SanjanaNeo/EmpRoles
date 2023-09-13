// UserManagement.js
import React, {useState, useEffect} from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';

function UserManagement() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch the list of users from Firestore
    const unsubscribe = firestore()
      .collection('users')
      .onSnapshot(snapshot => {
        const userList = snapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setUsers(userList);
      });

    return () => unsubscribe();
  }, []);

  const promoteToManager = userId => {
    // Update the role of the user to 'manager' in Firestore
    firestore().collection('users').doc(userId).update({role: 'manager'});
  };

  const renderUserItem = ({item}) => {
    return (
      <View>
        <Text>{item.email}</Text>
        <Text>Role: {item.role}</Text>
        {item.role !== 'manager' && (
          <Button
            title="Promote to Manager"
            onPress={() => promoteToManager(item.id)}
          />
        )}
        {/* Add buttons for viewing/editing user profiles */}
      </View>
    );
  };

  return (
    <View>
      <Text>User Management</Text>
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={renderUserItem}
      />
    </View>
  );
}

export default UserManagement;
