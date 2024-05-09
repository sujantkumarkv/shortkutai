import { Divider, Space } from "@mantine/core"
import { IconSearchOff } from "@tabler/icons-react"
import { Fragment } from "react"

import type { ICollapseListProps } from "~types"

import AnnouncementCard from "./AnnouncementCard"
import CollapseButton from "./CollapseButton"

const CollapseList = ({
  commands,
  deleteCommand,
  editCommand,
  filterText = ".*"
}: ICollapseListProps) => {
  if (filterText === "")
    return (
      <>
        <Space h="md" />
        <AnnouncementCard Icon={IconSearchOff} title="No results" />
      </>
    )

  const filterRegex = new RegExp(filterText, "gi")

  const filteredCmds =
    commands?.filter?.((command) => {
      const commandMatches =
        command?.commands?.some((cmd) => filterRegex.test(cmd)) ||
        filterRegex.test(command?.description ?? "") ||
        filterRegex.test(command?.prompt ?? "")
      return commandMatches
    }) || []

  return (
    <>
      {filteredCmds.map((command, index) => {
        const cmd = (command?.commands?.[0] ?? "").replace(
          /[^a-zA-Z0-9]+/gi,
          ""
        )

        return (
          <div
            key={`shortkut-${cmd}-${index}`}
            style={{ width: "100%", padding: "0px" }}>
            {index !== 0 && <Divider my="xs" size="xs" />}
            <CollapseButton
              key={`shortkut-btn-${cmd}-${index}`}
              command={command}
              deleteCommand={deleteCommand}
              editCommand={editCommand}
            />
          </div>
        )
      })}
    </>
  )
}

export default CollapseList
