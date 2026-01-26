import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // নতুন ইমপোর্ট

const firebaseConfig = {
    apiKey: "AIzaSyADVS82dzE-nt9aiq1P-K-RJQtHP2Da1Yo",
    authDomain: "portfolio-shadow-monarch.firebaseapp.com",
    projectId: "portfolio-shadow-monarch",
    storageBucket: "portfolio-shadow-monarch.firebasestorage.app",
    messagingSenderId: "666327536437",
    appId: "1:666327536437:web:fe51ad943a4dc05eccb27c"
};

export const app = initializeApp(firebaseConfig);

// এগুলো এক্সপোর্ট করুন যাতে Login কম্পোনেন্টে ব্যবহার করা যায়
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();