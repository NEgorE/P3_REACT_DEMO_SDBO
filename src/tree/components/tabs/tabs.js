import React, {useEffect, useState} from "react"
import classnames from "classnames"
import {TABS} from '../constants.js';

import "bootstrap/dist/css/bootstrap.min.css";
import "./tabs.css";


export const Tabs = ({changeTab}) => {

  const [activeTabNum, setActiveTabNum] = useState(TABS.filter(item => item.type === 1).map(item => item.type)[0])

  const setActiveTab = (tab) => {
    setActiveTabNum(tab)
  }

  useEffect(() => {
    changeTab(activeTabNum)
  }, [activeTabNum])

  return (
  
  <ul className="nav nav-tabs">
    {TABS.map(item => (
      <li className={classnames("nav-item")}>
        <button  
           className={classnames("nav-link", {active: item.type === activeTabNum})}
           onClick={() => setActiveTab(item.type)}
        >
        {item.title}</button >
      </li>))
    }
  </ul>
  )
}