import React, {FC, useEffect, useState} from "react"
import classnames from "classnames"
import {TABS} from '../components/tabs/constants';

import "bootstrap/dist/css/bootstrap.min.css";
import "./report.css";

interface IProps {
    numTab: number
}


export const Report: FC<IProps> = ({numTab}) => {

    var content = TABS.filter(item => item.type === numTab).map(item => item.obj)[0]

    return (
        <div className="container-fluid report">
            {content ? content : 'There is no information about tab N* ' + numTab}
        </div>
        
    )
}