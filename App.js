// import {StyleSheet, Text, View} from 'react-native';
// import React from 'react';
// import LoginScreen from './src/screens/LoginScreen';
// import FbLogin from './src/screens/FbLogin';
// import RegistrationPage from './src/screens/RegistrationPage';

// const App = () => {
//   return (
//   <RegistrationPage/>
//   );
// };

// export default App;

// const styles = StyleSheet.create({});

// App.js

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import AdminDashboard from './src/screens/AdminDashboard';
import UserManagement from './src/screens/UserManagement';
import LoginScreen from './src/screens/LoginScreen';
import RegistrationPage from './src/screens/RegistrationPage';
import ManagerDashboard from './src/screens/ManagerDashboard';
import PromoteEmployeeToManager from './src/screens/PromoteEmployeeToManager';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="UserManagement" component={UserManagement} />
        <Stack.Screen name="RegistrationPage" component={RegistrationPage} />
        <Stack.Screen name="ManagerDashboard" component={ManagerDashboard} />
        <Stack.Screen
          name="PromoteEmployeeToManager"
          component={PromoteEmployeeToManager}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
