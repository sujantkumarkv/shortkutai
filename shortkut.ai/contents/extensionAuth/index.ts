import { onAuthStateChanged, signInWithCustomToken } from "@firebase/auth"

import authClient from "../../background/firebase/firebaseAuth"


async function removeItemFromStorage(key: string): Promise<void> {
  await chrome.storage.sync.remove(key)
}

async function getItemFromStorage(key: string): Promise<string | null> {
  const resp = await chrome.storage.sync.get(key)
  if (resp[key]) {
    return resp[key]
  }

  return null
}

export async function signoutClearStorage() {
  try {
    await chrome.storage.sync.remove(["authCustomToken", "emailkey", "uidkey"]);
  } catch (error) {
    console.error("Error during signout:", error);
    throw error;
  }
}

export async function initExtensionAuth(extensionToken: string) {
  // token as the source of truth for user auth state
  const token: string = await getItemFromStorage("authCustomToken")
  if (token === extensionToken)
    console.log("token from storage is same as newToken from message passing")
  if (!extensionToken) {
    // token not present so remove any previously signed in user
    await authClient.signOut()
  }
  // token is present
  else {
    const user = authClient.currentUser
    // console.log("user from authClient.currentUser", user)
    if (!user) {
      // token is present but user is not logged in, so login user via firebase auth
      try {
        const credential = await signInWithCustomToken(authClient, extensionToken)
        console.log(
          "credential from signInWithCustomToken in bg script",
          credential
        )
        return credential
      } catch (e: any) {
        // await removeItemFromStorage("authCustomToken")
        return `errrror: ${e}`
      }
    }
  }
}
