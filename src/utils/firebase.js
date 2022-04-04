// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
	getFirestore,
} from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
	apiKey: 'AIzaSyBHkNzfAffxlDfgAjhnS-abKsxmZxKfBqw',
	authDomain: 'todolist-b19e9.firebaseapp.com',
	projectId: 'todolist-b19e9',
	storageBucket: 'todolist-b19e9.appspot.com',
	messagingSenderId: '34798461552',
	appId: '1:34798461552:web:43e1fd2b9ac5ee3526cab5',
	measurementId: 'G-65DL9R46SN',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseDB = getFirestore(firebaseApp);
const firebaseAuth = getAuth();
const firebaseFunctions = getFunctions();

export {
	firebaseApp,
	firebaseDB,
	firebaseAuth,
	firebaseFunctions,
};
