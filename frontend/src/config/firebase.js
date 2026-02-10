import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCzTL6s2n7YAmH-5fJbuuGpITsRE084Zk8",
  authDomain: "medibook-4171a.firebaseapp.com",
  projectId: "medibook-4171a",
  storageBucket: "medibook-4171a.firebasestorage.app",
  messagingSenderId: "651124927009",
  appId: "1:651124927009:web:cd0377a68da0760d1e9160",
  measurementId: "G-ZRNG95ZF9Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
