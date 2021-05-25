import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyCC0yatfO-cU8l9RrrPI4PKZpTZCt8Y4C8",
  authDomain: "elastic-e1db0.firebaseapp.com",
  projectId: "elastic-e1db0",
  storageBucket: "elastic-e1db0.appspot.com",
  messagingSenderId: "189585229069",
  appId: "1:189585229069:web:e66dfcdf7b0a307dee5c44",
  measurementId: "G-KW5N5GQCYD"
};
firebase.initializeApp(firebaseConfig)

const db = firebase.database()
const auth = firebase.auth()

export { db, auth }