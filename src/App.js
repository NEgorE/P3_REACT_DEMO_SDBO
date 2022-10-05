import React, { useEffect, useMemo, useState } from 'react'

import {Tabs} from './tree/components/tabs/tabs.tsx';
import {TABS} from './tree/components/tabs/constants';
import {Report} from './tree/lists/report.tsx';

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';


function App() {
    const [activeTabNum, setActiveTabNum] = useState(TABS.filter(item => item.type === 1).map(item => item.type)[0])
    console.log(activeTabNum)

    return(
        <div className="container-fluid text-center">
            <Tabs changeTab={(tab) => setActiveTabNum(tab)}/>
            <Report numTab = {activeTabNum} />
        </div>
    )
}
export default App;