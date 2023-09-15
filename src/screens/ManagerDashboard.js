import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {Button, Card} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
const ManagerDashboard = ({navigation, route}) => {
  const [employees, setEmployees] = useState([]);
  const {userId} = route.params;
  console.log('user id', userId);

  useEffect(() => {
    // Fetch employees for the manager using their userId
    const unsubscribe = firestore()
      .collection('users')
      .where('managerId', '==', userId)
      .onSnapshot(querySnapshot => {
        const employeeList = [];
        querySnapshot.forEach(doc => {
          const employeeData = doc.data();
          console.log('empdata', employeeData);
          employeeList.push({
            userId: doc.id,
            email: employeeData.email,
            role: employeeData.role,
            // managerId: employeeData.managerId,
          });
        });
        setEmployees(employeeList);
      });

    // Unsubscribe from Firestore when the component unmounts
    return () => unsubscribe();
  }, [userId]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Manager Dashboard</Text>
      {employees.length > 0 ? (
        <FlatList
          data={employees}
          keyExtractor={item => item.userId}
          renderItem={({item}) => (
            <Card style={styles.employeeCard}>
              <Card.Content>
                <Text style={styles.employeeEmail}>{item.email}</Text>
                <Text style={styles.employeeRole}>{item.role}</Text>
              </Card.Content>
            </Card>
          )}
        />
      ) : (
        <Text style={styles.noEmployees}>No employees assigned.</Text>
      )}
      <Button
        mode="contained"
        onPress={() =>
          navigation.navigate(/* Add logic to navigate to other screens */)
        }
        style={styles.manageEmployeesButton}>
        Manage Employees
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F0F0F0',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  employeeCard: {
    marginVertical: 8,
  },
  employeeEmail: {
    fontSize: 14,
    color: 'gray',
  },
  employeeRole: {
    fontSize: 14,
    color: 'blue', // Adjust the color as needed
  },
  noEmployees: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
  manageEmployeesButton: {
    marginTop: 20,
  },
});

export default ManagerDashboard;
