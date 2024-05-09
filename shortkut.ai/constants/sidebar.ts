import { HoverCard, createStyles, rem } from "@mantine/core"
import {
  IconHistory,
  IconInfoCircle,
  IconKey,
  IconList,
  IconMessages,
  IconPlus,
  IconSearch,
  IconSettings
} from "@tabler/icons-react"

export const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    position: "relative"
  },

  aside: {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100%",
    zIndex: 10,
    flex: `0 0 ${rem(60)}`,
    gap: theme.spacing.xs,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRight: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`
  },

  main: {
    marginLeft: "64px",
    overflowY: "auto",
    height: "100vh",
    flex: 1,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0]
  },

  mainLink: {
    width: rem(44),
    height: rem(44),
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0]
    }
  },

  mainLinkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color
    },
    // on light shadow
    boxShadow: `0 0 0 2px ${
      theme.colorScheme === "dark" ? theme.colors.gray[8] : theme.colors.gray[3]
    }`,
    "&:focus": {
      outline: "none",
      boxShadow: `0 0 0 2px ${theme.colors.blue[5]}`
    },
    transition: "box-shadow 100ms ease"
  },

  title: {
    position: "fixed",
    top: 0,
    left: "64px",
    right: 0,
    zIndex: 10,
    boxSizing: "border-box",
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: theme.spacing.xl,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    padding: theme.spacing.md,
    paddingTop: rem(18),
    height: rem(60),
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`
  },

  titleRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  },

  logo: {
    boxSizing: "border-box",
    padding: "16px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: rem(60),
    paddingTop: theme.spacing.md,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    fill: "goldenrod"
  },

  link: {
    boxSizing: "border-box",
    display: "block",
    textDecoration: "none",
    borderTopRightRadius: theme.radius.md,
    borderBottomRightRadius: theme.radius.md,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    padding: `0 ${theme.spacing.md}`,
    fontSize: theme.fontSizes.sm,
    marginRight: theme.spacing.md,
    fontWeight: 500,
    height: rem(44),
    lineHeight: rem(44),

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
      color: theme.colorScheme === "dark" ? theme.white : theme.black
    }
  },

  linkActive: {
    "&, &:hover": {
      borderLeftColor: theme.fn.variant({
        variant: "filled",
        color: theme.primaryColor
      }).background,
      backgroundColor: theme.fn.variant({
        variant: "filled",
        color: theme.primaryColor
      }).background,
      color: theme.white
    }
  }
}))

export const mainLinksMockdata = [
  { icon: IconMessages, label: "Chat" },
  { icon: IconList, label: "Shortkuts" },
  { icon: IconPlus, label: "Add new" },
  { icon: IconSearch, label: "Search" },
  { icon: IconHistory, label: "History" },
  { icon: IconSettings, label: "Settings" },
  // { icon: IconFaceId, label: "Profile" },
  { icon: IconInfoCircle, label: "Info" }
]

export const faqData = [
  {
    sno: "1",
    question:
      "Q: How do I use shortkut.ai to execute a command or use a chat feature?",
    answer:
      "You can execute a command or send a message by typing `/yourcommand` or `/message` in your text bar. Once you've typed in your command or message, press the `CMD + right arrow key` to open a dialog where you can specify your requirements for a command or your text for a chat. Alternatively, you can directly type `/yourcommand your-requirements` or `/message your-text` and then hit `CMD + right arrow key` to get results or send your message."
  },
  {
    sno: "2",
    question: "Q: How do I add or modify my shortkuts or chats?",
    answer:
      "To add or modify your shortkuts or chats, open the shortkut.ai sidebar by pressing `CMD + .`. You can then click on the `Add` or `Edit` icons to create a new shortcut or modify an existing one. The chat history can be accessed under the 'History' tab."
  },
  {
    sno: "3",
    question:
      "Q: I forgot the specific command I set for a particular shortcut. How can I find it?",
    answer:
      "If you forget a command, you can open the shortkut.ai sidebar by pressing `CMD + .`. Here you will find a list of all your commands along with their descriptions under the 'Commands' tab. You can scroll through the list or use the search bar at the top of the sidebar to find the command you are looking for."
  },
  {
    sno: "4",
    question: "Q: How can I view my past chats?",
    answer:
      "You can view your past chats by pressing `CMD + .` to open the shortkut.ai sidebar and navigating to the 'History' tab. Here you will find a chronological list of all your chat histories."
  },
  {
    sno: "5",
    question: "Q: Can I use shortkut.ai on any text bar across websites?",
    answer:
      "Yes, whether you are composing an email, filling out a form, or posting on social media, you can use your shortkuts and chat features to help speed up your workflow. If in case it doesn't work for some website, please reach out and we will custom fix it for you."
  },
  {
    sno: "6",
    question:
      "Q: I typed in my command but nothing happened. What might be the issue?",
    answer:
      "First, check to ensure you've typed the command correctly. Remember, all commands begin with a `/` symbol. If the command is correct but still not working, make sure that the website you're on doesn't have any restrictions that might prevent the extension from working. If you're still having issues, please reach out to us."
  },
  {
    sno: "7",
    question: "Q: How do I search for specific commands or chats?",
    answer:
      "If you want to search for a specific command or chat, you can use the search bar in the search tab or in the history tab to search past chats. Type in your query and the list will automatically update to display matching results."
  }
]
