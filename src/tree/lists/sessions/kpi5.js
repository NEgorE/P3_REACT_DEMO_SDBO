import React, { useEffect, useState } from "react";
import { subscriberFilter1 } from '../../../MessageService.js';

export const Kpi5 = (props) => {

    const log_prefix = 'KPI5: '

    const currFilter1 = subscriberFilter1._value

    const [kpi5, setKpi5] = useState(false)
    const [kpi5data, setKpi5data] = useState(false)

    useEffect(() => {
        getKpi5Data();
    }, [])

    useEffect(() => {
        if(kpi5data){
            generateKpi5(kpi5data);
        }
    }, [kpi5data])

    useEffect(() => {
        getKpi5Data();
    }, [currFilter1])
    
    function getKpi5Data() {
        let result = false;
        if ( currFilter1.length <= 0 ) {
            fetch(`http://localhost:3001/select_session_kpi5/filter1=`)
            .then(response => {
                return response.text();
            })
            .then(data => {
                result = JSON.parse(data);
                setKpi5data(result);
            });
        }
        else {
            const query = `http://localhost:3001/select_session_kpi5/filter1=${currFilter1}`
            fetch(query)
            .then(response => {
                return response.text();
            })
            .then(data => {
                result = JSON.parse(data);
                setKpi5data(result);
            });
        }
    };

    function generateKpi5(data) {
        const maxPeriod = data.map(item => item.date_year_month).sort((a, b) => a > b ? -1 : 1)[0]
        const maxPeriodPref = data.map(item => item.date_year_month).sort((a, b) => a > b ? -1 : 1)[1]
        var valueOfMaxPeriod = data.filter(item => item.date_year_month === maxPeriod).map(item => item.avg_duration)[0];
        var valueOfMaxPeriodPref = data.filter(item => item.date_year_month === maxPeriodPref).map(item => item.avg_duration)[0];

        const element = (
            <div class='col obj h-100'>
                <div class='row h-25 row-kpi'>
                    <div class='col h-100'>
                        <div class="row h-100">
                            <p class='kpi-text-f-title-sess'>AVG Duration for {maxPeriod}</p>
                        </div>
                    </div>
                </div>
                <div class='row h-75 row-kpi'>
                    <div class='col col-8 h-100 '>
                        <div class="row align-items-center h-100">
                            <p class='kpi-text-f-time'>{valueOfMaxPeriod}</p>
                        </div>
                    </div>
                    <div class='col col-4'>
                        <div class='row mh-55'>
                            <div class="row align-items-end h-100">
                                <p class='kpi-text-s-time'>{valueOfMaxPeriodPref}</p>
                            </div>
                        </div>
                        <div class='row mh-40'>
                            <div class="row align-items-start h-100">
                                <p class='kpi-text-s-title-time'>{maxPeriodPref}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
        setKpi5(element)
    }

    return (
        kpi5 ? kpi5 : 'Smth wrong'
    )
}