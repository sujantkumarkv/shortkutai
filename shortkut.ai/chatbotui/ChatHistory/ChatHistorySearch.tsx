import { useEffect, useState } from "react"

import type { ChatMessageProps } from "~chatbotui/types"

const ChatHistorySearch = (chatIdList: string[], filterText: string = ".*") => {
  const [chatIdListToBeShown, setChatIdListToBeShown] = useState<string[]>([])

  // this works under useEffect to trigger it if chatIdList or filterText changes,
  // so that the chatIdListToBeShown is updated each time.
  // eg. if new chat is created, its updated real time.

  useEffect(() => {
    let filteredChatIdList = chatIdList
    if (filterText !== "") {
      const filterRegex = RegExp(filterText, "gi") // make the filterRegex global and case insensitive
      filteredChatIdList =
        chatIdList?.filter?.((chatId: string) => {
          const chatHistoryContent = JSON.parse(localStorage.getItem(chatId))
          const chatMatches =
            filterRegex.test(chatHistoryContent?.title ?? "") ||
            chatHistoryContent?.chats?.some((chatMessage: ChatMessageProps) =>
              filterRegex.test(chatMessage?.content)
            )
          return chatMatches
        }) || []
    }
    setChatIdListToBeShown(filteredChatIdList) // if filterText=="", just assign the default chatIdList
  }, [filterText, chatIdList])

  return chatIdListToBeShown.reverse() // reverse the order so that the latest chat is on top
}

export default ChatHistorySearch
