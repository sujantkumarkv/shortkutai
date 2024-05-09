import { Children, type ReactElement, cloneElement } from "react"

import type { ITabContainerProps, ITabContentProps } from "~types"

const TabContainer = ({ activeTab, children }: ITabContainerProps) => {
  return (
    <>
      {Children.map(children, (child: ReactElement, index) => {
        return cloneElement(child, { activeTab })
      })}
    </>
  )
}

const TabContent = ({ children, value, activeTab }: ITabContentProps) => {
  return <>{activeTab === value && children}</>
}

TabContainer.Panel = TabContent

export default TabContainer
