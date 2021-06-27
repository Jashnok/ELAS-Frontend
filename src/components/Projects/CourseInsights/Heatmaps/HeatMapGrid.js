import React from "react";
import HeatMap from "react-heatmap-grid";


const data = [[0,50], [50,0]]



function label(value){
    if (value === 0){
        return ""
    }
    if(value === 20){
        return "no overlapping"
    }
    if (value === 50){
        return "no time between subjects"
    }
    if (value===100){
        return "overlapping"
    }
}

function color(value){
    if (value === 0){
        return "#fff"
    }
    if(value === 20){
        return "#ee729e"
    }
    if (value === 50){
        return "#ef3879"
    }
    if (value===100){
        return "#f50057"
    }
}


export default function HeatMapGrid(props) {
    const heatMapData = [];
    const xLabels = [];
    const yLabels = [];

    for(const [key,value] of Object.entries(props.subjects)){
        console.log(value);
        xLabels.push(value.name);
        yLabels.push(value.name);
        const row = [];
        for(const [key2, value2] of Object.entries(props.subjects)){
            console.log(value2);
            if (value === value2){
                row.push(0);
            }else if(value!== value2){
                for (const [key3, value3] of Object.entries(props.subjects[key].overlapping)){
                    if(value3.time === "no overlapping"){
                        row.push(20);
                    } else if(value3.time === "no time between subjects"){
                        row.push(50);
                    } else if (value3.time === "OVERLAPPING"){
                        row.push(100);
                    }
                }
                heatMapData.push(row);
            }
        }
    }
    console.log(heatMapData);

    return (
        <div style={{ fontSize: "13px" }}>
            <HeatMap
                xLabels={xLabels}
                yLabels={yLabels}
                xLabelsLocation={"bottom"}
                xLabelWidth={70}
                yLabelWidth={100}
                data={heatMapData}
                height={45}
                onClick={(x, y) => alert(`Clicked ${x}, ${y}`)}
                cellStyle={(background, value, min, max, heatMapData, x, y) => ({
                    background: color(value),
                    fontSize: "11.5px",
                    color: "#ffffff"
                })}
                cellRender={value => label(value)}
            />
        </div>
    );
}