// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCnU4sBfMlEAcbYoSUBULpTHIu_ZDLBshQ",
  authDomain: "fir-course-ef4e7.firebaseapp.com",
  projectId: "fir-course-ef4e7",
  storageBucket: "fir-course-ef4e7.appspot.com",
  messagingSenderId: "6054044232",
  appId: "1:6054044232:web:90f75886e52d87210dae7d",
  measurementId: "G-83NBVNN20H",
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

export const db = getFirestore(app)
export const storage = getStorage(app)
