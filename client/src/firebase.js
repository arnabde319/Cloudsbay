import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCklwHL_xQQ9kVG1lZAWLsVj8O0ANyqdGw",
    authDomain: "ecommerce-ab299.firebaseapp.com",
    projectId: "ecommerce-ab299",
    storageBucket: "ecommerce-ab299.appspot.com",
    messagingSenderId: "630356320586",
    appId: "1:630356320586:web:76184c194a35b5896421b3"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();

