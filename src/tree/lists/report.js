import React, { useEffect } from "react"
import {TABS} from '../components/tabs/constants';
import { subscriber, messageService } from '../../MessageService.js';

import "bootstrap/dist/css/bootstrap.min.css";
import "./report.css";

export const Report = ({numTab}) => {

    var content = TABS.filter(item => item.type === numTab).map(item => item.obj)[0]

    return (
        //one day there will be an object :)
        <div className="container-fluid report">
            {content ? content : 'There is no information about tab N* ' + numTab + ' '}
        </div>
    )
}