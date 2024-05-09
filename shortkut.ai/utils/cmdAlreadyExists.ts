import type { ICommand } from "~types"

const cmdIsSimilar = (oldCmd: ICommand, newCmd: ICommand) => {
  return oldCmd.commands.some((cmd) => newCmd.commands.includes(cmd))
}

export default cmdIsSimilar
