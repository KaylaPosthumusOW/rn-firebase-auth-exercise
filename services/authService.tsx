// TODO: Create Firebase Auth Functions

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from "../firebase"

export const loginUser = (email: string, password: string) => {

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            
            console.log("User logged in:", user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.log("Error logging in:", errorMessage);
        });
}

export const registerUser = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Registered
            const user = userCredential.user;
            console.log("User registered:", user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.log("Error registering:", errorMessage);
        });
}

export const LogOutUser = () => {
    signOut(auth)
        .then(() => {
            console.log("User logged out successfully.");
        })
}

export const getUserInfo = () => {
    const user = auth.currentUser;
    if (user) {
        return user
    } else {
        return null;
    }
}