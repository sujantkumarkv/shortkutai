import { TextInput, Textarea, Tooltip } from "@mantine/core"
import { IconSend } from "@tabler/icons-react"
import React, { useEffect, useRef, useState } from "react"

import type { ChatInputProps } from "~chatbotui/types"

// import { sendSelectedText } from "~contents"

const ChatInput: React.FC<ChatInputProps> = ({ onSubmit, selectedText }) => {
  //   const selectedText = sendSelectedText()
  const [chatboxText, setChatboxText] = useState<string>()
  
  const handleGPTRes = async () => {
    // pass chatboxText to ai api for response
    const response = await new Promise<string>((resolve) => {
      chrome.runtime.sendMessage(
        { message: "generate", data: chatboxText },
        function (response: string) {
          console.log({ response, chatboxText })

          if (response.startsWith('"') && response.endsWith('"'))
            response = response.slice(1, response.length - 1)
          else if (response.startsWith("'") && response.endsWith("'"))
            response = response.slice(1, response.length - 1)
          resolve(response)
        }
      )
    })
    return response
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (chatboxText.trim() === "") return // if input is empty, do nothing

    onSubmit(chatboxText, "user")

    // send to ai
    const response = await handleGPTRes()
    // send to Chat
    onSubmit(response, "ai") // without Promise<string>, it was type 'unknown' causing errors.
    // only after handleGPTRes() is done, then:
    // alert(`response ${response}`)

    // reset chatboxText
    setChatboxText("")

    // const textinputRef = useRef(null)
    // useEffect(() => {
    //   if (textinputRef.current) {
    //     textinputRef.current.value = ""
    //   }
    // }, [selectedText])
  }
  useEffect(() => {
    setChatboxText(selectedText)
  }, [selectedText])
  return (
    <>
      <form onSubmit={handleSend}>
        <div style={{ position: "sticky"}}>
        <TextInput
          size="xl"
          autoFocus
          id="shortkut-sidebar-textarea"
          value={chatboxText}
          placeholder="Type here..."
          onChange={(e) => setChatboxText(e.currentTarget.value)}
          rightSection={
            <Tooltip label="Press Enter to send" position="top-end" withArrow>
              <div>
                <IconSend
                  cursor={"pointer"}
                  onClick={handleSend}
                  size="1.5rem"
                  style={{ display: "block", opacity: 0.5 }}
                />
              </div>
            </Tooltip>
          }
          // autosize
          w="100%"
          //   minRows={3}
          //   maxRows={6}
          //   style={{
          //     position: "absolute",
          //     bottom: "0",
          //     resize: "none"
          //   }}
        />
        </div>
        
      </form>
    </>
  )
}

export default ChatInput
