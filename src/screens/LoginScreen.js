import {
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const LoginScreen = () => {
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '397967077082-o31nhr3amg1of3tmlkvjv431r2aj5qhq.apps.googleusercontent.com',
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const usrInfo = await GoogleSignin.signIn();
      setUserInfo(usrInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUserInfo(null); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        {userInfo !== null && <Text>{userInfo.user.name}</Text>}
        {userInfo !== null && <Text>{userInfo.user.email}</Text>}
        {userInfo !== null && (
          <Image
            source={{uri: userInfo.user.photo}}
            style={{width: 100, height: 100}}
          />
        )}
        {userInfo == null ? (
          <Text
            style={{
              padding: 10,
              width:190,
              height:40,
              justifyContent:'center',
              borderWidth: 1,
              borderRadius:5,
              marginTop: 230,
              backgroundColor:'blue',
              color:'white'
            }}
            onPress={() => {
              signIn();
            }}>
            Sign In using Google
          </Text>
        ) : (
          <Text style={{padding: 20, borderWidth: 1, marginTop: 30}} onPress={()=>{
            signOut()
          }}>
            Sign Out
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
