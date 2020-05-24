import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

var config = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: "safenotes-bb42b.firebaseapp.com",
    databaseURL: "https://safenotes-bb42b.firebaseio.com",
    projectId: "safenotes-bb42b",
    storageBucket: "safenotes-bb42b.appspot.com",
    messagingSenderId: "327547040246",
    appId: "1:327547040246:web:18869d42525004f46917d7",
    measurementId: "G-Z89FDF38LH"
};
firebase.initializeApp(config);
firebase.firestore();

export default firebase;