const onMessageHandler = (
  params: any,
  message: any,
  sender: any,
  sendResponse: any
) => {
  console.log("onMessageHandler", { params, message, sender, sendResponse })
  switch (message.action) {
    case "TOGGLE":
      console.log("toggle")
      params?.sidebartoggle?.()
      break
    default:
      break
  }

  return true
}

export default onMessageHandler
