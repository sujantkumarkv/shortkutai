import StateManager from "~utils/stateManager"

const globalState = new StateManager()

const getLocalKey = (key: string) => {
  return globalState.get(key)
}

const setLocalKey = (key: string, value: any) => {
  globalState.set(key, value)
}

export { getLocalKey, setLocalKey }
