import { getDataFromStorage } from "./storage"

export async function fetchResponse({
  q,
  openAIapiKey
}: {
  q: string
  openAIapiKey: string
}) {
  if (!openAIapiKey) {
    console.log("fetching api key from storage")
    const res = await getDataFromStorage("openai_api_key")
    openAIapiKey = res.openai_api_key
  }

  if (!openAIapiKey) {
    throw new Error("Please set your API key first!")
  }

  const response = await getGPTRes({ q, openAIapiKey })

  return response
}

async function getGPTRes({
  q,
  openAIapiKey
}: {
  q: string
  openAIapiKey: string
}) {
  if (!openAIapiKey) {
    return "Please set your API key first!"
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openAIapiKey}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a creative content creator!"
        },
        { role: "user", content: q }
      ],
      temperature: 0
    })
  })

  if (!response.ok) {
    throw new Error(
      `Opps! seems there is some error! check if api is set properly`
    )
  }

  const data = await response.json()

  console.log(data)

  return data.choices[0].message.content
}
