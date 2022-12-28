import React, { useEffect, useState } from "react";
import { Filter1 } from '../../components/filtres/filter1.js';
import { Chart13 } from './chart13.js';
import { Chart12 } from './chart12.js';
import { Chart11 } from './chart11.js';
import { Kpi3 } from './kpi3.js';
import { Kpi4 } from './kpi4.js';
import { Kpi5 } from './kpi5.js';

import "./session.css";

export const Sessions = (props) => {

    const [container, setContainer] = useState(false)

    useEffect(() => {
        renderCharts();
    }, [])

    function renderCharts() {
        const element = (
            <div className="container-fluid h-100">
                <div class="row mh-40">
                    <div class='col col-8 h-100'>
                        <div class="row mh-20">
                            <div class='col cobj'>
                                <Filter1 renderCharts={() => renderCharts()} />
                            </div>
                        </div>
                        <div class="row mh-80">
                            <div class='col h-100 cobj' >
                                <Kpi3 />
                            </div>
                            <div class='col h-100 cobj' >
                                <Kpi4 />
                            </div>
                            <div class='col h-100 cobj' >
                                <Kpi5 />
                            </div>
                        </div>
                    </div>
                    <div class='col col-4 h-100 cobj' >
                        <div class='col obj h-100'>
                            <Chart11 />  
                        </div>
                    </div>
                </div>
                <div class="row mh-60">
                    <div class='col col-6 h-100 cobj' >
                        <div class='col obj h-100'>
                            <Chart12 />
                        </div>
                    </div>
                    <div class='col col-6 h-100 cobj' >
                        <div class='col obj h-100'>
                            <Chart13 />
                        </div>
                    </div>
                </div>
            </div>  
        )
        setContainer(element)
    }

    return (
        container ? container : 'Smth wrong' 
    )
}