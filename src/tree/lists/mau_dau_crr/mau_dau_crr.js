import React, {useEffect, useState} from "react"

import "bootstrap/dist/css/bootstrap.min.css";

export const Maudaucrr = ({}) => {

    return (
        <div className="container-fluid">
            <div class="row">
                <div class='col col-8'>
                    <div class="row">
                        <div class='col col-6'>Filters</div>
                        <div class='col col-6'>RadioButtons</div>
                    </div>
                    <div class="row">
                        <div class='col col-6'>CH2</div>
                        <div class='col col-6'>CH2</div>
                    </div>
                </div>
                <div class='col col-4 col-1lvl'>CH1</div>
            </div>
            <div class="row">
                <div class='col col-4 col-1lvl'>CH2</div>
                <div class='col col-4 col-1lvl'>CH3</div>
                <div class='col col-4 col-1lvl'>CH4</div>
            </div>
        </div>
        
    )
}