
import {initializeApp} from 'firebase/app';

import 'firebase/firestore';
import {getAuth,signInWithPopup,onAuthStateChanged,signOut} from 'firebase/auth';
import { doc,setDoc,getDoc,getFirestore} from 'firebase/firestore';

 const firebaseConfig = {
    apiKey: "AIzaSyCkgLe7FW6b5SY_n8id_r5rGlBysgNr1lU",
    authDomain: "scapula-57ce3.firebaseapp.com",
    projectId: "scapula-57ce3",
    storageBucket: "scapula-57ce3.appspot.com",
    messagingSenderId: "875575930594",
    appId: "1:875575930594:web:803cd46468ea6c54c878bb",
    measurementId: "G-5FV4H4KZQQ"
  };



export const app =initializeApp(firebaseConfig);
export const db = getFirestore();