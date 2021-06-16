import React, { useState} from 'react';
import BarChart from './StartpageComp/BarChart';
import TextField from '@material-ui/core/TextField';
import {Autocomplete, Alert} from '@material-ui/lab';
import studyprogram from "./data";
import {Button, Box, Grid, makeStyles, Typography, Snackbar} from "@material-ui/core";
import "./styles.css"
import SelectPage from "./SelectPage";


const useStyles = makeStyles(theme => ({

    site: {
        paddingLeft: 0,
        paddingRight: 0,
        marginTop: 0,
    },

    ttb: {
        flexGrow: 1,
    },
    Welc: {
        paddingTop: 20,
        paddingBottom: 20,
        textAlign: 'center',
        alignItems: 'center',
        width: 'auto',
    },

    b1: {
        fontSize: 36,
    },
    b2: {
        fontSize: 18,
        paddingTop: 20,
    },
    sbCon: {
        paddingTop: 25,
    },
    button: {
        paddingLeft: 30,
        paddingTop: 19.5,
        width: 10,
        height: 30,
    },

}))

function Alert1() {
    return (
        <Alert severity="error">This is an error alert — check it out!</Alert>
    );
}

export default function Step1() {

    const [programObject, setValue] = React.useState(undefined);
    const [semesterSet, setSemesterSet] = React.useState(undefined);
    const classes = useStyles();
    const semesters = [
        {semester: 'Wintersemester 2018/2019'},
        {semester: 'Sommersemester 2019'},
        {semester: 'Wintersemester 2019/2020'},
        {semester: 'Sommersemester 2020'},
        {semester: 'Wintersemester 2020/2021'},
        {semester: 'Sommersemester 2021'},
    ];

    const[nextButton1Clicked, setNextButton1Clicked] = useState(false);
    const [noObjectDefined, setNoObjectDefined] = useState(false);
    const [noSemesterDefined, setNoSemesterDefined] = useState(false);

    const handleNextButton1Clicked = () => {
        if(programObject && semesterSet){
            setNextButton1Clicked(true)
        }
        if((!programObject && semesterSet) || (!programObject && !semesterSet)){
            setNoObjectDefined(true);
        }
        if(!semesterSet && programObject){
            setNoSemesterDefined(true);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNoObjectDefined(false);
        setNoSemesterDefined(false);

    };


    if(!nextButton1Clicked ) {
        return (
            <Grid container direction="column" className={classes.site}>
                <Box color="#fff" bgcolor="#3f51b5" className={classes.Welc}>
                    <Typography style={{fontVariant: "small-caps"}} className={classes.b1}>
                        Step 1: Your studyprogram
                    </Typography>
                    <Typography style={{fontVariant: "small-caps"}} className={classes.b2}>
                        1.1 Select your studyprogram
                    </Typography>
                    <Typography style={{fontVariant: "small-caps"}} className={classes.b2}>
                        1.2 Select your current semester
                    </Typography>
                    <Typography style={{fontVariant: "small-caps"}} className={classes.b2}>
                        1.3 Get an Overview about the amount of subjects!
                    </Typography>
                </Box>

                <Grid container direction="row">
                    <Grid container style={{width: 500}} direction="column">
                        <Grid container direction='row' style={{width: 500, paddingTop: 25}}>

                            <Grid item style={{width: 500, paddingTop: 25}} xs={10} sm={12} md={12} lg={12}>
                                <Autocomplete
                                    value={programObject}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                    style={{fontVariant: "small-caps"}}
                                    id="search-box"
                                    options={studyprogram}
                                    getOptionLabel={(option) => option.name}
                                    renderInput={(params) => <TextField {...params}
                                                                        label="Search for your studyprogram here"
                                                                        variant="outlined" color="secondary"/>}
                                />
                            </Grid>
                        </Grid>

                        <Grid item className={classes.ttb}>

                            <Grid container direction='row' style={{width: 500, paddingTop: 25}}>

                                <Grid item spacing={1} style={{width: 300}} xs={8} sm={8} md={8} lg={8}>

                                    <Autocomplete
                                        onChange={(event, newValue) => {
                                            setSemesterSet(newValue);
                                        }}
                                        style={{fontVariant: "small-caps"}}
                                        id="semester-selection"
                                        options={semesters}
                                        getOptionLabel={(option) => option.semester}
                                        renderInput={(params) => <TextField {...params} label="Select your Semester"
                                                                            variant="outlined" color="secondary"/>}
                                    />

                                </Grid>

                                <Grid item spacing={10} style={{width: 100}} className={classes.button}>

                                    <Button
                                        variant="contained"
                                        style={{backgroundColor: "#3f51b5", color: "#fff", width: 70}}
                                        onClick={handleNextButton1Clicked}>
                                        next
                                    </Button>
                                    <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                                              open={noObjectDefined}
                                              autoHideDuration={6000}
                                              onClose={handleClose}>
                                        <Alert variant="filled" onClose={handleClose} severity="error">
                                            You have to select your studyprogram
                                        </Alert>
                                    </Snackbar>
                                    <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                                              open={noSemesterDefined}
                                              autoHideDuration={6000}
                                              onClose={handleClose}>
                                        <Alert variant="filled" onClose={handleClose} severity="error">
                                            You have to select your semester
                                        </Alert>
                                    </Snackbar>
                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item style={{marginTop: 50, marginRight: 150}} xs={12} sm={6} md={6} lg={6}>

                        {programObject ? <BarChart studyprogram={programObject}/> : <></>}
                    </Grid>
                </Grid>

            </Grid>


        );
    }

    if(nextButton1Clicked) {
        return (<SelectPage studyprogram={programObject} semester={semesterSet}/>);
    }


}
