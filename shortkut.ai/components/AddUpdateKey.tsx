import { Box, Button, PasswordInput, Select, Space } from "@mantine/core"
import { useForm } from "@mantine/form"

import { supportedAPIKeys } from "../constants"

const AddUpdateKey = () => {
  const form = useForm({
    initialValues: {
      api_key_type: "openai_api_key",
      api_key: ""
    }
  })

  return (
    <Box mx="md">
      <form
        onSubmit={form.onSubmit((values) => {
          chrome.runtime.sendMessage(
            {
              message: "setAPIKey",
              data: {
                [values.api_key_type]: values.api_key
              }
            },
            (res) => {
              console.debug(res)
              form.reset()
            }
          )
        })}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.2rem"
        }}>
        <Select
          label="Select API Key Type"
          defaultValue="openai_api_key"
          data={supportedAPIKeys}
          name="api_key_type"
        />

        <PasswordInput
          withAsterisk
          label="Add API Key"
          placeholder="********"
          {...form.getInputProps("api_key")}
        />

        <Space h="md" />

        <Button type="submit" fullWidth>
          Submit
        </Button>
      </form>
    </Box>
  )
}

export default AddUpdateKey
