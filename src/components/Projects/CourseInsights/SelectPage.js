import React, {Component, useState} from 'react';
import {BrowserRouter as Router, useHistory} from "react-router-dom";
import {Button, Container} from "@material-ui/core";
import TreeFilter from "./TreeFilter/TreeFilter";
import studyprogram from './data';
import {Autocomplete} from '@material-ui/lab';
import {makeStyles} from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import {Box, Grid} from "@material-ui/core"; 
import TreeChart from './InteractiveTree/TreeChart';
import SubjectsTable from './NewApproach/SubjectsTable';
import BarChart from './StartpageComp/BarChart';

const useStyles = makeStyles({
    step1: {
        color: "#ffffff",
        display: "block",
        justify: "center",
        marginBottom: 10,
        marginTop: 10,
        fontSize: 25,
        textAlign: "center",
    },
    selection: {
        color:"#ffffff",
        display: "block",
        justify: "center",
        textAlign: "center",
        marginTop: 10,
        marginBottom: 10,
        fontSize: 20,
    },
    box: {
        background: "#3c56ba",
        height: "max-content",
        display: "block",
        alignContent: "center",
    },
    next:{
        width: 10,
        marginRight: 50,
    },
    back:{
        width: 100,
        alignItems: "center",
    },
});

export default function SelectPage(){

    const history = useHistory();
    const [category, setCategory] = React.useState(undefined);
    const isLoggedIn = !!sessionStorage.getItem('elas_userLoggedIn');
    const classes = useStyles();

    console.log(category);
    return (
            <Router>
                <Box className = {classes.box}>

                    <Typography className = {classes.step1}> Step 2: Mark subjects of interest </Typography>
                    <Typography className = {classes.selection}> Your selected studyprogram: {studyprogram[5].name}</Typography>
                    <Typography className = {classes.selection}> Your selected semester: SoSe2019 </Typography>

                </Box>
                                            {/* <TreeFilter/> */}
                                            {/*   <TreeChart />   */}






                         <div style={{marginTop:50}} >
                            <Autocomplete
                                value={category}
                                onChange={(event, newValue) => {
                                    setCategory(newValue);
                                }}
                                id="search-category"
                                options={studyprogram[5].categories}
                                getOptionLabel={(option) => option.name }
                                style={{width:620}}
                                renderInput={(params) => <TextField {...params} label="Select a category here" variant="outlined"/>}/>
                        </div>  
                        <Grid container direction='row' justify="space-between" >      
                                    <Grid item>
                                    <div style={{width:"100%", paddingTop:50}}>
                                    {  category ? <SubjectsTable test={category}/> : <></> }
                                    </div>
                                    </Grid>
                                    <Grid item>
                                    <BarChart studyprogram={studyprogram[5]}/>
                                    </Grid>
                        </Grid>        
                <Container className={classes.next}>
                    <Button variant="contained"
                            style={{backgroundColor: "#3c56ba",color:"#fff", width: 70 }}
                            onClick={isLoggedIn ? () => history.push('/comparepage') : () => history.push('/login')}>
                        next
                    </Button>
                </Container>

                <Container className={classes.back}>

                    <Button variant="contained"
                            style={{backgroundColor: "#3c56ba",color:"#fff", width: 70}}
                            onClick={isLoggedIn ? () => history.push('/courseinsights') : () => history.push('/login')}>
                        back
                    </Button>
                </Container>
            </Router>
    );

}

