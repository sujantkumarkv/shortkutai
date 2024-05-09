import { modals } from "@mantine/modals"
import { notifications } from "@mantine/notifications"

import type { ICommand } from "~types"

const deleteCmd = (e: any, cmd: ICommand) => {
  if (!cmd?.description) return
  return new Promise((resolve, reject) => {
    modals.openConfirmModal({
      title: "Delete Command",
      children: `Are you sure you want to delete ${cmd.commands[0]}?`,
      labels: {
        cancel: "Cancel",
        confirm: "Delete"
      },
      onConfirm: () => {
        chrome.runtime.sendMessage({
          message: "deleteShortkut",
          data: cmd
        })

        resolve("deleted")
      },
      zIndex: 1000000,
      onClose: () => {
        reject("closed")
      }
    })
  })
}

export default deleteCmd
