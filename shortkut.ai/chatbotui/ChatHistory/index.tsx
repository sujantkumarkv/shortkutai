import { Accordion, Box, Button, Paper, Space, Text } from "@mantine/core"
import React, { useEffect, useState } from "react"

// import ChatUI from "~chatbotui"
import type {
  ChatHistoryProps,
  ChatMessageProps,
  ChatProps
} from "~chatbotui/types"

import ChatHistoryItem from "./ChatHistoryItem"
import ChatHistorySearch from "./ChatHistorySearch"

const ChatHistory: React.FC<ChatHistoryProps> = ({
  setActiveChatId,
  setActive,
  filterText = ".*"
}) => {
  const [chatIdList, setChatIdList] = useState<string[]>(() => {
    const chatIdListFromStorage = localStorage.getItem("chatIdList")
    return chatIdListFromStorage ? JSON.parse(chatIdListFromStorage) : []
  })

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "chatIdList") {
        setChatIdList(JSON.parse(e.newValue))
      }
    }
    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const chatIdListToBeShown = ChatHistorySearch(chatIdList, filterText)

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center"
        }}>
        <Box w="100%" mr="xl">
          <Paper maw="100%" p="xs" mx="md" radius="md">
            <Accordion w="100%" variant="filled" radius="md">
              {chatIdListToBeShown.length > 0 ? (
                chatIdListToBeShown.map((chatId: string) => {
                  const chatHistoryItem = JSON.parse(
                    localStorage.getItem(chatId)
                  )
                  return (
                    <ChatHistoryItem
                      key={chatId}
                      chatId={chatId}
                      title={chatHistoryItem?.title}
                      chats={chatHistoryItem?.chats}
                      lastUpdated={chatHistoryItem?.lastUpdated}
                      setActiveChatId={setActiveChatId}
                      setActive={setActive}
                      chatIdList={chatIdList}
                      setChatIdList={setChatIdList}
                    />
                  )
                })
              ) : (
                <>
                  <Paper p="md" mx="md">
                    <Text ta="center">
                      No chats history found to display...{" "}
                    </Text>
                    <Space h="md" />
                    <Text ta="center" variant="caption">
                      cmon' start a new chat! Click below.
                    </Text>
                  </Paper>
                  <Space h="xl" />
                  <Button
                    fullWidth
                    variant="subtle"
                    onClick={() => {
                      setActiveChatId(null)
                      setActive("Chat")
                    }}>
                    Start a new chat
                  </Button>
                </>
              )}
            </Accordion>
          </Paper>
        </Box>
      </div>
    </>
  )
}

export default ChatHistory
