import React, { useEffect, useState } from "react";
import { Chart14 } from './chart14.js';
import { Chart15 } from './chart15.js';
import { Chart16 } from './chart16.js';
import { Chart17 } from './chart17.js';

export const Comments = (props) => {

    const [container, setContainer] = useState(false)

    useEffect(() => {
        renderCharts();
    }, [])

    function renderCharts() {
        const element = (
            <div className="container-fluid h-100">
                <div class="row h-50">
                    <div class='col col-5 h-100 cobj'>
                        <div class='col obj h-100'>
                            <Chart14   />
                        </div>
                    </div>
                    <div class='col col-7 h-100 cobj' >
                        <div class='col obj h-100'>
                            <Chart16   /> 
                        </div>
                    </div>
                </div>
                <div class="row h-50">
                    <div class='col col-5 h-100 cobj'>
                        <div class='col obj h-100'>
                            <Chart15   />  
                        </div>
                    </div>
                    <div class='col col-7 h-100 cobj' >
                        <div class='col obj h-100'>
                            <Chart17   /> 
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