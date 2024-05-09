import { modals } from "@mantine/modals"

import QueryForm from "../../components/QueryModal"

const queryPromptValues = (
  content: string,
  promptVars: string[]
): Promise<string> => {
  if (!content?.length) return
  let fieldVars =
    content
      .match(/{{(.*?)}}/g)
      ?.map((field) => field.replace(/{{|}}/g, ""))
      .filter((field) => field.trim()?.length > 0) ?? []

  // ,var2,,var4 get empty strings idx
  const prefilledVars = fieldVars.reduce(
    (acc: Record<string, string>, field: string, idx: number) => {
      if (promptVars?.[idx]?.length > 0) {
        acc[field] = promptVars[idx]
      }

      return acc
    },
    {}
  )

  // remove prefilled vars from fieldVars
  let fieldNames = fieldVars.filter((field) => !prefilledVars?.[field])

  // remove duplicates
  fieldNames = [...new Set(fieldNames)]

  if (!fieldNames?.length) {
    return
  }

  return new Promise((resolve, reject) => {
    modals.open({
      onClose: () => reject("closed"),
      zIndex: 10000,
      withCloseButton: false,
      children: (
        <QueryForm
          fields={fieldNames}
          onSubmit={(values: Record<string, string>) => {
            Object.entries({ ...prefilledVars, ...values }).forEach(
              ([key, value]: any) => {
                content = content.replace(
                  new RegExp(`{{\\s*${key}\\s*}}`, "gi"),
                  value
                )
              }
            )

            resolve(content)
          }}
        />
      )
    })
  })
}

export default queryPromptValues
