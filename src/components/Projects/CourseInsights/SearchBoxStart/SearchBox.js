import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import studyprogram from "./data";
import * as d3 from 'd3';




export default function SearchBox() {
    

    const [value, setValue] = React.useState(null);
    var [stats, setStats]   = React.useState();

    var height = 500;
    var width = 500;
    var barWidht = 35;
    var barOffset = 5;

    var myChart = d3.select('svg')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('background', '#f4f4f4')
    .selectAll('rect')
    .data(stats)
    .enter()
    .append('rect')
    .style('fill', 'lightgreen')
    .attr('width', barWidht)
    .attr('height', function(d){
        return d;
    })
    .attr('x', function(d, i){
        return i* (barWidht + barOffset);
    })
    .attr('y', function(d){
        return height -d;
    })

    return (
        
        <React.Fragment>
        <Autocomplete 
            value={value} 
            onChange={(event, newValue) => {
            setValue(newValue);
            setStats(newValue.stats)
            }}
            id="search-box"
            options={studyprogram}
            getOptionLabel={(option) => option.name}
            style={{ width:1000 }}
            renderInput={(params) => <TextField {...params} label="Search for your studyprogram here" variant="outlined"/>}
        />
        </React.Fragment>
    );
}
