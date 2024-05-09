import { Accordion, Divider, Paper, Space, Text, Title } from "@mantine/core"

import type { IfaqItem, InfoTabProps } from "~types"

const Info: React.FC<InfoTabProps> = ({ faqs }) => {
  return (
    <>
      <Title size="h2" align="center">
        About us
      </Title>
      <Title size="0.75rem" align="center">
        (Release version 1.0.5)
      </Title>
      <Space h="xl" />
      <Divider my="lg" />
      <Text ta="center">
        Welcome! We're{" "}
        <Text
          span
          c="blue"
          inherit
          component="a"
          href="https://shortkut.ai"
          target="_blank">
          shortkut.ai
        </Text>{" "}
      </Text>
      <Space h="sm" />
      <Text ta="center">
        We enable you to (literally) work at the speed of thought.
      </Text>
      <Text ta="center">
        Create AI powered snippets and invoke them on any input box on the
        internet.
      </Text>
      <Space h="xl" />

      {/* <Text
                ta="center"
                align="center"
                component="a"
                href="https://persistent-slayer-700.notion.site/Getting-Started-with-ShortkutAI-in-3-steps-0633c265b6e24bdc984501108b0f9932/"
                target="_blank">
                <Button variant="light">Get started here.</Button>
              </Text> */}
      <div
        style={{
          display: "flex",
          justifyContent: "center"
        }}>
        <Paper p="sm" mx="md" radius="md">
          <Accordion variant="filled" radius="md" defaultValue="1">
            {faqs.map((faq) => {
              return (
                <>
                  <Accordion.Item value={faq.sno}>
                    <Accordion.Control>{faq.question}</Accordion.Control>
                    <Accordion.Panel>{faq.answer}</Accordion.Panel>
                  </Accordion.Item>
                </>
              )
            })}
          </Accordion>
        </Paper>
      </div>
      <Space h="xl" />
        <Text ta="center">
          Let us know your feedback,
          <Text
            component="a"
            href="https://shortkut.ai/feedback"
            target="_blank">
            here.
          </Text>
        </Text>
        <Space h="xl" />
        <Text size="sm" ta="center">
          {" "}
          &#169;pocoai 2023.{" "}
        </Text>
    </>
  )
}

export default Info
