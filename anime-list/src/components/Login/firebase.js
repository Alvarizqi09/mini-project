import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC6rpygCySEUNSmjjCo9YYDm4LPHS8ZpbI",
  authDomain: "vilumeanime.firebaseapp.com",
  projectId: "vilumeanime",
  storageBucket: "vilumeanime.appspot.com",
  messagingSenderId: "487785993957",
  appId: "1:487785993957:web:b9ed24bcb0f56d89c3a60c"
};

const app = initializeApp(firebaseConfig);
export const database = getAuth(app);