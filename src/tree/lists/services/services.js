import React, { useEffect, useState } from "react";
import { Filter1 } from '../../components/filtres/filter1.js';
import { Chart5 } from './chart5.js';
import { Chart6 } from "./chart6.js";
import { Chart7 } from "./chart7.js";
import { Chart8 } from "./chart8.js";
import { Chart9 } from "./chart9.js";

export const Services = (props) => {

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
                                <div class='col obj h-100'>
                                    <Chart5 /> 
                                </div>                            
                            </div>
                        </div>
                    </div>
                    <div class='col col-4 h-100 cobj' >
                        <div class='col obj h-100'>
                            <Chart6 />  
                        </div>
                    </div>
                </div>
                <div class="row mh-60">
                    <div class='col col-4 h-100 cobj' >
                        <div class='col obj h-100'>
                            <Chart7 />
                        </div>
                    </div>
                    <div class='col col-4 h-100 cobj'>
                        <div class='col obj h-100'>
                            <Chart8 />
                        </div>
                    </div>
                    <div class='col col-4 h-100 cobj' >
                        <div class='col obj h-100'>
                            <Chart9 />
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