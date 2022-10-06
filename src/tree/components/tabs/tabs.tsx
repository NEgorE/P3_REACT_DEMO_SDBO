import React, {FC, useEffect, useState} from "react"
import classnames from "classnames"
import {TABS} from './constants';

import "bootstrap/dist/css/bootstrap.min.css";
import "./tabs.css";

interface IProps {
  changeTab: (tab: number) => void
}


export const Tabs: FC<IProps> = ({changeTab}) => {

  const [activeTabNum, setActiveTabNum] = useState(TABS.filter(item => item.type === 1).map(item => item.type)[0])

  const setActiveTab = (tab: number) => {
    setActiveTabNum(tab)
  }

  useEffect(() => {
    changeTab(activeTabNum)
  }, [activeTabNum])

  return (
  
  <ul className="nav nav-tabs">
    {TABS.map(item => (
      <li className={classnames("nav-item", {mactive: item.type === activeTabNum})}>
        <button  
           className={classnames("nav-link", {active: item.type === activeTabNum}, {mactive: item.type === activeTabNum})}
           onClick={() => setActiveTab(item.type)}
        >
        {item.title}</button >
      </li>))
    }
  </ul>
  )
}