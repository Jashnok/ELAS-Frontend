import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import studyprogram from "./data";
import BarChart from "./BarChart"




export default function SearchBox() {
    

    const [programObject, setValue] = React.useState();
    const [stats, setStats] = React.useState();

    console.log({programObject});

    return (
        
        <React.Fragment>
        <Autocomplete 
            value={programObject} 
            onChange={(event, newValue) => {
                setValue(newValue);
              }}
            id="search-box"
            options={studyprogram}
            getOptionLabel={(option) => option.name}
            style={{ width:500 }}
            renderInput={(params) => <TextField {...params} label="Search for your studyprogram here" variant="outlined"/>} 
        />
        </React.Fragment>
    );
}
