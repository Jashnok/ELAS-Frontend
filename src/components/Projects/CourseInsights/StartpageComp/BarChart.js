import React, { useRef, useEffect, useState } from "react";
import {select, scaleLinear, scaleBand, axisLeft, ticks} from "d3";

function BarChart(props) {
  const svgRef = useRef();

  const random = [];
  const test = [];

  for (const [key, value] of Object.entries(props.studyprogram.stats)) {
    random.push(value);
    test.push({[key]:value});
  }

  console.log(test);
  test.map((value, index)=>console.log(Object.keys(value)[0]));

  console.log(test.map((value, index) => Object.keys(value)[0]));
  

  useEffect(() => {

    const svg = select(svgRef.current);

    const xScale =  scaleLinear()
    .domain([0, 60])
    .range([150, -130]);

    const yScale = scaleBand()
    .domain(random.map((value, index) =>index )) //random.map((value, index) => index
    .range([0, 600])
    .padding(0.5);

    const tickLabels= test.map((value, index) => Object.keys(value)[0]);
    const yAxis = axisLeft(yScale).ticks(test.length).tickFormat((value,index) => tickLabels[index]);

    const colorscale = scaleLinear()
        .domain(ticks(0, 150, 25, 50))
        .range([  "#00e5ff", "#33c9dc","#2196f3", "#1668bf",
          "#07509e", "#3f51b1", "#3f51b5"
        ]);

    svg
        .select(".y-axis")
        .style("transform", "translateX(350px) ")
        .style("font-size", "20.0")
        .style("font-variant", "small-caps")
        .style("color","#f50057")
        .call(yAxis);

    svg
      .selectAll(".bar")
      .data(random)
      .join("rect")
      .attr("class", "bar")
      .style("transform", "translateX(350px)")
      .attr("fill", d=>colorscale(d))
      .attr("height",yScale.bandwidth())
      .transition()
      .attr("x", 0)
      .attr("y", (value,index) => yScale(index))
      .attr("width", (value) => 200 - xScale(value));
  }, [random]);

  return (
    <React.Fragment>
        <svg ref={svgRef} width={800} height={700}>
          <g className="y-axis" />
        </svg>
    </React.Fragment>
  );
}
export default BarChart;
