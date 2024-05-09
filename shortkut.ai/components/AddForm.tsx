import { Box, Button, Space, TextInput, Textarea } from "@mantine/core"
import { useForm } from "@mantine/form"

function AddForm({ initValues = {}, onSubmit }: any) {
  const form = useForm({
    initialValues: {
      commands: "",
      description: "",
      prompt: "",
      ...initValues
    }
  })

  return (
    <Box mx="md">
      <form
        onSubmit={form.onSubmit((values: Record<string, string>) => {
          onSubmit({
            ...values,
            commands: [values.commands.replace(/[\\/]*/g, "")]
          })
          form.reset()
        })}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem"
        }}>
        <TextInput
          withAsterisk
          label="Command"
          placeholder="/command"
          {...form.getInputProps("commands")}
          required
          autoFocus
        />

        <Textarea
          placeholder="add some description"
          label="Description"
          {...form.getInputProps("description")}
        />

        <Textarea
          placeholder="Write a sample prompt based on {{topic}} in {{language}} language ..."
          label="Prompt"
          withAsterisk
          {...form.getInputProps("prompt")}
          required
        />
        <Space h="md" />
        <Button
          type="submit"
          styles={(theme) => ({
            root: {
              backgroundColor: theme.colors.blue[6],
              color: theme.white,
              "&:hover": {
                backgroundColor: theme.colors.blue[7]
              }
            }
          })}
          fullWidth>
          Submit
        </Button>
      </form>
    </Box>
  )
}

export default AddForm
