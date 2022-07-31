import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

const firebaseConfig = {

    apiKey: "AIzaSyCpFoNvh69qSYwf-dKwE7Np7Mi0szSeLj0",

    authDomain: "reels-e926a.firebaseapp.com",

    projectId: "reels-e926a",

    storageBucket: "reels-e926a.appspot.com",

    messagingSenderId: "329557440193",

    appId: "1:329557440193:web:e0100fe4e227b1eba0c640"

};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const firestore = firebase.firestore();
export const database = {
    users: firestore.collection('users'),
    posts: firestore.collection('posts'),
    comments: firestore.collection('comments'),
    getTimeStamp: firebase.firestore.FieldValue.serverTimestamp,
}

export const storage = firebase.storage()