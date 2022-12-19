import React, { useEffect, useState } from "react";
import { Filter1 } from '../../components/filtres/filter1.js';
import { Chart13 } from './chart13.js';
import { Chart12 } from './chart12.js';

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
                                KPI1
                            </div>
                            <div class='col h-100 cobj' >
                                KPI2
                            </div>
                            <div class='col h-100 cobj' >
                                KPI3
                            </div>
                        </div>
                    </div>
                    <div class='col col-4 h-100 cobj' >
                        <div class='col obj h-100'>
                            lol 
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