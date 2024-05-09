export interface SelectedTextContextValue {
  selectedText: string
}

export interface ChatMessageProps {
  id: string
  role: "user" | "ai"
  content: string
}

export interface ChatInputProps {
  onSubmit: (input: string, role: "user" | "ai") => void
  selectedText: string
}

export interface ChatProps {
  chatId?: string
  title?: string | "New Chat"
  chats?: ChatMessageProps[]
  lastUpdated?: string | Date
  setActiveChatId?: React.Dispatch<React.SetStateAction<string | null>>;
  setActive?: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface ChatHistoryItemProps {
  chatId?: string
  title?: string | "New Chat"
  chats?: ChatMessageProps[]
  lastUpdated?: string | Date
  setActiveChatId?: React.Dispatch<React.SetStateAction<string | null>>;
  setActive?: React.Dispatch<React.SetStateAction<string | null>>;
  chatIdList?: string[];
  setChatIdList?: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface ChatHistoryProps {
  setActiveChatId: React.Dispatch<React.SetStateAction<string | null>>;
  setActive: React.Dispatch<React.SetStateAction<string | null>>;
  filterText?: string
}
