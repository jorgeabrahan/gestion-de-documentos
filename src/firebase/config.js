import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyB6MkIQ8u2IQFo_tI3Wk0dKCMBzpX0wZs4",
  authDomain: "gestion-de-documentos-8c4a4.firebaseapp.com",
  projectId: "gestion-de-documentos-8c4a4",
  storageBucket: "gestion-de-documentos-8c4a4.appspot.com",
  messagingSenderId: "754809159697",
  appId: "1:754809159697:web:2a164e94ddfa9eb499b1b0"
};

export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp)