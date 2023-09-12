import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LoginScreen from './src/screens/LoginScreen';
import FbLogin from './src/screens/FbLogin';

const App = () => {
  return (
    <View>
      {/* <Text>App</Text> */}
      <LoginScreen />
      <FbLogin />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
