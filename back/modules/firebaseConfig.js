// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBz9iJl2SDU9NAgzDcMp7vP0OLdWRL9inU",
  authDomain: "youthvisionkr.firebaseapp.com",
  projectId: "youthvisionkr",
  storageBucket: "youthvisionkr.appspot.com",
  messagingSenderId: "872270613716",
  appId: "1:872270613716:web:47cc7435673ac20834bf41",
  measurementId: "G-RV8DQS8YX7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function writeUserData(userId, name) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      username: name,
    });
  }

  module.exports = database;