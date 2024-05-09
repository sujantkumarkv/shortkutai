import { signoutClearStorage } from "~contents/extensionAuth"
import { getLocalKey, setLocalKey } from "~background/utils/state"
import { getDataFromStorage, setDataInStorage } from "~background/utils/storage"
import { initCommandData } from "~constants"
import cmdIsSimilar from "~utils/cmdAlreadyExists"
import { fetchResponse } from "../utils/fetchResponse"


export const onMessageCases = async (request: any) => {
  // const openAIapiKey = await getLocalKey("openai_api_key")
  const openAIapiKey = ""
  switch (request.message) {
    case "generate": {
      const data = request.data
      const res = await fetchResponse({ q: data, openAIapiKey })
      return res
    }
    case "generateTweetRandomIdeas": {
      const prompt =
        'Give me a interesting and random tweet idea that I can tweet. Example: "Write about your views on the current state of the world." \n\nNote: Don\'t include hash tags. Just write a basic short idea. \n\n Enter your idea below:'
      const res = await fetchResponse({ q: prompt, openAIapiKey })

      return res
    }
    case "setShortkuts": {
      const data = request.data
      // in storage sync
      chrome.storage?.sync?.set?.({ shortkuts: data }, function () {
        console.debug("shortkuts are set to " + data)
      })

      await setDataInStorage({ shortkuts: data })
      return { success: true, message: "shortkuts are set" }
    }
    case "getShortkuts": {
      console.debug("loading cmds", chrome.storage?.sync?.get)

      const result = await getDataFromStorage(["shortkuts"])
      const shortkuts = result.shortkuts

      if (shortkuts === undefined) {
        await setDataInStorage({ shortkuts: initCommandData })
      }

      return initCommandData
    }
    case "addShortkut": {
      const newShortkut = request.data

      // remove non alphanumeric characters and replace the updated word in the prompt
      newShortkut.prompt = (newShortkut.prompt ?? "").replace(
        /{{(.*?)}}/g,
        (match: string, field: string) => {
          const updatedField = field.replace(/[^a-zA-Z0-9]/g, "")
          return `{{${updatedField}}}`
        }
      )

      const result = await getDataFromStorage(["shortkuts"])

      const shortkuts = result.shortkuts || []

      const newShortkuts = [...shortkuts, newShortkut]

      await setDataInStorage({ shortkuts: newShortkuts })

      return {
        success: true,
        message: "new shortkut added",
        data: newShortkuts
      }
    }
    case "deleteShortkut": {
      const oldShortkut = request.data
      console.log("delete", oldShortkut)

      const result = await getDataFromStorage(["shortkuts"])

      const shortkuts = result.shortkuts || []

      const newShortkuts = shortkuts.filter(
        (shortkut: any) => !cmdIsSimilar(oldShortkut, shortkut)
      )

      await setDataInStorage({ shortkuts: newShortkuts })

      return {
        success: true,
        message: "shortkut deleted",
        data: newShortkuts
      }
    }
    case "updateShortkut": {
      const oldCommand = request.prev
      const shortkutData = request.data
      console.debug(oldCommand, shortkutData)

      chrome.storage?.sync?.get?.(["shortkuts"], function (result) {
        const shortkuts = result.shortkuts

        const newShortkuts = shortkuts.map((shortkut: any) => {
          console.debug(shortkut.commands, oldCommand)
          if (shortkut.commands.includes(oldCommand)) {
            console.debug("found")
            return { ...shortkut, ...shortkutData }
          }
          return shortkut
        })

        console.debug(newShortkuts)

        chrome.storage?.sync?.set?.({ shortkuts: newShortkuts }, function () {
          console.debug("shortkut updated")
        })

        return {
          success: true,
          message: "shortkut updated",
          data: newShortkuts
        }
      })

      const result = await getDataFromStorage(["shortkuts"])

      const shortkuts = result.shortkuts || []

      const newShortkuts = shortkuts.map((shortkut: any) => {
        console.debug(shortkut.commands, oldCommand)
        if (cmdIsSimilar(shortkut, oldCommand)) {
          console.debug("found")
          return { ...shortkut, ...shortkutData }
        }
        return shortkut
      })

      console.debug(newShortkuts)

      await setDataInStorage({ shortkuts: newShortkuts })

      return {
        success: true,
        message: "shortkut updated",
        data: newShortkuts
      }
    }
    case "initFetchResponse": {
      let apiKey = request?.key

      console.debug({ apiKey }, "focus")

      if (openAIapiKey === undefined) {
        const result = await getDataFromStorage(["openai_api_key"])

        const apiKey = result.openai_api_key

        console.debug({ apiKey }, "from storage")

        if (apiKey?.length) {
          console.debug("OpenAI API Key found")
          setLocalKey("openai_api_key", apiKey)

          return { success: true, message: "OpenAI API Key found" }
        }

        return { success: false, message: "OpenAI API Key not found" }
      } else {
        console.debug("OpenAI API Key found")

        await setDataInStorage({ openai_api_key: openAIapiKey })

        return { success: true, message: "OpenAI API Key found" }
      }
    }

    case "setAPIKey": {
      const data = request.data

      await setDataInStorage(data)

      return { success: true, message: "API Key is set" }
    }

    case "getUserInfo": {
      const key = "authCustomToken"
      const emailkey = "emailkey"
      const uidkey = "uidkey"

      const userInfo = await getDataFromStorage([key, emailkey, uidkey])
      console.log("Retrieved userInfo: ", userInfo)

      return { userInfo: userInfo }
    }

    case "signout": {
      console.log("entered signout in messageHandler")
      // await signout(request.message).then((response) => {
      //   return response
      // })
      chrome.tabs.query({}, function (tabs) {
        for (let i = 0; i < tabs.length; i++) {
          chrome.tabs.sendMessage(tabs[i].id, { message: "signout" }, (response) => {
            return response
          });
        }
      });
    }

    // signoutClearStorage
    case "signoutClearStorage": {
      console.log("entered signoutClearStorage in messageHandler")

      return signoutClearStorage()
        .then(() => {
          console.log("signout successful")
          return { success: true, message: "Signout successful" }
        })
        .catch((error) => {
          console.log("signout error", error)
          return { success: false, message: "Signout error" }
        })
    }

    default:
      return { success: false, message: "Invalid request" }
  }
}

export const onMessageHandler = (
  request: any,
  sendResponse: (response?: any) => void
) => {
  onMessageCases(request)
    .then((response) => {
      console.debug("response", response)
      sendResponse(response)
    })
    .catch((err) => {
      console.error(err)
      sendResponse({ success: false, message: "Error" })
    })

  return true
}
