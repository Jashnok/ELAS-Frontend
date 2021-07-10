import React from 'react';
import ReactApexChart from "react-apexcharts";

export default function ApexColumnChart(props) {
    const markedSubjects = props.selected;
    const generateXAxis = (markedsubjects) => {
        const xAxis = [];
        for (let marked of markedsubjects) {
            if (!xAxis.includes(marked.subject_type)) {
                xAxis.push(marked.subject_type);
            }
        }
        return xAxis;
    }

    const xAxis = generateXAxis(markedSubjects);

    const generateXYData = (marked, xAxis) => {
        const data = [];
        for (let x of xAxis) {
            if (x === marked.subject_type) {
                if (marked.sws === '1') {
                    data.push({
                        x: x,
                        y: 1,
                    })
                } else if (marked.sws === '2') {
                    data.push({
                        x: x,
                        y: 2,
                    })
                } else if (marked.sws === '3') {
                    data.push({
                        x: x,
                        y: 3,
                    })
                }else if(marked.sws === ' '){
                   data.push({
                       x: x,
                       y: 1,
                   })
                } else {
                    data.push({
                        x: x,
                        y: 4,
                    })
                }
            } else {
                data.push({
                    x: x,
                    y: 0,
                })
            }
        }
        return data;
    }

    const generateData = (markedSubjects, xAxis) => {
        const data = [];
        for (let marked of markedSubjects) {
            data.push({
                name: marked.name,
                data: generateXYData(marked, xAxis)
            })
        }
        return data;
    }

    const chartdata = generateData(markedSubjects, xAxis);

    const state = {
        series: chartdata,
        options: {
            chart: {
                type: 'bar',
                height: 200,
                stacked: true,
                toolbar: {
                    show: true
                },

            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    borderRadius: 10,
                    barHeight: '0%',
                },
            },
            dataLabels: {
                enabled: false,
            },
            xaxis: {
                categories: xAxis,
                labels: {
                    style: {
                        fontFamily: 'small-caps'
                    }
                }
            },
            legend: {
                show: false,
                position: 'right',
                offsetY: 100
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                x: {
                    show: true,
                },
                y: {
                    formatter: function (val) {
                        return ''
                    }
                }
            },
            yaxis: {
                show: true,
                labels: {
                    show: true,
                    style: {
                        fontFamily: 'small-caps'
                    }
                },
                title: {
                    text: 'SWS',
                    rotate: -0,
                    offsetY: -130,
                    style: {
                        fontFamily: "small-caps"
                    }
                }
            },
            colors: ['#00e5ff', '#33c9dc', '#2196f3', '#0262f3',
                '#07509e', '#3f51b1'],
            grid: {
                show: true,
            },
            noData: {
                text: 'You have to select at least one subject',
                style: {
                    fontFamily: 'small-caps',
                }
            }
        }
    }
    return (
            <ReactApexChart options={state.options} series={state.series} type='bar' height="100%"/>

    );
}