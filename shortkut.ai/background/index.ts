import { onAuthStateChanged } from "firebase/auth"
import { send } from "process"

import { initExtensionAuth } from "../contents/extensionAuth"
import authClient from "./firebase/firebaseAuth"
import { onMessageHandler } from "./handlers/onMessageHandlers"
import { portOnMessageListener } from "./handlers/portOnMessageListener"
import { getDataFromStorage, setDataInStorage } from "./utils/storage"

// checks user status
export let isUser = false
onAuthStateChanged(authClient, async (firebaseUser) => {
  if (firebaseUser) {
    isUser = true
    console.log("user is logged in", firebaseUser)
  } else {
    isUser = false
    console.log("user is logged out")
  }
})

chrome.runtime.onInstalled.addListener((reason) => {
  if (reason.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    console.debug("installed")
    chrome.tabs.create({ url: "options.html" }, (tab: any) => {
      if (tab.id === undefined) return
      chrome.tabs.update(tab.id, { active: true })
    })
  }
})

chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, { action: "TOGGLE" })
})

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.debug(request)

  onMessageHandler(request, sendResponse)

  return true
})

chrome.runtime.onConnect.addListener(function (port) {
  console.debug("Connected .....")

  port.onMessage.addListener(portOnMessageListener(port))

  port.onDisconnect.addListener(function () {
    console.debug("Disconnected .....")
  })
})

// handle authentication after receiving message from options.html
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const action = request.action
  switch (action) {
    case "handleAuth": {
      console.log("handleAuth entered")
      // remove old listener if exists
      chrome.tabs.onUpdated.removeListener(parseToken)
      // create a new auth tab in webapp
      chrome.tabs
        .create({
          url: request.url,
          active: true
        })
        .then((tab) => {
          console.log("tab created & calling parsetoken")
          chrome.tabs.onUpdated.addListener(parseToken)
          sendResponse(request.action + " is executed")
        })

      break
    }

    case "extensionAuth": {
      initExtensionAuth(request.token).then((credential) => {
        console.log(
          "credential received with signInWithCustomToken",
          credential
        )
        sendResponse(credential)
      })
      // credential received
      // console.log("credential received, testing before sending to background", credential)
      // sendResponse({credential})
      // need to return true from onMessage event listener to indicate that you will respond async.
      // This keeps the sendResponse function valid after the listener returns.
      return true
    }

  }
})

const parseToken = async (
  tabId: number,
  changeInfo: chrome.tabs.TabChangeInfo,
  tab: chrome.tabs.Tab
) => {
  // tab is loaded
  console.log("parseToken entered")
  if (tab.status === "complete") {
    console.log("tab.status complete entered in background service worker")
    if (!tab.url) return
    const url = new URL(tab.url)
    console.log("tab.url: ", tab.url)
    console.log("change info: ", changeInfo)
    // at this point, user must have been authenticated in webapp
    // if (url.origin === "https://shortkut.ai") {
    if (/https:\/\/www\.?shortkut\.ai/.test(url.origin)) {
      console.log("url.origin is entered")
      const params = new URL(url.href).searchParams
      const token = params.get("custom_token")
      const email = params.get("email")
      const uid = params.get("uid")

      if (token) {
        console.log("token received from url")

        // if (tab.id) await chrome.tabs.remove(tab.id)
        // store the token & user info in chrome storage
        const key = "authCustomToken"
        const emailkey = "emailkey"
        const uidkey = "uidkey"

        /* If syncing is enabled, the data is synced to any Chrome browser 
          that the user is logged into. If disabled, it behaves like storage.local.
          When the browser is offline, Chrome stores the data locally and resumes 
          syncing when it's back online. The quota limitation is 100 KB approx, 
          8 KB per item. Consider using it to preserve user settings across synced browsers. */
        // await chrome.storage.sync.set({
        //   [key]: token,
        //   [emailkey]: email,
        //   [uidkey]: uid
        // })

        await setDataInStorage({
          "authCustomToken": token,
          "emailkey": email,
          "uidkey": uid
        });

        console.log(
          "token & info stored in chrome storage",
          chrome.storage.sync.get(key),
          chrome.storage.sync.get(emailkey),
          chrome.storage.sync.get(uidkey)
        )
        // remove listener after token is set
        chrome.tabs.onUpdated.removeListener(parseToken)
      }
    }
  }
}

// // listen for changes to storage & initiate auth for extension
// chrome.storage.onChanged.addListener(function (changes, namespace) {
//   for (let key in changes) {
//     let storageChange = changes[key]
//     if (key === "authCustomToken" && storageChange.newValue) {
//       console.log(
//         "listening to chrome.storage changes, now calling initExtensionAuth()",
//         changes
//       )
//       const Token = storageChange.newValue

//       // console.log("newToken in bg script", Token)
//       // sendMessage to content script as background have no access to 'window' object & its required by firebase.
//       // try {
//       //   chrome.runtime.sendMessage(
//       //     { action: "extensionAuth", token: Token },
//       //     function (response) {
//       //       console.log("credential received in background script", response)
//       //     }
//       //   )
//       // } catch (error) {
//       //   console.log("error go brr", error)
//       // }

//       // trying different approach to directly store user info in storage for extension
//       try {
//         setTimeout(() => {
//           chrome.runtime.sendMessage(
//             { action: "userInfoChanges", userInfoChanges: changes },
//             async function (response) {
//               console.log("user info changes sent", response)
//             }
//           )
//         }, 5000)
//       } catch (error) {
//         console.log("error to send changes", error)
//       }
//     }
//   }
// })
