import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyB6nywCCST_HFjLRHJZl0XE9TXsf72rqpI',
    authDomain: 'music-f6e93.firebaseapp.com',
    projectId: 'music-f6e93',
    storageBucket: 'music-f6e93.appspot.com',
    appId: '1:671056328288:web:c8abd445fb6b61addbf505'
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

const usersCollection = db.collection('users');
const songsCollection = db.collection('songs');
const commentsCollection = db.collection('comments');

export {
    auth,
    db,
    usersCollection,
    songsCollection,
    commentsCollection,
    storage
};