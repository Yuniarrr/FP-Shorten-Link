import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAA5ltQPo1IIksZYKv2i5agdt1EquW3vAI",
  authDomain: "fp-pweb22.firebaseapp.com",
  projectId: "fp-pweb22",
  storageBucket: "fp-pweb22.appspot.com",
  messagingSenderId: "391783335843",
  appId: "1:391783335843:web:2307b8a085fb48d1d33c16",
  measurementId: "G-VR1C6V8EKK"
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();
export const config = firebaseConfig;