import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Autocomplete} from "@material-ui/lab";
import studyprogram from "./data";
import {Button, Box, Grid, makeStyles, Typography,CardContent, Card, createMuiTheme, ThemeProvider} from "@material-ui/core";
import BarChartApex from "./StartpageComp/BarChartApex";
import NewSelectPage from "./NewSelectPage";
import CourseInsights from "./CourseInsights";

const theme = createMuiTheme({   
    palette: {      
        primary: {         
            main: "#3f51b5"        
        },     
        secondary: {         
            main: "#ef6c00"                 
        }            
    },
});
const useStyles = makeStyles(theme => ({
    step2: {
        color: "#ffffff",
        display: "block",
        justify: "center",

        fontSize: 30,
        textAlign: "center",
        fontVariant: "small-caps",
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
      },
    all: {
        fontVariant:"small-caps",
    },
    site: {
        paddingLeft: 0,
        paddingRight: 0,
        marginTop: 0,
    },
    card: {
        borderRadius: 15,
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
    box: {
        background: "#3c56ba",
        height: "220px",
        display: "block",
        alignContent: "center",
        paddingBottom: 20,
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        height:35,
      },   
    p:{
        marginTop:10,
        width: 64,
      },

}))

export default function Step1(props) {
 
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
    const[sem,setSem] = useState(false);
    const[prog,setProg] = useState(false);

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

     const handleSemesterSet = (newValue) => {
        setSemesterSet(newValue);
        props.changeSem(newValue);
        if(newValue){
            setSem(true);
        }
        else{
            setSem(false);
        }
    } 

    const handleProgSet = (newValue) => {
        setValue(newValue);
        props.changeProgram(newValue);
        if(newValue){
            setProg(true);
        }
        else{
            setProg(false);
        } 
    }

    if(!nextButton1Clicked && !backButton1Clicked ) {
        return (
            <ThemeProvider theme={theme}>
          <Grid container direction="column" justify="flex-start" className={classes.all}>
            {/* <Grid item>
                <Box color="#fff" bgcolor="#3f51b5" className={classes.box} style={{fontVariant:"small-caps"}}>
                    <Grid container direction="column"alignItems="center" justify="space-evenly" style={{height:"100%"}}>
                      <Grid item>
                         <Typography className={classes.courseinsights}>CourseInsights</Typography>
                      </Grid>

                </Grid>
                </Box>
                </Grid> */}

                <Grid item style={{width:"80%",alignSelf:"center"}}>

                            <Grid container direction="column" alignItems="center" justify="center" style={{margin:15}}>
                              <Grid item style={{width:"75%", marginBottom:25}}>
                                <Autocomplete
                                    value={programObject}
                                    onChange={(event, newValue) => {
                                        handleProgSet(newValue);
                                    }}
                                    style={{fontVariant: "small-caps", width: "100%"}}
                                    id="search-box"
                                    options={props.studyprograms}
                                    getOptionLabel={(option) => option.name}
                                    renderInput={(params) => <TextField {...params}
                                                                        label="Search for your studyprogram here"
                                                                        variant="outlined" color="secondary"/>}
                                />
                                </Grid>
  

                                <Grid item style={{width:"75%", marginBottom:25}}>
                                    <Autocomplete
                                        onChange={(event, newValue) => {
                                            handleSemesterSet(newValue);
                                        }}
                                        style={{fontVariant: "small-caps", width: "100%"}}
                                        id="semester-selection"
                                        options={semesters}
                                        getOptionLabel={(option) => option.semester}
                                        renderInput={(params) => <TextField {...params} label="Select your Semester"
                                                                            variant="outlined" color="secondary"/>}
                                    />

                                </Grid>
                           <Grid item>
                            <BarChartApex studyprogram={programObject}/>
                            </Grid>
                                                
                        </Grid>
                    
                  </Grid>
                  <Grid item style={{width:"100%",marginTop:20}}>
                        <Grid container spacing={2}>
                            <Grid item>
                                
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={props.handleBack()}
                                    className={classes.button}
                                    >
                                    Back
                                </Button>
                                </Grid>
                                <Grid item>
                                {prog===true && sem===true ?
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={props.handleNext()}
                                    className={classes.button}
                                >
                                Next
                                </Button> :
                                <Button
                                disabled
                                variant="contained"
                                color="primary"
                                onClick={props.handleNext()}
                                className={classes.button}
                            >
                            Next
                            </Button>}
                            </Grid>
                        </Grid>
                  </Grid>
                </Grid>     
                </ThemeProvider>                   
                );

    }
    if (nextButton1Clicked && !backButton1Clicked) {
        return (<NewSelectPage studyprogram={programObject} semester={semesterSet}/>);
    }
    if(backButton1Clicked) {
        return (<CourseInsights/>)
    }
}
