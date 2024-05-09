import { modals } from "@mantine/modals"
import { notifications } from "@mantine/notifications"

import { notificationMessages } from "~constants"
import type { ICommand } from "~types"

import isCmdOrCtrlKey from "./isCtrlOrCmdKey"
import queryPromptValues from "./queryPromptValues"
import { setInputText } from "./setInputText"

const handleKeyDown = async (
  event: any,
  toggle: Function,
  isQuerying: boolean,
  setIsQuerying: Function,
  COMMAND_JSON_ARRAY: ICommand[]
) => {
  try {
    const isCmdOrCtrl = isCmdOrCtrlKey(event)

    if (isCmdOrCtrl && event.key === "/") {
      console.log("toggle")
      toggle()
      return
    }

    if (isQuerying) return
    // Check if the key pressed was the ctrl/cmd + right arrow key
    if (isCmdOrCtrl && event.key === "ArrowRight") {
      console.debug("ctrl/cmd + right arrow key pressed")
      let queryText = ""
      if (!event.target) return
      if (event.target?.tagName === "INPUT") {
        queryText = event.target?.value?.trim?.() || ""
      } else if (event.target?.tagName === "TEXTAREA") {
        queryText = event.target?.value?.trim?.() || ""
      } else {
        queryText = event.target?.innerText?.trim?.() || ""
      }
      console.debug(event.target)
      console.debug({ queryText, text: event.target?.innerText?.trim() })
      let COMMAND_TEXT = undefined
      let prompt = undefined
      const domainRegex = /https?:\/\/(www\.)?([^\/]+)/
      const domain = domainRegex.exec(window.location.href)?.[2]
      // qyerText starts with any of the command text
      for (const commandJson of COMMAND_JSON_ARRAY) {
        for (const command of commandJson.commands) {
          if (
            queryText.startsWith(`\\${command}`) ||
            queryText.startsWith(`/${command}`)
          ) {
            COMMAND_TEXT = command
            prompt = commandJson.prompt
            break
          }
        }
      }

      if (COMMAND_TEXT !== undefined && prompt !== undefined) {
        console.debug("command found")
        setIsQuerying(true)
        const notificationMsg =
          notificationMessages[
            Math.floor(Math.random() * notificationMessages.length)
          ]

        const promptcontext = queryText
          .replace(`\\${COMMAND_TEXT}`, "")
          .replace(`/${COMMAND_TEXT}`, "")
          .trim()

        prompt = prompt.replace("<<DOMAIN_NAME>>", domain || "")

        let updatedPrompt = await queryPromptValues(
          prompt,
          promptcontext
            .split(",")
            .map((x) => x.trim())
            .filter((x) => x.length > 0)
        )

        if (promptcontext.length > 0) {
          updatedPrompt = `Here is some context: ${promptcontext}\n\n${updatedPrompt}`
        }

        console.debug({ updatedPrompt })

        notifications.show({
          title: "Generating",
          message: notificationMsg,
          autoClose: false,
          id: "generating-notification"
        })

        chrome.runtime.sendMessage(
          { message: "generate", data: updatedPrompt },
          function (response: string) {
            console.debug({ response, COMMAND_TEXT })

            if (response.startsWith('"') && response.endsWith('"')) {
              response = response.slice(1, response.length - 1)
            } else if (response.startsWith("'") && response.endsWith("'")) {
              response = response.slice(1, response.length - 1)
            }

            notifications.update({
              id: "generating-notification",
              title: "Generated",
              message: "Your post is ready",
              autoClose: 500
            })

            modals.closeAll()

            setInputText(event.target, response + " ", COMMAND_TEXT ?? "")

            setIsQuerying(false)
            // event.target.placeholder = prevPlaceholder;
          }
        )
      }
    }
  } catch (e) {
    console.debug(e)

    notifications.cleanQueue()

    notifications.show({
      title: "Error",
      message: "Something went wrong",
      autoClose: 5000,
      color: "red"
    })

    modals.closeAll()

    setIsQuerying(false)
  }
}

export default handleKeyDown
