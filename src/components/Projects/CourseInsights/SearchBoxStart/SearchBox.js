import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import studyprogram from "./data";





export default function SearchBox() {
    

    const [value, setValue] = React.useState(null);
    var [stats, setStats]   = React.useState();

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
