// インポート対象のFirebaseApp,Auth,Firestore,FirebaseStorageはTypeScriptの型です
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// import.meta.env~で先ほど.envファイルに入力したfirebaseConfigの値を参照しています
const firebaseConfig = {
    apiKey: "AIzaSyC1W3pwtYJuVyncqDHnHMMY_5Ct7nG5Kos",
    authDomain: "tabekiri-app.firebaseapp.com",
    databaseURL: "https://tabekiri-app-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "tabekiri-app",
    storageBucket: "tabekiri-app.appspot.com",
    messagingSenderId: "74541359139",
    appId: "1:74541359139:web:295737317debbaabbbd196",
    measurementId: "G-P4E9BNWW57"
};

// NOTE >> Firebaseの初期化を行います。
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
