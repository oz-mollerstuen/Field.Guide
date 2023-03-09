// import { initializeApp } from 'firebase/app';
import firebaseCompat from 'firebase/compat/app';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const config = {
  apiKey: "AIzaSyD_X-MjuRIH4PhvcJ1UVD1H336EaF9brbk",
  authDomain: "field-guide-47799.firebaseapp.com",
  projectId: "field-guide-47799",
  storageBucket: "field-guide-47799.appspot.com",
  messagingSenderId: "763269074073",
  appId: "1:763269074073:web:9d819d0b4aae994967bc08"
};
const app = firebaseCompat.initializeApp(config);

class Firebase {
  constructor() {
    this.auth = app.auth();
    this.db = app.firestore();
   
  }

  /*** Authentication  ***/
  doCreateUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(this.auth, email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    signInWithEmailAndPassword(this.auth, email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => sendPasswordResetEmail(this.auth, email);

  /*** Database ***/
  user = uid => this.db.collection('users').doc(uid);
  users = () => this.db.collection('users');

  addActivity = (uid, activity) => {
    const ref = this.db.collection('users').doc(uid).collection('activities');
    ref.add(activity);
  };

  updateActivity = (uid, activityId, activity) => {
    const ref = this.db.collection('users').doc(uid).collection('activities').doc(activityId);
    ref.set(activity, { merge: true });
  };
}

export const mainFirebase = new Firebase()
export default Firebase;
