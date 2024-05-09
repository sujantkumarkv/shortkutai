import { Storage } from "@plasmohq/storage"

const storage = new Storage({
  area: "sync"
})

async function getDataFromStorage(keys: string[] | string) {
  // const data = await storage.get("key")
  const res: Record<string, any> = {}

  if (typeof keys === "string") {
    const data = await storage.get(keys)
    res[keys] = data
    return res
  }

  for (const key of keys) {
    const data = await storage.get(key)
    // console.log('Data for key ' + key + ': ', data);
    res[key] = data
  }

  return res
}

// Function to set data in Chrome Storage Sync
async function setDataInStorage(data: Record<string, any>) {
  const entries = Object.entries(data)

  for (const [key, value] of entries) {
    // console.log(key, value)
    await storage.set(key, value)
  }
}

export { getDataFromStorage, setDataInStorage }
