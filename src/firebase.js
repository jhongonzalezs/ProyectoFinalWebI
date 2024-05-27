import app from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAHE7IJA30AesaSRMXvKSLp4Tk9u-juLSY",
  authDomain: "proyectofinal-5858a.firebaseapp.com",
  projectId: "proyectofinal-5858a",
  storageBucket: "proyectofinal-5858a.appspot.com",
  messagingSenderId: "862293890744",
  appId: "1:862293890744:web:1147dd05b9dc00740d464d"
};

// Initialize Firebase
app.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = app.auth();

export {db,auth}
