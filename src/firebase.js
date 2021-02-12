import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyClwaOKd4eLsrlpnrhTfxtSwp7ef6bDMQY",
  authDomain: "whatsapp-clone-65026.firebaseapp.com",
  projectId: "whatsapp-clone-65026",
  storageBucket: "whatsapp-clone-65026.appspot.com",
  messagingSenderId: "517127730259",
  appId: "1:517127730259:web:2028f7380ed8e22ea542a6",
  measurementId: "G-KBGEMQ6KPE"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;