import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { authClient } from "./firebase";

// signup new users
export async function signup(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      authClient,
      email,
      password
    );
    // Signed in
    const user = userCredential.user;
    console.log("userCredential", userCredential.user.accessToken);
    console.log("signup user.getIdtoken", user.getIdToken());
    return user.getIdToken();
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error);
    alert(errorMessage);
    return null;
  }
}

// signin existing users
export async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      authClient,
      email,
      password
    );
    // Signed in
    const user = userCredential.user;
    console.log("userCredential", userCredential);
    return user.getIdToken();
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error);
    return null;
  }
}

// authenticate with google
// const auth = getAuth();
export async function googleLogin() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(authClient, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.user.accessToken; // this is wrong statement, property doesn't exist
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;

      // credential.idToken & credential.accessToken exists & are diff
      // user.accessToken exists & not equal to above.
      // will have to see which works (user.accessToken works)

      // console.log("signin result.credential", result); // result.credential is null, doesn't exist.
      // console.log("googleLogin credential", credential);
      // console.log("googleLogin token", token);
      return user.accessToken;
    })
    .catch((error) => {
      // // The email of the user's account used.
      // const email = error.customData.email;
      // The AuthCredential type that was used.
      const credentialErr = GoogleAuthProvider.credentialFromError(error);
      console.log("credential error", credentialErr);
      console.log("signin with popup error", error);
      return error;
    });
}

// track user auth state
export function authStateObserver() {
  return onAuthStateChanged(authClient, (user) => {
    if (user) {
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      console.log("user is signed in");
    } else {
      // User is signed out
      console.log("user is signed out");
    }
  });
}
