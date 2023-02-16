// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyCHtv4INQw0-zmCDzFVrNpcncqY2NmneOk',
    authDomain: 'house-marketplace-app-24a9c.firebaseapp.com',
    projectId: 'house-marketplace-app-24a9c',
    storageBucket: 'house-marketplace-app-24a9c.appspot.com',
    messagingSenderId: '971795978173',
    appId: '1:971795978173:web:e64d359050f02452c164d4',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
