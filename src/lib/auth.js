// Config section for Firebase Authentication using Google Sign-In
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from 'firebase/auth';

import { app } from '../config/firebase';

const auth = getAuth(app);

const provider = new GoogleAuthProvider();


// Function to handle Google Sign-In

export const loginGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Error during Google login:", error);
    return null;
  }
};

export const logout = () => signOut(auth);
