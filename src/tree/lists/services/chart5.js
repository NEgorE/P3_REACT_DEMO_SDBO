import React, { useEffect, useState } from "react";
import { subscriberFilter1 } from '../../../MessageService.js';

import { Treemap, ResponsiveContainer } from 'recharts';

export const Chart5 = (props) => {

    function generateLightColorHex() {
        let color = "#";
        for (let i = 0; i < 3; i++)
          color += ("0" + Math.floor(((1 + Math.random()) * Math.pow(16, 2)) / 2).toString(16)).slice(-2);
        return color;
    }

    const  CustomizedContent = (props) => {

        const { depth, x, y, width, height, name, size, index } = props;

        return (
            <g>
                <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    stroke="#fff"
                    style={{
                        fill: generateLightColorHex(),
                        strokeWidth: 2 / (depth + 1e-10),
                        strokeOpacity: 1 / (depth + 1e-10),
                    }}
                />
                <text x={x + 4} y={y + height / 2 + 7} fill="#000000 " fontSize={10} >
                    {name}
                </text>
                <text x={x + 4} y={y + height / 10 + 10} fill="#000000 " fontSize={16} >
                    {size}
                </text>
            </g>
        );    
    };

    const log_prefix = 'CHART5: '

    const currFilter1 = subscriberFilter1._value

    const [chart5, setChart5] = useState(false)
    const [chart5data, setchart5data] = useState(false)

    useEffect(() => {
        getChart5Data();
    }, [])

    useEffect(() => {
        if(chart5data){
            generateChart5(chart5data);
        }
    }, [chart5data])

    useEffect(() => {
        getChart5Data();
    }, [currFilter1])

    function getChart5Data() {
        let result = false;
        const resultArr = [];
        if ( currFilter1.length <= 0 ) {
            fetch(`http://localhost:3001/select_services_count/filter1=`)
            .then(response => {
                return response.text();
            })
            .then(data => {
                result = JSON.parse(data);
                for (let i = 0; i < result.length; i++) {
                    const currentResult = result[i]
                    let result2 = {};
                    result2.name = currentResult.name
                    result2.size = parseInt(currentResult.size)
                    resultArr.push(result2)
                }
                setchart5data(resultArr);
            });
        }
        else {
            const query = `http://localhost:3001/select_services_count/filter1=${currFilter1}`
            fetch(query)
            .then(response => {
                return response.text();
            })
            .then(data => {
                result = JSON.parse(data);
                for (let i = 0; i < result.length; i++) {
                    const currentResult = result[i]
                    let result2 = {};
                    result2.name = currentResult.name
                    result2.size = parseInt(currentResult.size)
                    resultArr.push(result2)
                }
                setchart5data(resultArr);
            });
        }
    }

    function generateChart5(chart5data) {
        const element = [
            <div class='row mh-15'>
                <p class='chart-title '>Unique uses of services</p>
            </div>, 
            <div class="col mh-85 treemap_container">
                <ResponsiveContainer width={'100%'} height={'100%'}>
                    <Treemap 
                        data={chart5data} 
                        dataKey="size" 
                        ratio={4 / 3}  
                        fill="#8884d8" 
                        content={<CustomizedContent />}
                    />
                </ResponsiveContainer>
            </div>
            
        ]; 
        setChart5(element);
    }

    return (
        chart5 ? chart5 : 'Smth wrong'
    )
}