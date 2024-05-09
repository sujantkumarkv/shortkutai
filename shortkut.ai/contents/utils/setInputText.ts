function getTextElement(
  COMMAND_TEXT: string,
  ele: HTMLElement
): HTMLElement | null {
  const eleText = ele?.innerText?.replace?.(/\n/g, "")?.trim?.() ?? ""
  if (
    !eleText.startsWith(`\\${COMMAND_TEXT}`) &&
    !eleText.startsWith(`/${COMMAND_TEXT}`)
  )
    return null

  if (ele.children.length === 0) return ele

  // iterate through all the HTML elements
  for (const childEle of ele.children) {
    const childNode = getTextElement(COMMAND_TEXT, childEle as HTMLElement)
    if (childNode) return childNode
  }
  return null
}

export function setInputText(
  textElement: HTMLElement | HTMLInputElement | HTMLTextAreaElement,
  text: string,
  COMMAND_TEXT: string
) {
  // find the the element that has the text as COMMAND_TEXT_ARRAY
  if (!textElement) return

  if (
    textElement instanceof HTMLInputElement &&
    textElement.tagName === "INPUT"
  ) {
    textElement.value = text
  } else if (
    textElement instanceof HTMLTextAreaElement &&
    textElement.tagName === "TEXTAREA"
  ) {
    textElement.value = text

    const textareaEvent = new Event("textarea", {
      bubbles: true,
      cancelable: true
    })
    textElement.dispatchEvent(textareaEvent)
  } else {
    const ele = getTextElement(COMMAND_TEXT, textElement)

    if (!ele) return

    textElement = ele

    // set the text
    textElement.innerText = text
  }

  // trigger the input event to update the value
  const inputEvent = new Event("input", {
    bubbles: true,
    cancelable: true
  })
  textElement.dispatchEvent(inputEvent)
}
