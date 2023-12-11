// Import the functions you need from the SDKs you need
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSohLVuI34VeshI5Jd97dEp1jbt1DRbaE",
  authDomain: "mantrickweb.firebaseapp.com",
  projectId: "mantrickweb",
  storageBucket: "mantrickweb.appspot.com",
  messagingSenderId: "882769945477",
  appId: "1:882769945477:web:42f3f29347b8088b759aec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
