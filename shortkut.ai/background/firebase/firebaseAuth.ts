import { initializeApp } from "firebase/app"
// import { getAnalytics } from "firebase/analytics";
import {
  browserLocalPersistence,
  getAuth,
  onAuthStateChanged,
  setPersistence
} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDJf4U7I_qBd1T_UHwFzSVpHFq_w6s_FjA",
  authDomain: "shortkutai-389803.firebaseapp.com",
  projectId: "shortkutai-389803",
  storageBucket: "shortkutai-389803.appspot.com",
  messagingSenderId: "443649116576",
  appId: "1:443649116576:web:cd0df5c859b80dda767cc5",
  measurementId: "G-1TE3F121KJ"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const authClient = getAuth(app)
setPersistence(authClient, browserLocalPersistence)

export default authClient

