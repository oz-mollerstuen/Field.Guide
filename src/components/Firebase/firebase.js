import app from 'firebase/compat/app';
import 'firebase/auth';
import 'firebase/database';


const config = {
    apiKey: "REACT_APP_API_KEY",
    authDomain: "REACT_APP_AUTH_DOMAIN",
    projectId: "REACT_APP_PROJECT_ID",
    storageBucket: "REACT_APP_STORAGE_BUCKET",
    messagingSenderId: "REACT_APP_MESSAGING_SENDER_ID",
    appId: "REACT_APP_APP_ID",
    measurementId: "REACT_APP_MEASUREMENT_ID"
  };

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
  }

  /*** Authentication  ***/
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  /*** Database ***/
  user = uid => this.db.ref(`users/${uid}`);
  users = () => this.db.ref('users');

  addActivity = (uid, activity) => {
    const ref = this.db.ref().child(`users/${uid}/activities`);
    ref.push(activity);
  };

  updateActivity = (uid, activity, activityKey) => {
    const ref = this.db.ref().child(`users/${uid}/activities/${activityKey}`);
    ref.update(activity);
  };
}

export default Firebase;
