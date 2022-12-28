import React, { useEffect, useState } from "react";
import { subscriberFilter1 } from '../../../MessageService.js';

export const Kpi3 = (props) => {

    const log_prefix = 'KPI3: '

    const currFilter1 = subscriberFilter1._value

    const [kpi3, setKpi3] = useState(false)
    const [kpi3data, setKpi3data] = useState(false)

    useEffect(() => {
        getKpi3Data();
    }, [])

    useEffect(() => {
        if(kpi3data){
            generateKpi3(kpi3data);
        }
    }, [kpi3data])

    useEffect(() => {
        getKpi3Data();
    }, [currFilter1])
    
    function getKpi3Data() {
        let result = false;
        if ( currFilter1.length <= 0 ) {
            fetch(`http://localhost:3001/select_session_kpi3/filter1=`)
            .then(response => {
                return response.text();
            })
            .then(data => {
                result = JSON.parse(data);
                setKpi3data(result);
            });
        }
        else {
            const query = `http://localhost:3001/select_session_kpi3/filter1=${currFilter1}`
            fetch(query)
            .then(response => {
                return response.text();
            })
            .then(data => {
                result = JSON.parse(data);
                setKpi3data(result);
            });
        }
    };

    function generateKpi3(data) {
        const maxPeriod = data.map(item => item.date_year_month).sort((a, b) => a > b ? -1 : 1)[0]
        const maxPeriodPref = data.map(item => item.date_year_month).sort((a, b) => a > b ? -1 : 1)[1]
        var valueOfMaxPeriod = data.filter(item => item.date_year_month === maxPeriod).map(item => item.avg_succ_sess)[0]
        var valueOfMaxPeriodPref = data.filter(item => item.date_year_month === maxPeriodPref).map(item => item.avg_succ_sess)[0]

        const element = (
            <div class='col obj h-100'>
                <div class='row h-25 row-kpi'>
                    <div class='col h-100'>
                        <div class="row h-100">
                            <p class='kpi-text-f-title-sess'>Conversion for {maxPeriod}</p>
                        </div>
                    </div>
                </div>
                <div class='row h-75 row-kpi'>
                    <div class='col col-8 h-100 '>
                        <div class="row align-items-center h-100">
                            <p class='kpi-text-f'>{valueOfMaxPeriod}%</p>
                        </div>
                        </div>
                    <div class='col col-4'>
                        <div class='row mh-60'>
                            <div class="row align-items-end h-100">
                                <p class='kpi-text-s'>{valueOfMaxPeriodPref}%</p>
                            </div>
                        </div>
                        <div class='row mh-40'>
                            <div class="row align-items-start h-100">
                                <p class='kpi-text-s-title'>{maxPeriodPref}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
        setKpi3(element)
    }

    return (
        kpi3 ? kpi3 : 'Smth wrong'
    )
}