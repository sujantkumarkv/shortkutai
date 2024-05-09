import { Paper, Text } from "@mantine/core"
import React from "react"

import type { ChatMessageProps } from "~chatbotui/types"

const ChatMessage: React.FC<ChatMessageProps> = ({ id, role, content }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: role === "user" ? "flex-end" : "flex-start"
      }}>
      <Paper
        style={{
          maxWidth: "90%",
          margin: "20px 5px",
          padding: "10px",
          backgroundColor: role === "user" ? "#999999" : "#444444"
        }}>
        <Text
          style={{
            color: "white",
            padding: "5px"
          }}
          size={"sm"}>
          {" "}
          {content}{" "}
        </Text>
      </Paper>
    </div>
  )
}

export default ChatMessage
