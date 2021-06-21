import React, { useState } from "react";
import BarChart from "./StartpageComp/BarChart";
import TextField from "@material-ui/core/TextField";
import { Autocomplete, Alert } from "@material-ui/lab";
import studyprogram from "./data";
import {Button, Box, Grid, makeStyles, Typography, Snackbar, CardContent, Card} from "@material-ui/core";
import "./styles.css"
import SelectPage from "./SelectPage";


const useStyles = makeStyles(theme => ({

    site: {
        paddingLeft: 0,
        paddingRight: 0,
        marginTop: 0,
    },
    card:{
        paddingTop: 25,
        width:"auto",
        display:"block",
        textAlign: 'center',
        alignItems: 'center',
        marginRight: "-moz-initial",
        marginLeft: "-moz-initial",


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
        paddingTop: 10,
        width: 10,
        height: 30,
    },

}))

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
            <Grid container direction="column" justify="center" className={classes.site}>
                <Grid item>
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
                </Grid>


                <Grid xs={12} container direction="column" justify="center"  className={classes.card} >
                    <Grid item>
                    <Card >
                        <CardContent>

                            <Grid item>
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


                                <Grid item style={{paddingTop: 25}}>

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

                    <Grid item style={{paddingTop:25}}>

                        {programObject ? <BarChart studyprogram={programObject}/> :<></>}
                    </Grid>
                            <Grid item style={{ paddingBottom:25, paddingRight:60}} >
                            <Grid container direction="row-reverse" alignItems="flex-start">
                                <Grid item className={classes.button}>
                                <Button
                                    variant="contained"
                                    style={{backgroundColor: "#3f51b5", color: "#fff"}}
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
                        </CardContent>
                    </Card>
                </Grid>


            </Grid>
            </Grid>
                );
    };


    if(nextButton1Clicked) {
        return (<SelectPage studyprogram={programObject} semester={semesterSet}/>);
    }
}
