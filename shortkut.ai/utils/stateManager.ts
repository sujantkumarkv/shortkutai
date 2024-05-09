class StateManager {
  stateMap: Map<string, any>

  constructor() {
    this.stateMap = new Map()
  }

  set(key: string, value: any) {
    this.stateMap.set(key, value)
  }

  get(key: string) {
    return this.stateMap.get(key)
  }

  delete(key: string) {
    this.stateMap.delete(key)
  }

  clear() {
    this.stateMap.clear()
  }

  has(key: string) {
    return this.stateMap.has(key)
  }

  size() {
    return this.stateMap.size
  }

  entries() {
    return this.stateMap.entries()
  }
}

export default StateManager
