import { initCommandData } from "~constants"

export function portOnMessageListener(
  port: chrome.runtime.Port
): (message: any, port: chrome.runtime.Port) => void {
  return function (msg) {
    if (msg.from === "popup") {
      if (msg.subject === "getShortkuts") {
        chrome.storage.sync.get(["shortkuts"], function (result) {
          const shortkuts = result.shortkuts
          console.debug("Value currently is " + shortkuts)
          if (shortkuts === undefined) {
            chrome.storage.sync.set(
              { shortkuts: initCommandData },
              function () {
                console.debug("shortkuts are set to " + initCommandData)
              }
            )

            port.postMessage(initCommandData)
          }
          port.postMessage(shortkuts)
        })
      } else if (msg.subject === "setShortkuts") {
        const data = msg.data
        // in storage sync
        chrome.storage.sync.set({ shortkuts: data }, function () {
          console.debug("shortkuts are set to " + data)
        })
      }
    }
  }
}
