const getShortkuts = ({ setData }: any) => {
  console.debug("loading cmds")
  chrome.runtime.sendMessage(
    { message: "getShortkuts" },
    async function (response: any) {
      console.log(response)
      console.debug("shortkuts are set to " + response)
      setData(response)
    }
  )
}

export default getShortkuts
