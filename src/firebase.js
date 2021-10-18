// import { initializeApp } from 'firebase/app';
// import { GoogleAuthProvider } from "firebase/auth";
// import { getAuth, signInWithPopup, } from "firebase/auth";
// //import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyD8TACkbMEQAYrGCHaYvF9ock3WAQe9LfQ",
//   authDomain: "practice-38605.firebaseapp.com",
//   projectId: "practice-38605",
//   storageBucket: "practice-38605.appspot.com",
//   messagingSenderId: "439078289734",
//   appId: "1:439078289734:web:2f228c5ad585e5ff792547"
// };

// const app = initializeApp(firebaseConfig);
// //const auth = app.auth();
// const db = getStorage(app);


// const provider = new GoogleAuthProvider();



// const auth = getAuth();
// auth.languageCode = 'it';

// sign in with google
//const googleProvider = new firebase.auth.GoogleAuthProvider();



import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import "firebase/compat/storage"


const firebaseConfig = {
  apiKey: "AIzaSyD8TACkbMEQAYrGCHaYvF9ock3WAQe9LfQ",
  authDomain: "practice-38605.firebaseapp.com",
  projectId: "practice-38605",
  storageBucket: "practice-38605.appspot.com",
  messagingSenderId: "439078289734",
  appId: "1:439078289734:web:2f228c5ad585e5ff792547"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();


//sign in with google
const googleProvider = new firebase.auth.GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await auth.signInWithPopup(googleProvider);
    console.log("response: ", res)
    const user = res.user;
    const query = await db
      .collection("users")
      .where("uid", "==", user.uid)
      .get();
    if (query.docs.length === 0) {
      await db.collection("users").add({
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};


//signin with email and password
const signInWithEmailAndPassword = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

//registering a user with an email and password:
const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, password);
      const user = res.user;
      await db.collection("users").add({
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

//Create a function that will send a password reset link to an email address:
const sendPasswordResetEmail = async (email) => {
    try {
      await auth.sendPasswordResetEmail(email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };


//the logout function:
  const logout = () => {
    auth.signOut();
  };

  export {
    auth,
    db,
    signInWithGoogle,
    signInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordResetEmail,
    logout,
  };