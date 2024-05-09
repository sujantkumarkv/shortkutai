import { modals } from "@mantine/modals"

import AddForm from "~components/AddForm"
import type { ICommand } from "~types"

const editCmd = (e: any, command: ICommand): Promise<any> => {
  if (!command?.description) return
  return new Promise((resolve, reject) => {
    modals.open({
      title: "Edit Command",
      onClose: () => {
        reject("closed")
      },
      zIndex: 9999999,
      children: (
        <AddForm
          initValues={{
            ...command,
            commands: `\\${command.commands[0]}`
          }}
          onSubmit={(values: Record<string, string>) => {
            chrome.runtime.sendMessage(
              {
                message: "updateShortkut",
                data: values,
                prev: command
              },
              (res) => {
                console.debug("editShortkut res", res)

                if (res?.success) {
                  resolve({
                    success: true,
                    data: values
                  })
                } else {
                  reject("failed")
                }
              }
            )
          }}
        />
      ),
      withOverlay: true,
      overlayProps: { opacity: 0.5, blur: 4, zIndex: 9999998 }
    })
  })
}

export default editCmd
