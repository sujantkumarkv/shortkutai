import type { TablerIconsProps } from "@tabler/icons-react"

export interface ICommand {
  commands: string[]
  description: string
  prompt: string
}

export interface ICollapseListProps {
  commands: ICommand[]
  filterText?: string
  editCommand: (cmd: ICommand, prevCmd: string) => void
  deleteCommand: (cmd: ICommand) => void
}

export interface ISidebarItem {
  icon: (props: TablerIconsProps) => JSX.Element
  label: string
}

export interface IfaqItem {
  sno: string
  question: string
  answer: string
}

export interface InfoTabProps {
  faqs: IfaqItem[]
}

export interface ISidebarProps {
  items: ISidebarItem[]
  shortkutData: ICommand[]
  addNewCommand: (cmd: ICommand) => void
  editCommand: (cmd: ICommand, prevCmd: string) => void
  deleteCommand: (cmd: ICommand) => void
  selectedText: string | ""
  faqs: IfaqItem[]
}

export interface ITabContainerProps {
  children: React.ReactNode
  activeTab: string
}

export interface ITabContentProps {
  children: React.ReactNode
  value: string | React.FC
  activeTab?: string
}

export interface IAnnouncementCardProps {
  title: string
  Icon: (props: TablerIconsProps) => JSX.Element
}

export interface ICollapseButtonProps {
  command: ICommand
  editCommand: (cmd: ICommand, prevCmd: string) => void
  deleteCommand: (cmd: ICommand) => void
}

export interface IGAEvent {
  category: string
  action: string
  label?: string
  value?: number
  nonInteraction?: boolean
  transport?: "beacon" | "xhr" | "image"
}
