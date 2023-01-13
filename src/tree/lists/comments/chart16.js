import React, { useEffect, useState } from "react";
import ReactWordcloud from 'react-wordcloud';
import chroma from "chroma-js";

export const Chart16 = (props) => {

    const log_prefix = 'CHART16: ';

    const f = chroma.scale(['#ffcf02','#4477aa']).mode('hsl');

    const options ={
        rotations: 1,
        rotationAngles: [0],
    };

    const callbacks = (maxValue) => {
        const return_callback = {
            getWordColor: word => f(word.value/maxValue).hex()
        }

        return return_callback
      }

    const [chart16, setChart16] = useState(false)
    const [chart16data, setchart16data] = useState(false)

    useEffect(() => {
        getChart16Data();
    }, [])

    useEffect(() => {
        if(chart16data){
            generateChart16(chart16data);
        }
    }, [chart16data])


    function getChart16Data() {
        let result = false;
        const query = `http://localhost:3001/select_comment_cloud_data/`
        fetch(query)
        .then(response => {
            return response.text();
        })
        .then(data => {
            result = JSON.parse(data);
            setchart16data(result);
        })
    };

    function generateChart16(input_words) {
        const new_input_words = [...input_words.filter(item => item.sys_type === 'Android')]
        const maxValue = new_input_words.map(item => item.value)[0];
        const element = [
            <div class='row mh-10'>
                <p class='chart-title '>Android</p>
            </div>, 
            <div class='row mh-90'>
                <ReactWordcloud 
                    words={new_input_words} 
                    options={options}
                    callbacks={callbacks(maxValue)}
                /> 
            </div>
        ];
        setChart16(element);
    }

    return (
        chart16 ? chart16 : 'Smth wrong'
    )
}