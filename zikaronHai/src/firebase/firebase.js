import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';
import 'firebase/auth';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBxG-SVvWBmlLE1GsWRkU2_ib_tt3cLPEM",
    authDomain: "zikaronhai.firebaseapp.com",
    databaseURL: "https://zikaronhai.firebaseio.com",
    projectId: "zikaronhai",
    storageBucket: "zikaronhai.appspot.com",
    messagingSenderId: "212977596137"
};

firebase.initializeApp(config);

const storage = firebase.storage();
const fbData = firebase.database();
const dBRefImages = fbData.ref().child('images');
const dBRefUsers = fbData.ref().child('users');
const auth = firebase.auth();


export {
    storage, dBRefImages, fbData, auth, firebase, dBRefUsers
}
