import React, { useRef, useEffect, useState } from "react";
import {select, scaleLinear, scaleBand, axisLeft, ticks} from "d3";

function SelectedChart(props) {
    const svgRef = useRef();

    const subjects = props.subjects;

    
    return (
        <React.Fragment>
                    <svg ref={svgRef} width={800} height={550}>
                     
                     </svg>
        </React.Fragment>
    )
}
export default SelectedChart;