import React, { useEffect, useState } from "react";
import { subscriberMetric1 , subscriberFilter1 } from '../../../MessageService.js';
import { METRICS } from '../../components/constants';

export const Kpi4 = (props) => {

    const log_prefix = 'KPI4: '

    const currMetric = subscriberMetric1._value
    const currFilter1 = subscriberFilter1._value

    const [kpi4, setKpi4] = useState(false)
    const [kpi4data, setKpi4data] = useState(false)

    useEffect(() => {
        getKpi4Data();
    }, [])

    useEffect(() => {
        if(kpi4data){
            generateKpi4(kpi4data, METRICS, currMetric);
        }
    }, [kpi4data])

    useEffect(() => {
        getKpi4Data();
    }, [currFilter1, currMetric])
    
    function getKpi4Data() {
        let result = false;
        if ( currFilter1.length <= 0 ) {
            fetch(`http://localhost:3001/select_mau`)
            .then(response => {
                return response.text();
            })
            .then(data => {
                result = JSON.parse(data);
                setKpi4data(result);
            });
        }
        else {
            const query = `http://localhost:3001/select_mau_by_filters/filter1=${currFilter1}`
            fetch(query)
            .then(response => {
                return response.text();
            })
            .then(data => {
                result = JSON.parse(data);
                setKpi4data(result);
            });
        }
    };

    function generateKpi4(data, METRICS, currMetric) {
        const use_metric = METRICS.filter(item => item.npp === currMetric).map(item => item.value)[0].toUpperCase()
        const maxPeriod = data.map(item => item.date_year_month).sort((a, b) => a > b ? -1 : 1)[0]
        const maxPeriodPref = data.map(item => item.date_year_month).sort((a, b) => a > b ? -1 : 1)[1]
        if(use_metric === 'MAU') {
            var valueOfMaxPeriod = parseInt(data.filter(item => item.date_year_month === maxPeriod).map(item => item.mau)[0])
            var valueOfMaxPeriodPref = parseInt(data.filter(item => item.date_year_month === maxPeriodPref).map(item => item.mau)[0])
        }
        else {
            var valueOfMaxPeriod = data.filter(item => item.date_year_month === maxPeriod).map(item => item.dau)[0]
            var valueOfMaxPeriodPref = data.filter(item => item.date_year_month === maxPeriodPref).map(item => item.dau)[0]
        }
        const element = (
            <div class='col obj h-100'>
                <div class='row h-25 row-kpi'>
                    <div class='col h-100'>
                        <div class="row h-100">
                            <p class='kpi-text-f-title'>{use_metric} for {maxPeriod}</p>
                        </div>
                    </div>
                </div>
                <div class='row h-75 row-kpi'>
                    <div class='col col-8 h-100 '>
                        <div class="row align-items-center h-100">
                            <p class='kpi-text-f'>{valueOfMaxPeriod}</p>
                        </div>
                        </div>
                    <div class='col col-4'>
                        <div class='row mh-60'>
                            <div class="row align-items-end h-100">
                                <p class='kpi-text-s'>{valueOfMaxPeriodPref}</p>
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
        setKpi4(element)
    }

    return (
        kpi4 ? kpi4 : 'Smth wrong'
    )
}