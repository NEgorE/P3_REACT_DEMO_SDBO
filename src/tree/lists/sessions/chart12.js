import React, { useEffect, useState } from "react";
import { subscriberFilter1 } from '../../../MessageService.js';
import { interpolateYlGnBu } from 'd3-scale-chromatic';

export const Chart12 = (props) => {

    const log_prefix = 'CHART12: '

    const currFilter1 = subscriberFilter1._value

    const [chart12, setChart12] = useState(false)
    const [chart12data, setchart12data] = useState(false)

    useEffect(() => {
        getChart12Data();
    }, [])

    useEffect(() => {
        if(chart12data){
            generateChart12(chart12data);
        }
    }, [chart12data])

    useEffect(() => {
        getChart12Data();
    }, [currFilter1])
    
    function getChart12Data() {
        let result = false;
        const resultArr = [];
        if ( currFilter1.length <= 0 ) {
            fetch(`http://localhost:3001/select_session_chart12/filter1=`)
            .then(response => {
                return response.text();
            })
            .then(data => {
                result = JSON.parse(data);
                for (let i = 0; i < result.length; i++) {
                    const currentResult = result[i]
                    let result2 = {};
                    result2.date_year_month = currentResult.date_year_month;
                    result2.diap = currentResult.diap;
                    result2.count = currentResult.count;
                    resultArr.push(result2)
                }
                setchart12data(resultArr);
            });
        }
        else {
            const query = `http://localhost:3001/select_session_chart12/filter1=${currFilter1}`
            fetch(query)
            .then(response => {
                return response.text();
            })
            .then(data => {
                result = JSON.parse(data);
                for (let i = 0; i < result.length; i++) {
                    const currentResult = result[i]
                    let result2 = {};
                    result2.date_year_month = currentResult.date_year_month;
                    result2.diap = currentResult.diap;
                    result2.count = currentResult.count;
                    resultArr.push(result2)
                }
                setchart12data(resultArr);
            });
        }
    };

    function generateChart12(data) {
        console.log(data);
        const table_head_data =[...new Set(data.map(o => o.diap))];
        const table_hrow_data =[...new Set(data.map(o => o.date_year_month))];
        const minData = Math.min(...data.map(o => o.count)) ;
        const maxData = Math.max(...data.map(o => o.count)) ;
        console.log(table_hrow_data);
        const element = [
            <div class='row mh-10'>
                <p class='chart-title-2'>Session Concentration by parts of day</p>
            </div>, 
            <div class='row mh-90'>
                <div class='col container'>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col" class='heatmap-head-col'>#</th>
                                {table_head_data.map((el, key) =>(
                                    <th scope="col" id={`hmap_t_head ${key}`} class='heatmap-head-col'>{el}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                                {table_hrow_data.map((el1, key) =>(
                                    <tr>
                                        <th scope="row" id={`hmap_t_row ${key}`} class='heatmap-head-row'>{el1}</th>
                                        {
                                            data.filter(item => item.date_year_month === el1).map(item => item.count).map(
                                                (el2, key) =>(
                                                    <td 
                                                        class='table-value'  
                                                        id={`hmap_t_row_value ${key}`} 
                                                        data-toggle="tooltip" data-placement="top" title={`Count: ${el2}`}
                                                        style={{backgroundColor: interpolateYlGnBu((el2-minData)/(maxData-minData))}}
                                                        >
                                                    </td>
                                                )
                                            )
                                        }
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div> 
        ]; 
        setChart12(element);
    }

    return (
        chart12 ? chart12 : 'Smth wrong'
    )
}