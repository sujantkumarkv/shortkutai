import { Drawer, createEmotionCache } from "@mantine/core"
import { useDisclosure, useTimeout } from "@mantine/hooks"
import type { PlasmoCSConfig } from "plasmo"
import { createContext, useContext, useEffect, useRef, useState } from "react"

import Sidebar from "~components/Sidebar"
import { initCommandData } from "~constants"
import { faqData, mainLinksMockdata } from "~constants/sidebar"
import getShortkuts from "~hooks/getShortkuts"
import { ThemeProvider } from "~theme"
import type { ICommand } from "~types"
import cmdIsSimilar from "~utils/cmdAlreadyExists"

import handleKeyDown from "./utils/handleKeyDown"
import onMessageHandler from "./utils/onMessageCallback"

import "./css/drawerScroll.css"

import { send } from "process"
import React from "react"

import authClient from "~background/firebase/firebaseAuth"
import Chat from "~chatbotui/components/Chat"
import LogoPlacedOnSite from "~components/LogoPlacedOnSite"

import type { SelectedTextContextValue } from "../chatbotui/types"

// import { initExtensionAuth } from "./extensionAuth"

export const config: PlasmoCSConfig = {
  matches: ["https://*/*", "http://*/*"],
  css: ["css/content.css"]
}

const styleElement = document.createElement("style")

const styleCache = createEmotionCache({
  key: "plasmo-mantine-cache",
  prepend: true,
  container: styleElement
})

export const getStyle = () => styleElement

export const SelectedTextContext =
  createContext<SelectedTextContextValue>(undefined)

export const UserInfoContext = React.createContext(null)

// first sign out from firebase
// const signout = async (message: string) => {
//   try {
//     if (message === "signout") {
//       console.log("signout message received in content script")
//       await authClient.signOut()
//       // setUserInfo({})
//       return { success: true, message: "firebase signout success" }
//       // sendResponse({ success: true, message: "firebase signout success" })
//     }
//   } catch (error) {
//     // sendResponse({
//     //   success: false,
//     //   message: "firebase signout failed, error: " + error
//     // })
//     return { success: false, message: "firebase signout failed, error: " + error }
//   }
// }

