import LoginScreen from './screens/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import ProfileScreen from './screens/ProfileScreen';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import RegisterScreen from './screens/RegisterScreen';
import ObjectsScreen from './screens/ObjectsScreen';

// TODO: Navigation Container
const Stack = createNativeStackNavigator();

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("User is logged in:", user);
        setIsLoggedIn(true);
      } else {
        // No user is signed in.
        console.log("No user is logged in.");
        setIsLoggedIn(false);
      }
    });

    //TODO: research how to convert this code to use a useContext hook (better practice)
    
  }, []);

  return (
    <NavigationContainer>
      { isLoggedIn ? (
          <Stack.Navigator initialRouteName="Profile">
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Objects" component={ObjectsScreen} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
        )
      }
    
    </NavigationContainer>
  );
}

// 1. Setup the navigation for when a user is logged out
// 2. Setup the navigation for when a user is logged in
// 3. Listen to whether the user is logged in or not