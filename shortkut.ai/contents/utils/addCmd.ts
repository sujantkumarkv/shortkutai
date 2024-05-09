import type { ICommand } from "~types"

export const addCmd = (cmd: ICommand) => {
  if (!cmd?.description) return
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ message: "addShortkut", data: cmd }, (res) => {
      console.log(res)

      resolve(res)
    })
  })
}

export default addCmd
