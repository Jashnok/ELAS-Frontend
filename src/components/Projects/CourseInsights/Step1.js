import React, {Component} from 'react';
import { BrowserRouter as Router, useHistory} from 'react-router-dom';
import BarChart from './StartpageComp/BarChart';
import TextField from '@material-ui/core/TextField';
import {Autocomplete, Alert} from '@material-ui/lab';
import studyprogram from "./data";
import {Button,Box, Grid, Container, makeStyles} from "@material-ui/core"; 
/* import "./styles.css" */



const useStyles = makeStyles(theme => ({

  site : {
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 0,
  },

  ttb: {
    flexGrow: 1,
  },
  Welc : {
    paddingTop:40,
    paddingBottom:40,
    textAlign: 'center',
    alignItems: 'center',
    width: 'auto',
  },

  b1 : {
    fontSize: 36,
  },
  b2 : {
    fontSize: 18,
    paddingTop:20,
  },
  sbCon : {
    paddingTop: 25,
  },
  button:{
    paddingLeft:30,
    paddingTop:19.5,
  }

}))

function Alert1() {
  return(
    <Alert severity="error">This is an error alert — check it out!</Alert>
  );
}

export default function Step1(){

  
  const [programObject, setValue] = React.useState(undefined);
  const [semesterSet, setSemesterSet] = React.useState(undefined);
  const classes = useStyles();
  const history = useHistory();
  const isLoggedIn = !!sessionStorage.getItem('elas_userLoggedIn');
  const semesters = [
    { semester: 'Wintersemester 2018/2019'},
    { semester: 'Sommersemester 2019'},
    { semester: 'Wintersemester 2019/2020'},
    { semester: 'Sommersemester 2020'},
    { semester: 'Wintersemester 2020/2021'},
    { semester: 'Sommersemester 2021'},
    ];
    console.log(programObject);
    return (

      <Box className={classes.site}>
        <Box color="#fff" bgcolor="#3f51b5" className={classes.Welc}>
          <div className={classes.b1}>
            Step 1: Your studyprogram
          </div>
          <div className={classes.b2}>
           1.1 Select your studyprogram
          </div>
          <div className={classes.b2}>
          1.2 Select your current semester
          </div>
          <div className={classes.b2}>
          1.3 Get an Overview about the amount of subjects!
          </div>
      </Box>
      <Grid container direction="row"style={{paddingTop:25}}>
        <Grid item style={{width:500}} >
      <Grid container direction="column">

          <Grid item>
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
    	    </Grid>

        <Grid item className={classes.ttb}>

        <Grid container direction='row'style={{width:500, paddingTop:25}}>

          <Grid item spacing={10}style={{width:400}}>

          <Autocomplete
            onChange={(event, newValue) => {
            setSemesterSet(newValue);
            }}
            id="semester-selection"
            options={semesters}
            getOptionLabel={(option) => option.semester}
            style={{width:400}}
            renderInput={(params) => <TextField {...params} label= "Select your Semester" variant="outlined"/> }
            />
        
          </Grid>

          <Grid item spacing={10} style={{width:100}} className={classes.button}>  

              <Button id = "next" 
                variant="contained" 
                style={{backgroundColor: "#3f51b5",color:"#fff", width: 70 }}
                onClick={isLoggedIn ? () => history.push('/selectpage') : () => history.push('/login')}>
                next
              </Button>

          </Grid>

        </Grid>
        </Grid>
      </Grid>
      </Grid>

            <Grid item>

            {programObject ? <BarChart studyprogram={programObject}/> : <></> }

            </Grid>


      </Grid>
      </Box>

    );
  
}
//          {programObject ? <BarChart studyprogram={programObject}/> : <></> }