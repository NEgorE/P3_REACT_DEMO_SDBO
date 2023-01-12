import React, { useEffect, useState } from "react";
import ReactWordcloud from 'react-wordcloud';

export const Chart16 = (props) => {

    const log_prefix = 'CHART16: ';

    const words = [
        {
          text: 'told',
          value: 64,
        },
        {
          text: 'mistake',
          value: 11,
        },
        {
          text: 'thought',
          value: 16,
        },
        {
          text: 'bad',
          value: 17,
        },
    ];

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
        //let result = false;
        //const query = `http://localhost:3001/select_comment_bar_data/`
        //fetch(query)
        //.then(response => {
        //    return response.text();
        //})
        //.then(data => {
        //    result = JSON.parse(data);
        //    setchart16data(result);
        //})
        setchart16data(words);
    };

    function generateChart16(input_words) {
        const element = [
            <div class='row mh-10'>
                <p class='chart-title '>Android</p>
            </div>, 
            <div class='row mh-90'>
                <ReactWordcloud words={input_words} /> 
            </div>
        ];
        setChart16(element);
    }

    return (
        chart16 ? chart16 : 'Smth wrong'
    )
}