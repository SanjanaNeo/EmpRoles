import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Icon from 'react-native-vector-icons/FontAwesome';
import {LoginButton, AccessToken} from 'react-native-fbsdk-next';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

const UnifiedLogin = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigation = useNavigation();

  // useEffect(() => {
  //   // Listen for changes in the authentication state
  //   const unsubscribe = auth().onAuthStateChanged(user => {
  //     console.log("User",user);
  //     if (user) {
  //       // User is signed in, you can get their UID
  //       const userUid = user.uid;
  //       setUserId(userUid);
  //       console.log("user id 2",userUid);
  //     } else {
  //       // User is signed out
  //       setUserId(null);
  //       console.log("hello");
  //     }
  //   });

  //   // Clean up the listener when the component unmounts
  //   return () => unsubscribe();
  // }, []);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '397967077082-o31nhr3amg1of3tmlkvjv431r2aj5qhq.apps.googleusercontent.com',
    });
  }, []);

  // Function to fetch user's role from Firestore based on email
  const fetchUserRole = async email => {
    try {
      const userQuery = await firestore()
        .collection('users')
        .where('email', '==', email)
        .get();

      if (!userQuery.empty) {
        const userData = userQuery.docs[0].data();
        setUserRole(userData.role);

        // Check the user's role and navigate if needed
        if (userData.role === 'admin') {
          navigation.navigate('AdminDashboard');
        }
        if (userData.role === 'manager') {
          navigation.navigate('ManagerDashboard', {userId});
        }
      } else {
        console.log('User not found.');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUserInfo(userInfo);
      setUserId(userInfo?.user?.id);
      // console.log("mydfvds",userInfo?.user?.id);
      // console.log("infooo",userInfo);

      console.log('Userrrrrrr id', userId);

      // Fetch user's role after successful Google login
      fetchUserRole(userInfo.user.email);
    } catch (error) {
      // Handle errors as before
    }
  };

  const signInWithFacebook = () => {
    // Implement Facebook sign-in logic here
    // This part is similar to what you have in your FbLogin component
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUserInfo(null);
      setUserRole(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {userInfo !== null ? (
          <View style={styles.userInfo}>
            <Image
              source={{uri: userInfo.user.photo}}
              style={styles.userImage}
            />
            <Text style={styles.userName}>{userInfo.user.name}</Text>
            <Text style={styles.userEmail}>{userInfo.user.email}</Text>
            {userRole && <Text style={styles.userRole}>{userRole}</Text>}
          </View>
        ) : (
          <View>
            <TouchableOpacity
              style={styles.googleSignInButton}
              onPress={() => signInWithGoogle()}>
              <View style={styles.buttonContent}>
                <Icon name="google" size={24} color="white" />
                <Text style={styles.buttonText}>Sign In with Google</Text>
              </View>
            </TouchableOpacity>
            <LoginButton
              onLoginFinished={(error, result) => {
                if (error) {
                  console.log('Login has error: ' + result.error);
                } else if (result.isCancelled) {
                  console.log('Login is cancelled.');
                } else {
                  AccessToken.getCurrentAccessToken().then(data => {
                    console.log(data.accessToken.toString());
                  });
                }
              }}
              onLogoutFinished={() => console.log('Logout.')}
            />
          </View>
        )}
        {userInfo && (
          <TouchableOpacity
            style={styles.signOutButton}
            onPress={() => signOut()}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

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
  userRole: {
    fontSize: 16,
    marginTop: 5,
  },
  googleSignInButton: {
    backgroundColor: '#4285F4',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginTop: 20,
  },
});

export default UnifiedLogin;
