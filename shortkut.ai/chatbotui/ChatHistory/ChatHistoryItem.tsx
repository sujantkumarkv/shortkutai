import {
  Accordion,
  ActionIcon,
  Badge,
  Box,
  Button,
  Flex,
  Input,
  Paper,
  ScrollArea,
  Text,
  Tooltip
} from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { IconBorderRadius, IconEdit, IconTrash } from "@tabler/icons-react"
import { useEffect, useState } from "react"

import Chat from "~chatbotui/components/Chat"
import ChatMessage from "~chatbotui/components/ChatMessage"
// import ChatUI from "~chatbotui"

import type {
  ChatHistoryItemProps,
  ChatMessageProps,
  ChatProps
} from "~chatbotui/types"

const ChatHistoryItem: React.FC<ChatHistoryItemProps> = ({
  chatId,
  title,
  chats,
  lastUpdated,
  setActiveChatId,
  setActive,
  chatIdList,
  setChatIdList
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [newTitle, setNewTitle] = useState(title)

  const handleChatHistoryClick = (btn: string) => {
    switch (btn) {
      case "edit":
        setIsEditingTitle(true)
        break

      case "delete":
        notifications.show({
          autoClose: 4000,
          title: "Deleting this chat; you sure?",
          message: (
            <>
              <Button
                variant="subtle"
                onClick={() => {
                  localStorage.removeItem(chatId)
                  const newChatIdList = chatIdList.filter((id) => id !== chatId)
                  setChatIdList(newChatIdList) // filter makes a copy, so little more space complexity.
                  localStorage.setItem(
                    "chatIdList",
                    JSON.stringify(newChatIdList)
                  )
                  notifications.show({
                    message: "Chat deleted from history.",
                    autoClose: 2000
                  })
                }}>
                yess.
              </Button>
            </>
          )
        })
        break
      default:
        throw new Error("Function not implemented.")
    }
  }

  const handleEditTitle = (chatId: string, newTitle: string) => {
    setIsEditingTitle(false)
    let chatData = JSON.parse(localStorage.getItem(chatId))
    chatData.title = newTitle
    localStorage.setItem(chatId, JSON.stringify(chatData))
  }

  // useEffect(() => {
  //   const handleStorageChange = (e: StorageEvent) => {
  //     if (e.key === chatId) {
  //       setNewTitle(JSON.parse(e.newValue))
  //     }
  //   }
  //   window.addEventListener("storage", handleStorageChange)
  //   return () => window.removeEventListener("storage", handleStorageChange)
  // }, [])

  return (
    <Accordion.Item value={chatId}>
      <Accordion.Control>
        <Flex justify="space-between">
          <Text truncate ta="center" size="md" w="100%">
            {" "}
            {isEditingTitle ? (
              <Input
                w="100%"
                autoFocus
                value={newTitle}
                onChange={(e) => setNewTitle(e.currentTarget.value)}
                onBlur={() => {
                  setIsEditingTitle(false)
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleEditTitle(chatId, newTitle)
                    // JSON.parse(localStorage.getItem(chatId)).title = newTitle
                  }
                }}
              />
            ) : (
              <Tooltip
                multiline
                width={200}
                withArrow
                transitionProps={{ duration: 100 }}
                label="Click to open & continue chat..."
                >
                <div>
                  <Button
                    fullWidth
                    w="69%"
                    variant="subtle"
                    onClick={() => {
                      if (!isEditingTitle) {
                        setActiveChatId(chatId)
                        setActive("Chat")
                      }
                    }}>
                    {newTitle}
                  </Button>{" "}
                </div>
              </Tooltip>
            )}
          </Text>

          <Flex gap="xs" direction={{base: "column", sm: "row"}} justify="flex-end">
            <ActionIcon
              onClick={() => handleChatHistoryClick("edit")}
              variant="light"
              color="blue">
              <IconEdit size="1rem" />
            </ActionIcon>
            <ActionIcon
              onClick={() => handleChatHistoryClick("delete")}
              variant="light"
              color="red">
              <IconTrash size="1rem" />
            </ActionIcon>
          </Flex>
        </Flex>
      </Accordion.Control>
      <Accordion.Panel>
        {" "}
        <ScrollArea h={250}>
          {chats?.map((chat: ChatMessageProps) => {
            return (
              <>
                <ChatMessage
                  id={chat.id}
                  role={chat.role}
                  content={chat.content}
                />
              </>
            )
          })}
        </ScrollArea>{" "}
      </Accordion.Panel>
    </Accordion.Item>
  )
}

export default ChatHistoryItem
