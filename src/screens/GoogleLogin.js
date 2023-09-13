import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import Icon from 'react-native-vector-icons/FontAwesome';

const GoogleLogin = () => {
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
        // User cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // Operation (e.g., sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // Play services not available or outdated
      } else {
        // Some other error happened
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
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* <Image
          source={require('./your-app-logo.png')}
          style={styles.logo}
        /> */}
        {userInfo !== null && (
          <View style={styles.userInfo}>
            <Image
              source={{ uri: userInfo.user.photo }}
              style={styles.userImage}
            />
            <Text style={styles.userName}>{userInfo.user.name}</Text>
            <Text style={styles.userEmail}>{userInfo.user.email}</Text>
          </View>
        )}
        {userInfo == null ? (
          <TouchableOpacity
            style={styles.googleSignInButton}
            onPress={() => signIn()}
          >
            <View style={styles.buttonContent}>
              <Icon name="google" size={24} color="white" />
              <Text style={styles.buttonText}>Sign In with Google</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.signOutButton}
            onPress={() => signOut()}
          >
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default GoogleLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  userEmail: {
    fontSize: 16,
    color: 'gray',
    marginTop: 5,
  },
  googleSignInButton: {
    backgroundColor: '#4285F4',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:200
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    height:250
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 12,
  },
  signOutButton: {
    backgroundColor: '#FF5733',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 24,
  },
});
