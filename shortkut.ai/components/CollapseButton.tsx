import {
  ActionIcon,
  Badge,
  Collapse,
  Flex,
  Group,
  Paper,
  Text,
  createStyles
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { modals } from "@mantine/modals"
import { IconEdit, IconMinus, IconPlus, IconTrash } from "@tabler/icons-react"

import deleteCmd from "~contents/utils/deleteCmd"
import editCmd from "~contents/utils/editCmd"
import type { ICollapseButtonProps } from "~types"

const useStyles = createStyles((theme) => ({
  shortkutItem: {
    transition: "all 0.2s ease",
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: "4px"
  },
  pointer: {
    cursor: "pointer"
  }
}))

function CollapseButton({
  command,
  deleteCommand,
  editCommand
}: ICollapseButtonProps) {
  const [opened, { toggle }] = useDisclosure(false)
  const { classes } = useStyles()

  if (!command?.commands?.[0]) return null

  const editHandler = async (e) => {
    if (!command?.prompt) return
    try {
      const newcmd = await editCmd(e, command)
      console.log(newcmd)
      if (newcmd?.success) {
        editCommand(newcmd.data, command.commands[0])
      }
      modals.closeAll()
    } catch (error) {
      console.error(error)
      modals.closeAll()
    }
  }

  const delHandler = async (e) => {
    if (!command?.description) return
    try {
      await deleteCmd(e, command)
      deleteCommand(command)

      modals.closeAll()
    } catch (error) {
      console.error(error)

      modals.closeAll()
    }
  }

  return (
    <>
      <Group position="center">
        <Flex
          w="100%"
          justify={"space-between"}
          align="center"
          className={classes.shortkutItem}>
          <Flex gap="md" onClick={toggle} className={classes.pointer}>
            <Badge
              variant="light"
              color={opened ? "blue" : "dark"}
              size="sm"
              radius="xs"
              px={4}>
              {"/"}
            </Badge>
            <Text size="sm" weight={500}>
              {command?.commands[0]}
            </Text>
          </Flex>
          <Flex gap="xs">
            <ActionIcon variant="light" color="blue" onClick={editHandler}>
              <IconEdit size="0.8rem" />
            </ActionIcon>
            <ActionIcon variant="light" color="red" onClick={delHandler}>
              <IconTrash size="0.8rem" />
            </ActionIcon>
            <ActionIcon onClick={toggle} variant="light" color="gray">
              {!opened ? (
                <IconPlus size="0.8rem" />
              ) : (
                <IconMinus size="0.6rem" />
              )}
            </ActionIcon>
          </Flex>
        </Flex>
      </Group>

      <Collapse in={opened}>
        <Paper p="sm" radius="sm">
          <Text size="xs">{command?.description}</Text>
        </Paper>
      </Collapse>
    </>
  )
}

export default CollapseButton
