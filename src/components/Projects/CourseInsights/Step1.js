import React, { useState } from "react";
import BarChart from "./StartpageComp/BarChart";
import TextField from "@material-ui/core/TextField";
import { Autocomplete, Alert } from "@material-ui/lab";
import studyprogram from "./data";
import {Button, Box, Grid, makeStyles, Typography, Snackbar, CardContent, Card} from "@material-ui/core";
import "./styles.css"
import SelectPage from "./SelectPage";
import BarChartApex from "./StartpageComp/BarChartApex";
import NewSelectPage from "./NewSelectPage";
import CourseInsights from "./CourseInsights";


const useStyles = makeStyles(theme => ({
    step2: {
        color: "#ffffff",
        display: "block",
        justify: "center",

        fontSize: 30,
        textAlign: "center",
        fontVariant: "small-caps",
    },

    site: {
        paddingLeft: 0,
        paddingRight: 0,
        marginTop: 0,
    },
    card:{
        paddingTop: 25,
        width:"75%",
        alignSelf: "center",
        display:"block",
        textAlign: 'center',
        alignItems: 'center',
        marginRight: "-moz-initial",
        marginLeft: "-moz-initial",


    },
    courseinsights: {
        color: "#ffffff",
        display: "block",
        justify: "center",
        fontSize: 36,
        textAlign: "center",
        fontVariant: "small-caps",
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
        fontSize: 20,
        display: "block",
        justify: "center",
        textAlign: "center",
    },
    sbCon: {
        paddingTop: 25,
    },
    button: {
        paddingTop: 10,
        width: 10,
        height: 30,
    },
    box: {
        background: "#3c56ba",
        height: "220px",
        display: "block",
        alignContent: "center",
        paddingBottom: 20,
    },
    buttons:{
      marginTop:10,
      width: 50,
      background: "#f50057",
      color:"#ffffff",
      fontVariant:"small-caps"
    },

}))

export default function Step1() {
 
    const [programObject, setValue] = React.useState(undefined);
    const [semesterSet, setSemesterSet] = React.useState(undefined);
    const [backButton1Clicked, setBackButton1Clicked] = useState(false);
    const classes = useStyles();
    const semesters = [
        {semester: 'WiSe 2018/19'},
        {semester: 'SoSe 2019'},
        /*{semester: 'Wintersemester 2019/2020'},
        {semester: 'Sommersemester 2020'},
        {semester: 'Wintersemester 2020/2021'},
        {semester: 'Sommersemester 2021'},*/
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
    const handleBackButton1Clicked = () => {
        setBackButton1Clicked(true);
    }


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNoObjectDefined(false);
        setNoSemesterDefined(false);

    };


    if(!nextButton1Clicked && !backButton1Clicked ) {
        return (
          <Grid container direction="column" justify="flex-start">
            <Grid item>
                <Box color="#fff" bgcolor="#3f51b5" className={classes.box} style={{fontVariant:"small-caps"}}>
                    <Grid container direction="column"alignItems="center" justify="space-evenly" style={{height:"100%"}}>
                      <Grid item>
                         <Typography className={classes.courseinsights}>CourseInsights</Typography>
                      </Grid>
                   
                      <Grid item>
                        <Typography className={classes.step2}>
                        Step 1: Your studyprogram
                    </Typography>
                        </Grid>
                        <Grid item>
                         <Typography className={classes.b2}>
                        1.1 Select your studyprogram
                    </Typography>
                      </Grid>
                      <Grid item>
                        <Typography className={classes.b2}>
                        1.2 Select your current semester
                    </Typography>
                        </Grid>

                </Grid>
                </Box>
                </Grid>

                <Grid item style={{width:"75%", marginTop:25, alignSelf:"center"}}>
                    <Card  variant="outlined">
                        <CardContent>
                            <Grid container direction="column" alignItems="center" justify="center" style={{margin:50}}>
                              <Grid item style={{width:"75%", marginBottom:25}}>
                                <Autocomplete
                                    value={programObject}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                    style={{fontVariant: "small-caps", width: "100%"}}
                                    id="search-box"

                                    options={studyprogram}
                                    getOptionLabel={(option) => option.name}
                                    renderInput={(params) => <TextField {...params}
                                                                        label="Search for your studyprogram here"
                                                                        variant="outlined" color="secondary"/>}
                                />
                                </Grid>
  

                                <Grid item style={{width:"75%", marginBottom:25}}>
                                    <Autocomplete
                                        onChange={(event, newValue) => {
                                            setSemesterSet(newValue);
                                        }}
                                        style={{fontVariant: "small-caps", width: "100%"}}
                                        id="semester-selection"
                                        options={semesters}
                                        getOptionLabel={(option) => option.semester}
                                        renderInput={(params) => <TextField {...params} label="Select your Semester"
                                                                            variant="outlined" color="secondary"/>}
                                    />

                                </Grid>


                           {/*{programObject ? <BarChart studyprogram={programObject}/> :<></>}*/}

                           <Grid item>
                            <BarChartApex studyprogram={programObject}/>
                            </Grid>
                            <Grid item style={{marginTop:25, width:"100%"}}>
                                <Grid container justify="space-evenly">
                                    <Button
                                    variant="contained"
                                    className={classes.buttons}
                                    onClick={handleBackButton1Clicked}>
                                    back
                                  </Button>

                                  <Button
                                    variant="contained"
                                    className={classes.buttons}
                                    onClick={handleNextButton1Clicked}>
                                    next
                                </Button>
                                </Grid>
                                
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
                        </CardContent>
                    </Card>
                  </Grid>
                </Grid>                        
                );
    };
    if (nextButton1Clicked && !backButton1Clicked) {
        return (<NewSelectPage studyprogram={programObject} semester={semesterSet}/>);
    }
    if(backButton1Clicked) {
        return (<CourseInsights/>)
    }
}
