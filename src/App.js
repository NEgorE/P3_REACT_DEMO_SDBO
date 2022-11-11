import React, { useState } from 'react'
import {Tabs} from './tree/components/tabs/tabs.js';
import {TABS} from './tree/components/constants';
import {Report} from './tree/lists/report.js';
import {FilterLine} from './tree/components/filtres/filterLine.js';

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

function App() {
    const [activeTabNum, setActiveTabNum] = useState(TABS.filter(item => item.type === 1).map(item => item.type)[0])

    return(
        <div className="container-fluid text-center">
            <Tabs changeTab={(tab) => setActiveTabNum(tab)}/>
            <FilterLine changeTab={(tab) => setActiveTabNum(tab)}/>
            <Report numTab = {activeTabNum} />
        </div>
    )
}
export default App;