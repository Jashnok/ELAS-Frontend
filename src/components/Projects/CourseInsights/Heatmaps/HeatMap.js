import React from 'react';
import ReactApexChart from "react-apexcharts";

function generateHeatMapData(subjectsAndOverlapping) {
    let data = [];
    let subjectX = "";
    for (let subject of subjectsAndOverlapping) {
        if (subjectX !== subject.subjectA.name) {
            subjectX = subject.subjectA.name;
            data.push({
                    name: subjectX,
                    data: generateData(subjectX, subjectsAndOverlapping)
                }
            )
        }
    }
    return data;
}

function generateData(subject, subjectsAndOverlapping) {
    let xydata = [];
    for (let sub of subjectsAndOverlapping) {
        if (subject === sub.subjectA.name) {
            if (sub.overlaps.length === 0) {
                if (sub.subjectA.name === sub.subjectB.name) {
                    xydata.push({
                        x: sub.subjectB.name,
                        y: 0
                    })
                } else {
                    xydata.push({
                        x: sub.subjectB.name,
                        y: 10
                    })
                }
            } else {
                for (let overlap of sub.overlaps)
                    if (overlap.severity === "edge") {

                        xydata.push({
                            x: sub.subjectB.name,
                            y: 50
                        })
                    } else {
                        xydata.push({
                            x: sub.subjectB.name,
                            y: 100
                        })
                    }
            }
        }
    }
    return xydata;
}

export default function HeatMap(props) {
    const heatMapData = generateHeatMapData(props.data);

    const state = {
        series: heatMapData,
        options: {
            chart: {
                type: 'heatmap',
            },
            plotOptions: {
                heatmap: {
                    shadeIntensity: 0.5,
                    radius: 0,
                    useFillColorAsStroke: true,
                    colorScale: {
                        ranges: [{
                            from: 1,
                            to: 20,
                            name: 'no overlapping',
                            color: '#7de4f6'
                        },
                            {
                                from: 22,
                                to: 50,
                                name: 'no time between subjects',
                                color: '#0273fc'
                            },
                            {
                                from: 52,
                                to: 100,
                                name: 'overlapping',
                                color: '#031787'
                            }
                        ]
                    }
                }
            },
            dataLabels: {
                enabled: false
            },
            tooltip: {
                onDatasetHover: {
                    highlightDataSeries: false,
                },
                enabled: true,
                x: {
                    show: false,
                },
                y: {
                    formatter: function (val) {
                        if (val === 10) {
                            return 'no overlapping'
                        } else if (val === 50) {
                            return 'no time between subjects'
                        } else if (val === 100) {
                            return 'overlapping'
                        }
                    }
                }
            },
            xaxis: {
                type: 'category',
                labels: {
                    rotate: -55,
                    rotateAlways: false,
                    show: true,
                    trim: true,
                    hideOverlappingLabels: false,
                    maxHeight: 80,
                    style: {
                        colors: '#f50057',
                        fontSize: '11px',
                        fontFamily: "small-caps"
                    },
                    offsetX: 5,
                },
            },
            yaxis: {
                show: true,
                opposite: true,
                forceNiceScale: true,
                labels: {
                    show: true,
                    maxWidth: 80,
                    align: 'left',
                    style: {
                        fontSize: '11px',
                        colors: '#f50057',
                        fontFamily: 'small-caps'
                    },
                }
            },
            grid: {
                show: true,
                borderColor: "#f50057",
                position: 'front',
                xaxis: {
                    lines: {
                        show: true
                    }
                },
                yaxis: {
                    lines: {
                        show: true
                    }
                },
            },
            stroke: {
                width: 1
            },
            title: {
                text: 'Your Overlappings'
            },
        },
    };
    return (
        <div id="chart">
            <ReactApexChart options={state.options} series={state.series} type="heatmap" height={370} width={370}/>
        </div>
    );
}


