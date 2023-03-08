
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import firebase from 'firebase/app';
const config = {
  apiKey: 'AIzaSyD_X-MjuRIH4PhvcJ1UVD1H336EaF9brbk',
  authDomain: 'field-guide-47799.firebaseapp.com',
  projectId: 'field-guide-47799',
  storageBucket: 'field-guide-47799.appspot.com',
  messagingSenderId: '763269074073',
  appId: '1:763269074073:web:9d819d0b4aae994967bc08',
};
firebase.initializeApp(config);
 const app = initializeApp(config);
const db = getFirestore(app);
const auth = getAuth(app);

class Firebase {
  constructor() {
   
    this.auth = getAuth(app);
    this.db = getFirestore(app);
  }

  /*** Authentication  ***/
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

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

export default Firebase;
