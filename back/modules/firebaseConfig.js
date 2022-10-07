const { initializeApp } = require('firebase/app');
const { getDatabase, ref, onChildAdded, set, get } = require('firebase/database');
const firebaseConfig = {
    apiKey: "AIzaSyBz9iJl2SDU9NAgzDcMp7vP0OLdWRL9inU",
    authDomain: "youthvisionkr.firebaseapp.com",
    databaseURL: "https://youthvisionkr-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "youthvisionkr",
    storageBucket: "youthvisionkr.appspot.com",
    messagingSenderId: "872270613716",
    appId: "1:872270613716:web:47cc7435673ac20834bf41",
    measurementId: "G-RV8DQS8YX7"
  };
initializeApp(firebaseConfig);
const fireDB = getDatabase();

function writeUserData(userId, name) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      username: name,
    });
  }
export {};