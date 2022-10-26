import React, { useEffect, useState } from "react";
import { Chart4 } from './chart4.js';
import { Chart3 } from './chart3.js';
import { Chart2 } from './chart2.js';
import { Chart1 } from './chart1.js';
import { Kpi2 } from './kpi2.js';
import { Kpi1 } from './kpi1.js';
import { RB1 } from './rb1.js';
import { Filter1 } from './filter1.js';

import "bootstrap/dist/css/bootstrap.min.css";
import "./mau_dau_crr.css"

export const Maudaucrr = (props) => {

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
                            <div class='col col-6'>
                                <Filter1 renderCharts={() => renderCharts()} />
                            </div>
                            <div class='col col-6 cobj'>
                                <RB1 renderCharts={() => renderCharts()} />
                            </div>
                        </div>
                        <div class="row mh-80">
                            <div class='col h-100 cobj' >
                                <Kpi1 />
                            </div>
                            <div class='col h-100 cobj' >
                                <Kpi2 />
                            </div>
                        </div>
                    </div>
                    <div class='col col-4 h-100 cobj' >
                        <div class='col obj h-100'>
                            <Chart1 />  
                        </div>
                    </div>
                </div>
                <div class="row mh-60">
                    <div class='col col-4 h-100 cobj' >
                        <div class='col obj h-100'>
                            <Chart2 />
                        </div>
                    </div>
                    <div class='col col-4 h-100 cobj'>
                        <div class='col obj h-100'>
                            <Chart3 />
                        </div>
                    </div>
                    <div class='col col-4 h-100 cobj' >
                        <div class='col obj h-100'>
                            <Chart4 />
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