import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBXZcVHQ9WwT8t1u9LLLBYMjlEfy0qzX8A",
    authDomain: "clone-f1bb4.firebaseapp.com",
    projectId: "clone-f1bb4",
    storageBucket: "clone-f1bb4.appspot.com",
    messagingSenderId: "440909175501",
    appId: "1:440909175501:web:89a3e395828304e321e784",
    measurementId: "G-XQR3VZX9SF"
  };

  const firebaseApp=firebase.initializeApp(firebaseConfig);
  const db=firebaseApp.firestore();
  const auth=firebase.auth();

  export {db,auth};

