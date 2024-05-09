export const initCommandData = [
  {
    commands: ["test", "tt"],
    description: "Test if the extension is working",
    prompt:
      "Create a short post {{CONTEXT}}. (Max 280 characters). Enter your reply below."
  },
  {
    commands: ["thankyou", "ty"],
    description: "Create a thank you post",
    prompt:
      "Write a thank you post {{CONTEXT}}. (Max 280 characters) Enter your reply below."
  },
  {
    commands: ["welcome", "wc"],
    description: "Create a welcome post",
    prompt:
      "Write a welcome post {{CONTEXT}}. (Max 280 characters) Enter your reply below."
  },
  {
    commands: ["goodbye", "gb"],
    description: "Create a goodbye post",
    prompt:
      "Write a goodbye post {{CONTEXT}}. (Max 280 characters) Enter your reply below."
  },
  {
    commands: ["code", "cd"],
    description: "Generate code snippet",
    prompt:
      "Write a code snippet {{CONTEXT}} {{NOTE}}. (Max 280 characters) Enter your code below."
  },
  {
    commands: ["email", "em"],
    description: "Generate a email",
    prompt: "Write an email {{CONTEXT}}. Enter your email below."
  }
]

export const notificationMessages = [
  "Tickle your funny bone...",
  "Cooking up some humor...",
  "Generating laughter, stand by...",
  "Making you chuckle...",
  "Creating some giggles...",
  "Preparing some comedic relief...",
  "Time for a joke break...",
  "Inserting humor module...",
  "Humorizing your screen...",
  "Constructing puns and jokes...",
  "Loading up some fun...",
  "Injecting some humor...",
  "Deploying joke algorithm...",
  "Cracking some jokes...",
  "Generating humor, please wait..."
]

export const supportedAPIKeys = [
  { value: "open_api_key", label: "Open API Key" },
  { value: "bard_api_key", label: "Bard API Key", disabled: true }
]
