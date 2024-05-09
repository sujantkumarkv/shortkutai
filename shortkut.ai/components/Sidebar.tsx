import {
  Accordion,
  Box,
  Button,
  Divider,
  Drawer,
  Flex,
  Input,
  Menu,
  Navbar,
  Paper,
  Space,
  Text,
  Textarea,
  Title,
  Tooltip,
  UnstyledButton
} from "@mantine/core"
import { useDebouncedState } from "@mantine/hooks"
import { notifications } from "@mantine/notifications"
import {
  IconAlertCircle,
  IconArrowsLeftRight,
  IconBolt,
  IconList,
  IconMessageCircle,
  IconPhoto,
  IconSearch,
  IconSend,
  IconSendOff,
  IconSettings,
  IconSpeakerphone,
  IconTrash
} from "@tabler/icons-react"
import { useContext, useEffect, useRef, useState } from "react"

import ChatHistory from "~chatbotui/ChatHistory"
// import ChatUI from "~chatbotui"
import Chat from "~chatbotui/components/Chat"
import { useStyles } from "~constants/sidebar"
import { SelectedTextContext, UserInfoContext } from "~contents"
import addCmd from "~contents/utils/addCmd"
import type { ICommand, ISidebarProps } from "~types"

import AddForm from "./AddForm"
import AddUpdateKey from "./AddUpdateKey"
import AnnouncementCard from "./AnnouncementCard"
import CollapseList from "./CollapseList"
import Info from "./Info"
import TabContainer from "./TabContainer"
import UserProfileMenu from "./UserProfileMenu"

// trying out notifications
const notifmsg = () => {
  return (
    <>
      <Text>Hey there 🤥</Text>
      <Button component="a" href="https://google.com" target="_blank"></Button>
    </>
  )
}
const Sidebar = ({
  items,
  shortkutData,
  addNewCommand,
  deleteCommand,
  editCommand,
  selectedText,
  faqs
}: ISidebarProps) => {
  const { classes, cx } = useStyles()
  const [active, setActive] = useState("Chat")
  const [activeChatId, setActiveChatId] = useState<string | null>(null)
  const [filterText, setFilterText] = useDebouncedState("", 200)

  const userInfo = useContext(UserInfoContext)

  const mainLinks = items.map((link) => (
    <Tooltip
      label={link.label}
      position="right"
      withArrow
      transitionProps={{ duration: 0 }}
      key={link.label}>
      <UnstyledButton
        onClick={() => {
          setActive(link.label)
        }}
        className={cx(classes.mainLink, {
          [classes.mainLinkActive]: link.label === active
        })}>
        <link.icon size="1.4rem" stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  ))

  const textAreaRef = useRef(null)
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus()
      // textAreaRef.current.value = selectedText
    }
  }, [selectedText])

  return (
    <Navbar
      className="shortkut-ai"
      height="100vh"
      pos="relative"
      zIndex={100000}>
      <Navbar.Section grow className={classes.wrapper}>
        <div className={classes.aside}>
          <div className={classes.logo}>
            <IconBolt size={30} />
          </div>
          <Space h="2px" />
          {mainLinks}
        </div>
        <div className={classes.main}>
          <Title order={4} className={classes.title}>
            <div className={classes.titleRow}>
              {active}
              <UserProfileMenu />

              {/* <Button variant="subtle"><Drawer.CloseButton /></Button> */}
            </div>
          </Title>

          <Space h="32px" />

          <TabContainer activeTab={active}>
            <TabContainer.Panel value={`Chat`} key={`tab-chat`}>
              <Box
                mx="md"
                style={{
                  backgroundColor: "transparent"
                }}>
                <SelectedTextContext.Provider value={{ selectedText }}>
                  <Chat chatId={activeChatId} />
                </SelectedTextContext.Provider>
              </Box>
            </TabContainer.Panel>
            <TabContainer.Panel value="Shortkuts" key={`tab-shortkuts`}>
              <Box mx="md">
                <CollapseList
                  commands={shortkutData}
                  key={`shortkut-collapse-list`}
                  deleteCommand={deleteCommand}
                  editCommand={editCommand}
                />
              </Box>
            </TabContainer.Panel>
            <TabContainer.Panel value="Add new" key={`tab-add-new-shortkut`}>
              <AddForm
                initValues={{}}
                onSubmit={async (cmd: ICommand) => {
                  await addCmd(cmd)
                  addNewCommand(cmd)
                }}
              />
              <Space h="xl" />
              <Divider my="xl" label="OR" labelPosition="center" />

              <Space h="xl" />
              <Paper radius="md" p="sm" mx="md" my="xl">
                <Text ta="center">Get started to chat now... </Text>
                <Space h="xl" />
                <Text ta="center" variant="caption">
                  cmon' Click below.
                </Text>
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
              </Paper>
            </TabContainer.Panel>
            <TabContainer.Panel value="Search" key={`tab-search`}>
              <Flex direction="column" align="center" px="md">
                <Input
                  w="100%"
                  icon={<IconSearch size="1rem" />}
                  placeholder="Search for Shortkuts"
                  onChange={(e) => setFilterText(e.currentTarget.value)}
                />
                <Space h="md" />
                <CollapseList
                  commands={shortkutData}
                  key={`shortkut-collapse-list`}
                  filterText={filterText}
                  deleteCommand={deleteCommand}
                  editCommand={editCommand}
                />
              </Flex>
            </TabContainer.Panel>
            <TabContainer.Panel value="History" key={`tab-history`}>
              <Input
                mx={10}
                mb={40}
                maw="100%"
                icon={<IconSearch size="1rem" />}
                placeholder="Search for Chats"
                onChange={(e) => setFilterText(e.currentTarget.value)}
              />
              <Space h="md" />
              <ChatHistory
                setActiveChatId={setActiveChatId}
                setActive={setActive}
                filterText={filterText}
              />
            </TabContainer.Panel>

            <TabContainer.Panel value="Settings" key={`tab-settings`}>
              <AnnouncementCard
                Icon={IconSpeakerphone}
                title="Coming Soon..."
              />
            </TabContainer.Panel>

            {/* <TabContainer.Panel value="Profile" key={`tab-profile`}>
              <AddUpdateKey />
            </TabContainer.Panel> */}

            <TabContainer.Panel value="Info" key={`tab-info`}>
              <Info faqs={faqs} />
            </TabContainer.Panel>
          </TabContainer>
        </div>
      </Navbar.Section>
    </Navbar>
  )
}

export default Sidebar
