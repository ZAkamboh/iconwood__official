// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyAXBS3tatWQOxH7lgZwaByg649rm0HcuJw",
    authDomain: "iconwood-website.firebaseapp.com",
    projectId: "iconwood-website",
    storageBucket: "iconwood-website.appspot.com",
    messagingSenderId: "435259122656",
    appId: "1:435259122656:web:eac96322d0c8e4011b4185",
    measurementId: "G-YTZZZD06KC"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  const  database = firebase.database()
  
  export { db, auth,storage,database };