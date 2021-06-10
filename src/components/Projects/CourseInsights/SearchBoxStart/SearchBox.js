import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import studyprogram from "./data";
import {Button} from "@material-ui/core";
import {useHistory} from "react-router-dom";





export default function SearchBox() {


    const [programObject, setValue] = React.useState();
    const [stats, setStats]   = React.useState();



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


        </React.Fragment>


    );
}
