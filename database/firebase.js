import { initializeApp } from 'firebase/app';
import {initializeFirestore, getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDpb_12ckKbpkcrJ4FtC5w_bOO39tryfOs",
    authDomain: "fir-c7269.firebaseapp.com",
    projectId: "fir-c7269",
    storageBucket: "fir-c7269.appspot.com",
    messagingSenderId: "993045097452",
    appId: "1:993045097452:web:f9f20bed35d29e814f6ec9"
  };

const firebase = initializeApp(firebaseConfig);
/*const db = initializeFirestore(firebase,{
    experimentalForceLongPolling: true
})*/
//const db = initializeFirestore(firebase);  /// media noche para encontrar este error
const db = getFirestore(firebase);


export {db};
export default firebase;