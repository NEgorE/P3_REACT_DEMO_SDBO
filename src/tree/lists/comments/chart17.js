import React, { useEffect, useState } from "react";
import ReactWordcloud from 'react-wordcloud';
import chroma from "chroma-js";

export const Chart17 = (props) => {

    const log_prefix = 'CHART17: ';

    const f = chroma.scale(['#28c6d5','#545352']).mode('hsl');

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

    const [chart17, setChart17] = useState(false)
    const [chart17data, setchart17data] = useState(false)

    useEffect(() => {
        getChart17Data();
    }, [])

    useEffect(() => {
        if(chart17data){
            generateChart17(chart17data);
        }
    }, [chart17data])


    function getChart17Data() {
        let result = false;
        const query = `http://localhost:3001/select_comment_cloud_data/`
        fetch(query)
        .then(response => {
            return response.text();
        })
        .then(data => {
            result = JSON.parse(data);
            setchart17data(result);
        })
    };

    function generateChart17(input_words) {
        const new_input_words = [...input_words.filter(item => item.sys_type === 'iOS')]
        const maxValue = new_input_words.map(item => item.value)[0];
        const element = [
            <div class='row mh-10'>
                <p class='chart-title '>iOS</p>
            </div>, 
            <div class='row mh-90'>
                <ReactWordcloud 
                    words={new_input_words} 
                    options={options}
                    callbacks={callbacks(maxValue)}
                /> 
            </div>
        ];
        setChart17(element);
    }

    return (
        chart17 ? chart17 : 'Smth wrong'
    )
}