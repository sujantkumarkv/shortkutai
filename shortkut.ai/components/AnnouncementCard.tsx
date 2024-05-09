import { Flex, Paper, Title } from "@mantine/core"
import { IconSpeakerphone } from "@tabler/icons-react"

import type { IAnnouncementCardProps } from "~types"

const AnnouncementCard = ({ title, Icon }: IAnnouncementCardProps) => {
  return (
    <Flex justify="center" style={{ height: "100%", width: "100%" }}>
      <Paper
        shadow="md"
        p="lg"
        h="min-content"
        mx="md"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          flex: 1
        }}>
        <Icon size={50} strokeWidth={1.5} />
        <Title weight={500} order={3}>
          {title}
        </Title>
      </Paper>
    </Flex>
  )
}

export default AnnouncementCard
