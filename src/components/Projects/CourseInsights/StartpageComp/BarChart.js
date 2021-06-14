import React, { useRef, useEffect, useState } from "react";
import {
  line,
  select,
  curveCardinal,
  axisBottom,
  scaleLinear,
  schemeGnBu,
  axisRight,
  scaleBand,
  scaleOrdinal,
  axisLeft,
} from "d3";

function BarChart(props) {
  const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75]);
  const svgRef = useRef();

/*   const random = [
    props.studyprogram.stats.Vorlesung,
    props.studyprogram.stats.Übung,
    props.studyprogram.stats.Praktikum,
    props.studyprogram.stats["Vorlesung/Übung"],
    props.studyprogram.stats.Seminar,
    props.studyprogram.stats["Übung/Praktikum"],
  ]; */

  const random = [];
  const test = [];

  for (const [key, value] of Object.entries(props.studyprogram.stats)) {
    console.log(`${value}`);
    random.push(value);
    test.push({[key]:value});
  }

  console.log(props.studyprogram.stats);

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

    //add a colorscale
    const tickLabels= test.map((value, index) => Object.keys(value)[0]);

    const yAxis = axisLeft(yScale).ticks(test.length).tickFormat((value,index) => tickLabels[index] );

    svg.select(".y-axis").style("transform", "translateX(200px) ").call(yAxis);

    svg
      .selectAll(".bar")
      .data(random)
      .join("rect")
      .attr("class", "bar")
      .style("transform", "translateX(350px)")
      .attr("fill", "#3f51b5")
      .attr("height",yScale.bandwidth())
      .transition()
      .attr("x", -150)
      .attr("y", (value,index) => yScale(index))
      .attr("width", (value) => 150 - xScale(value));
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
