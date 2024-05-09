import { Button, Col, Grid, Paper, Textarea } from "@mantine/core"
import { IconSend } from "@tabler/icons-react"
import React, { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"

import ChatInput from "~chatbotui/components/ChatInput"
import ChatMessage from "~chatbotui/components/ChatMessage"
import type { ChatMessageProps, ChatProps } from "~chatbotui/types"
import { SelectedTextContext } from "~contents"

const Chat: React.FC<ChatProps> = ({ chatId }) => {
  const { selectedText } = React.useContext(SelectedTextContext) // without the { selectedText } it would give the err: Type 'SelectedTextContextValue' is not assignable to type 'string'.
  const [chatIdList, setChatIdList] = useState<string[]>(
    JSON.parse(localStorage.getItem("chatIdList")) || []
  )
  const [chatID, setChatID] = useState<string>(chatId || uuidv4()) // important: its 'chatID'
  const [chatHistoryContent, setChatHistoryContent] = useState<ChatProps>(
    JSON.parse(localStorage.getItem(`${chatID}`))
  ) // maybe null/undefined for new chat
  const [messages, setMessages] = useState<ChatMessageProps[]>(
    chatHistoryContent?.chats || []
  )
  const [chatStarted, setChatStarted] = useState<boolean>(false)

  const handleInputSubmit = (input: string, role: "user" | "ai") => {
    // a new message object
    const newMessage: ChatMessageProps = {
      id: role + "#" + Date.now().toString(),
      role: role,
      content: input
    }
    // add new message to state
    setMessages((messages) => [...messages, newMessage])
    setChatStarted(true)
    messages.map((m) => {
      console.log(m.content)
    })
  }

  useEffect(() => {
    if (chatStarted && !chatHistoryContent) {
      // creating & saving new chatId
      setChatIdList((prevChatIdList) => {
        const newChatIdList = [...prevChatIdList, chatID]
        localStorage.setItem("chatIdList", JSON.stringify(newChatIdList))
        console.log("new chatIdList: ", newChatIdList)
        return newChatIdList
        // The reason for returning newChatIdList is because
        // when you use the function form of the setState function
        // (here, setChatIdList),we need to return the new state.
      })
      // create new chat
      let chatHistoryToBeSaved = {
        chatId: chatID,
        title: "New Chat",
        chats: messages,
        lastUpdated: Date.now().toString()
      }
      setChatHistoryContent(chatHistoryToBeSaved)
      localStorage.setItem(`${chatID}`, JSON.stringify(chatHistoryContent))
      /**
       * each time, Chat was active, it would create a new chatId in the chatIdList
       * and save it to localStorage, it was an error; so this if-else if block 
       * ensures that if chatStarted is false & chatHistoryContent is null, then
       * it does nothing. // error fixed :)
       */
    } else if (chatHistoryContent) {
      chatHistoryContent.chats = messages
      chatHistoryContent.lastUpdated = Date.now().toString()
      localStorage.setItem(`${chatID}`, JSON.stringify(chatHistoryContent))
    }
  }, [messages, chatStarted])

  return (
    <>
      <div>
        <Paper
          style={{
            height: "85vh",
            overflow: "auto",
            background: "transparent"
          }}>
          {messages.map((message) => {
            return <ChatMessage key={message.id} {...message} />
          })}
        </Paper>
        <ChatInput onSubmit={handleInputSubmit} selectedText={selectedText} />
      </div>
    </>
  )
}
export default Chat
