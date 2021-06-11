import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import studyprogram from "./data";
import {Button} from "@material-ui/core";
import {useHistory} from "react-router-dom";





export default function SearchBox() {


<<<<<<< HEAD
    const [programObject, setValue] = React.useState(undefined);
    const [stats, setStats] = React.useState();
=======
    const [programObject, setValue] = React.useState();
    const [stats, setStats]   = React.useState();

>>>>>>> 7c444e5bad981bb47af97069ff9cdcbe0301d890


    return (

        <React.Fragment>
        <Autocomplete
            value={programObject}
            onChange={(event, newValue) => {
            setValue(newValue);
            setStats(newValue)
            }}
            id="search-box"
            options={studyprogram}
            getOptionLabel={(option) => option.name}
            style={{ width:500 }}
            renderInput={(params) => <TextField {...params} label="Search for your studyprogram here" variant="outlined"/>}
        />
<<<<<<< HEAD
        {programObject ? <BarChart studyprogram={programObject}/> : <></> }
        
=======


>>>>>>> 7c444e5bad981bb47af97069ff9cdcbe0301d890
        </React.Fragment>


    );
}
