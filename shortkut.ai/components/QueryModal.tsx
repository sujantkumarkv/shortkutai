import { Box, Button, Flex, Space, TextInput, Textarea } from "@mantine/core"
import { modals } from "@mantine/modals"
import { useContext, useState } from "react"


import pascalCase from "~utils/pascalCase"

function QueryForm({ fields, onSubmit }: any) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmitCallback = (e: any) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    const values = Object.fromEntries(formData)

    setIsSubmitting(true)

    onSubmit({ ...values })
  }



  return (
    <Box mx="md">
      <form
        onSubmit={onSubmitCallback}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem"
        }}>
        {fields.map((field: any, index: number) => (
          <Textarea
            placeholder="add some description"
            name={field}
            label={pascalCase(field)}
            key={`query-field-${field}`}
            data-autofocus={index === 0}
          />
        ))}
        <Space h="md" />
        <Flex justify="space-between" gap="md">
          <Button
            onClick={modals.closeAll}
            variant="default"
            color="gray"
            fullWidth>
            Cancel
          </Button>
          <Button
            type="submit"
            loading={isSubmitting}
            disabled={isSubmitting}
            fullWidth>
            {isSubmitting ? "" : "Generate ✨"}
          </Button>
        </Flex>
      </form>
    </Box>
  )
}

export default QueryForm
