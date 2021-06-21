import React from 'react';


import Chart from "react-apexcharts";



class HeatMap extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            options: {
                chart: {
                    group: 'heatmap'
                },

            },
            colors: ["white", "blue", "purple"],
            dataLabels: {
                enabled: false
            },
            legend: {
                show: true
            },
            tooltip: {
                enabled: false
            },



            title: {
                text: "test"
            },


            series: [
                {
                    name: "subject1",
                    data: [{
                        x: "subject1",
                        y: 0
                    },
                        {
                            x: "subject2",
                            y: 100
                        }, {
                            x: "subject3",
                            y: 30
                        },]
                },
                {
                    name: "subject2",
                    data: [{
                        x: "subject1",
                        y: 100
                    },
                        {
                            x: "subject2",
                            y: 0
                        },{
                            x: "subject3",
                            y: 100
                        },]
                },
                {
                    name: "subject3",
                    data: [{
                        x: "subject1",
                        y: 30
                    },
                        {
                            x: "subject2",
                            y: 100
                        },{
                            x: "subject3",
                            y: 0
                        },]
                }


            ]
        };
    }

    render() {
        return (

                        <Chart
                            options={this.state.options}
                            series={this.state.series}
                            type="heatmap"
                            width="300"
                        />

        );
    }
}

export default HeatMap;

