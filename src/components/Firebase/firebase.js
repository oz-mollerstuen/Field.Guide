

import app from 'firebase/compat/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyD_X-MjuRIH4PhvcJ1UVD1H336EaF9brbk",
  authDomain: "field-guide-47799.firebaseapp.com",
  projectId: "field-guide-47799",
  storageBucket: "field-guide-47799.appspot.com",
  messagingSenderId: "763269074073",
  appId: "1:763269074073:web:9d819d0b4aae994967bc08"
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

    doSignOut = () => 
        this.auth.signOut();

    doPasswordReset = email => 
        this.auth.sendPasswordResetEmail(email);
    
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
    }
}

export default Firebase;