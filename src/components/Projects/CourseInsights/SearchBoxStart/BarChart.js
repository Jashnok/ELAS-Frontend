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
} from "d3";
import studyprogram from "./data";

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

  test.map((value, index)=>console.log(Object.values(value)[0]));

  useEffect(() => {
    const svg = select(svgRef.current);

    const xScale = scaleBand()
      .domain(random.map((value, index) => index)) //random.map((value, index) => index
      .range([0, 600])
      .padding(0.5);

    const yScale = scaleLinear()
                        .domain([0, 60])
                        .range([150, -130]);

    //add a colorscale

    const xAxis = axisBottom(xScale).ticks(random.length);

    svg.select(".x-axis").style("transform", "translateY(300px)").call(xAxis);

    svg
      .selectAll(".bar")
      .data(random)
      .join("rect")
      .attr("class", "bar")
      .style("transform", "scale(1, -1)translateY(-150px)")
      .attr("fill", "#3f51b5")
      .attr("x", (value, index) => xScale(index))
      .attr("y", -150)
      .attr("width", xScale.bandwidth())
      .transition()
      .attr("height", (value) => 150 - yScale(value));
  }, [random]);
  return (
    <React.Fragment>
      <div style={{ paddingTop: 20, paddingLeft: 200 }}>
        <svg ref={svgRef} width={800} height={400}>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
    </React.Fragment>
  );
}
export default BarChart;

//<div style={{paddingTop:20}}>
//<button onClick={() => setData(data.map(value => value + 5))}>
//    Update Data
//</button>
//</div>
//<div style={{paddingTop:20}}>
//<button onClick={() => setData(data.filter(value => value < 35))}>
//    Filter Data
//</button>
//</div>
