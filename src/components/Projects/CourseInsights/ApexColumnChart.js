import React from 'react';
import ReactApexChart from "react-apexcharts";

const markedSubjects2 = [{
    "name": "Betriebssysteme",
    "url": "https://campus.uni-due.de/lsf/rds?state=verpublish&status=init&vmfile=no&publishid=309996&moduleCall=webInfo&publishConfFile=webInfo&publishSubDir=veranstaltung",
    "subject_type": "Vorlesung",
    "shorttext": " ",
    "longtext": " ",
    "sws": "3",
    "timetable": [
        {
            "day": "Mi.",
            "time": {"from": "13:00", "to": "15:00"},
            "rhythm": "wöch.",
            "duration": "",
            "room": "",
            "status": " ",
            "comment": " "
        }
    ],
},
    {
        "name": "Mechanics I2",
        "url": "https://campus.uni-due.de/lsf/rds?state=verpublish&status=init&vmfile=no&publishid=316856&moduleCall=webInfo&publishConfFile=webInfo&publishSubDir=veranstaltung",
        "subject_type": "Vorlesung",
        "shorttext": " ",
        "longtext": "Mechanics 2",
        "sws": "2",
        "timetable": [
            {
                "day": "Mi.",
                "time": {"from": "09:00", "to": "10:00"},
                "rhythm": "wöch.",
                "duration": "",
                "room": "",
                "status": " ",
                "comment": " "
            }
        ],
    }, {
        "name": "Übung zu \"Berechenbarkeit und Komplexität\"",
        "url": "https://campus.uni-due.de/lsf/rds?state=verpublish&status=init&vmfile=no&publishid=310232&moduleCall=webInfo&publishConfFile=webInfo&publishSubDir=veranstaltung",
        "subject_type": "Übung",
        "shorttext": "B-THI",
        "longtext": " ",
        "sws": "2",
        "timetable": [
            {
                "day": "Mi.",
                "time": {"from": "10:00", "to": "12:00"},
                "rhythm": "wöch.",
                "duration": "",
                "room": "",
                "status": " ",
                "comment": " "
            }]
    },
    {
        "name": "Objektorientierte Programmierung Praktikum",
        "url": "https://campus.uni-due.de/lsf/rds?state=verpublish&status=init&vmfile=no&publishid=309878&moduleCall=webInfo&publishConfFile=webInfo&publishSubDir=veranstaltung",
        "subject_type": "Praktikum",
        "shorttext": "OOPP",
        "longtext": " ",
        "sws": "1",
        "persons": [
            {
                "name": "Petersen, Jörg , Dr.-Ing. Dipl.-Inform.",
                "url": "https://campus.uni-due.de/lsf/rds?state=verpublish&status=init&vmfile=no&moduleCall=webInfo&publishConfFile=webInfoPerson&publishSubDir=personal&keep=y&personal.pid=2874"
            },
            {
                "name": "Wiss. Mitarb., ",
                "url": "https://campus.uni-due.de/lsf/rds?state=verpublish&status=init&vmfile=no&moduleCall=webInfo&publishConfFile=webInfoPerson&publishSubDir=personal&keep=y&personal.pid=10168"
            }
        ],
        "timetable": [
            {
                "day": "Fr.",
                "time": {"from": "13:00", "to": "16:00"},
                "rhythm": "wöch.",
                "duration": {"from": "19.10.2018", "to": "07.12.2018"},
                "room": "",
                "status": " ",
                "comment": " "
            }]
    },
    {
        "name": "Übungen zu 'Wahrscheinlichkeitsrechnung und Statistik für Informatiker'",
        "url": "https://campus.uni-due.de/lsf/rds?state=verpublish&status=init&vmfile=no&publishid=310285&moduleCall=webInfo&publishConfFile=webInfo&publishSubDir=veranstaltung",
        "subject_type": "Übung",
        "shorttext": " ",
        "longtext": " ",
        "sws": "1",
        "persons": [
            {
                "name": "Simon, René , Dr.",
                "url": "https://campus.uni-due.de/lsf/rds?state=verpublish&status=init&vmfile=no&moduleCall=webInfo&publishConfFile=webInfoPerson&publishSubDir=personal&keep=y&personal.pid=50250"
            }
        ],
        "timetable": [
            {
                "day": "Do.",
                "time": {"from": "16:00", "to": "18:00"},
                "rhythm": "wöch.",
                "duration": "",
                "room": "",
                "status": " ",
                "comment": " "
            }
        ]
    },
    {
        "name": "Rechnernetze und Kommunikationssysteme",
        "url": "https://campus.uni-due.de/lsf/rds?state=verpublish&status=init&vmfile=no&publishid=309926&moduleCall=webInfo&publishConfFile=webInfo&publishSubDir=veranstaltung",
        "subject_type": "Vorlesung",
        "shorttext": "B-RSI",
        "longtext": " ",
        "sws": "2",
        "timetable": [
            {
                "day": "Mi.",
                "time": {"from": "12:00", "to": "14:00"},
                "rhythm": "wöch.",
                "duration": "",
                "room": "",
                "status": " ",
                "comment": " "
            }
        ]
    }
]

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
            /*responsive: [{
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0
                    }
                }
            }],*/
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
                    offsetY: -80,
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