function PlasmoOverlay() {
  const [opened, { close, toggle }] = useDisclosure(false)
  const isQuerying = useRef<boolean>(false)
  const [shortkutData, setShortkutData] = useState<ICommand[]>([])
  const toggleRef = useRef(toggle)

  const [scrollPosition, setScrollPosition] = useState(0) // to maintain the window scroll on sidebar toggle
  const [isLogoVisible, setIsLogoVisible] = useState(true)
  // New state variable for selected text
  const [selectedText, setSelectedText] = useState<string>("")
  const [userInfo, setUserInfo] = useState({})

  const setIsQuerying = (value: boolean) => {
    isQuerying.current = value
  }

  const addNewCommand = (command: ICommand) => {
    setShortkutData((prev) => {
      const alreadyExists = prev.some((cmd) => cmdIsSimilar(cmd, command))

      if (alreadyExists) {
        console.log("already exists")
        return prev
      }

      return [...prev, command]
    })
  }

  const editCommand = (command: ICommand, prevCmd: string) => {
    setShortkutData((prev) => {
      return prev.map((cmd: ICommand) => {
        if (cmd.commands.includes(prevCmd)) {
          return command
        }

        return cmd
      })
    })
  }

  const deleteCommand = (command: ICommand) => {
    setShortkutData((prev) => {
      return prev.filter((cmd) => !cmd.commands.includes(command.commands[0]))
    })
  }

  useEffect(() => {
    chrome.runtime.sendMessage(
      { message: "initFetchResponse" },
      async function (response: any) {
        console.log(response)
        console.debug("shortkuts are set to " + response)
      }
    )
  }, [])

  useEffect(() => {
    if (shortkutData.length > 0) {
      return
    }

    const handleQueryCallback = (data: ICommand[]) => {
      setShortkutData(data)
    }

    getShortkuts({
      setData: handleQueryCallback
    })
  }, [])

  useEffect(() => {
    toggleRef.current = toggle

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      onMessageHandler({ sidebartoggle: toggle }, message, sender, sendResponse)
    })
    // tried to fix the autoscroll to top on sidebar toggle
    // if(opened){
    //   document.body.classList.add('drawerScroll')
    //   setScrollPosition(window.scrollY)
    // } else {
    //   document.body.classList.remove('drawerScroll')
    //   window.scrollTo(0, scrollPosition)
    // }
    // }, [toggle, opened]
  }, [toggle])

  useEffect(() => {
    const handleKeyDownCallback = (e: KeyboardEvent) => {
      handleKeyDown(
        e,
        toggleRef.current,
        isQuerying.current,
        setIsQuerying,
        initCommandData
      )
    }

    document.addEventListener("keydown", handleKeyDownCallback, true)

    return () => {
      document.removeEventListener("keydown", handleKeyDownCallback, true)
    }
  }, [])

  // text selection
  useEffect(() => {
    const handleTextSelection = (e: any) => {
      // text selected in sidebar's textarea is also considered & this behavior isnt desired
      // if sidebar is 'opened' & the event comes from a textarea, possibly from sidebar, then return
      if (
        document.activeElement &&
        document.activeElement.id === "shortkut-sidebar-textarea"
      ) {
        // The sidebar textarea is focused, do not process the selection
        return
      }

      const text = window.getSelection()?.toString()
      if (!text) return
      setSelectedText(text)
      console.log(text)

      // also pass selectedText prop to the ChatInput component
      // <ChatInput selectedText={selectedText} />
      // sendSelectedText(selectedText);
    }
    document.addEventListener("selectionchange", handleTextSelection)
    return () => {
      document.removeEventListener("selectionchange", handleTextSelection)
    }
  }, [])

  // function to handle logo click
  function handleLogoClick() {
    // Open the sidebar and paste the selected text into the textarea
    toggle()
    setSelectedText("")
    // Remove the logo here
  }

  // listen for changes to storage & initiate auth for extension
  // let userInfo = {}

  useEffect(() => {
    const handleStorageChange = (changes, namespace) => {
      console.log("Changes in chrome storage: ", changes)
      if (changes?.authCustomToken?.newValue) {
        setUserInfo({
          authCustomToken: changes.authCustomToken?.newValue,
          email: changes.emailkey?.newValue,
          uid: changes.uidkey?.newValue
        })

        // userInfo["authCustomToken"] = changes.authCustomToken?.newValue
        // userInfo["email"] = changes.emailkey?.newValue
        // userInfo["uid"] = changes.uidkey?.newValue
      }
    }
    chrome.storage.onChanged.addListener(handleStorageChange)

    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange)
    }
  }, [])

  // Content script
  useEffect(() => {
    chrome.runtime.sendMessage({ message: "getUserInfo" }, function (response) {
      console.log("yo Response: ", response)
      setUserInfo(response?.userInfo)
    })
  }, [])

  useEffect(() => {
    // console.log("userInfo changed: ", userInfo["authCustomToken"])
    // console.log("userInfo changed: ", userInfo.authCustomToken)
    console.log(
      "userInfo changed: ",
      userInfo
      // userInfo["authCustomToken"],
      // userInfo["email"],
      // userInfo["uid"]
    )
    setUserInfo(userInfo)
  }, [userInfo])


  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.message === "signout"){
      authClient.signOut().then(() => {
        setUserInfo({})
        sendResponse({success: true, message: "firebase signed out"})
      }).catch((error) => {
        sendResponse({success: false, message: "firebase signout error: " + error})
      })
    }
    return true
  })

  return (
    <>
      <LogoPlacedOnSite
        onClick={toggle} /*onClose={setIsLogoVisible(false)}*/
      />
      <ThemeProvider emotionCache={styleCache}>
        <UserInfoContext.Provider value={userInfo}>
          <Drawer
            opened={opened}
            onClose={close}
            withCloseButton={true}
            // overlayProps={{ opacity: 0.5, blur: 0}}
            withOverlay={false}
            position="right"
            size="35%"
            closeOnClickOutside={false}
            closeOnEscape={true}>
            <Sidebar
              items={mainLinksMockdata}
              shortkutData={shortkutData}
              addNewCommand={addNewCommand}
              editCommand={editCommand}
              deleteCommand={deleteCommand}
              selectedText={selectedText}
              // handleSelectedTextChange={handleSelectedTextChange}
              faqs={faqData}
            />
          </Drawer>
        </UserInfoContext.Provider>
      </ThemeProvider>
    </>
  )
}

export default PlasmoOverlay
