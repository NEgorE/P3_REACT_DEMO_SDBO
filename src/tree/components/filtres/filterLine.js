import React, {useEffect, useState} from "react";
import { subscriberFilter1 } from '../../../MessageService.js';

import "bootstrap/dist/css/bootstrap.min.css";
import "./filterLine.css";


export const FilterLine = () => {

    const log_prefix = 'FILTER_LINE: ';

    subscriberFilter1.subscribe((vl) => {
       
        if (currFilter1.length < vl.length) {
            setIsClear(isClear + 1)
        }
        else {
            setIsClear(isClear - 1)
        }
        setCurrFilter1(vl)
    })

    const [isClear, setIsClear] = useState(0)
    const [buttonClear, setButtonClear] = useState(0)

    const [currFilter1, setCurrFilter1] = useState([])
    useEffect(() => {
        console.log(log_prefix + isClear);
        console.log(log_prefix + currFilter1.length);
    }, [currFilter1])

    useEffect(() => {
        renderCrear(isClear);
    }, [isClear])

    function renderCrear(isClear) {
        if (isClear != 0){
            setButtonClear(
                <li className="nav-item nav-item-filter">
                    <button className="nav-link nav-link-filter-clear" onClick={() => {}} >Clear</button >
                </li>
            )
        }
        else {
            setButtonClear(
                <li className="nav-item nav-item-filter">
                    <div className="nav-link nav-link-no-filters"> No one filter selected </div >
                </li>
            )
        }
    }

    return (
        <ul className="nav nav-filters">
            {buttonClear ? buttonClear : false}
            {buttonClear ? buttonClear : false}
        </ul>
    )
}