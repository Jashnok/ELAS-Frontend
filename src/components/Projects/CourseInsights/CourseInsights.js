import React, {Component} from 'react';
import { BrowserRouter as Router, useHistory} from 'react-router-dom';
import {Button,Box, Grid, Container, makeStyles} from "@material-ui/core"; 

const useStyles = makeStyles(theme => ({
  
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
  AboutUs : {
    paddingTop:40,
    paddingBottom:40,
    textAlign: 'left',
    alignItems: 'center',
    width: '25%',
  },
  b1 : {
    fontSize: 36,
  },
  b2 : {
    fontSize: 24,
    paddingTop:20,
  },
  b3 : {
    fontSize: 18,
    paddingTop:20,
  },
  buttons2 : {
    paddingTop:20,
  },
  sbCon : {
    paddingTop: 25,
  },
  button:{
    paddingLeft:30,
    paddingTop:19.5,
  },
  bottom: {
    textAlign: 'left',
  },
  bGrid: {
    paddingRight: 100,
    paddingLeft: 100,
  },
}))

export default function CourseInsights(){

  const classes = useStyles();
  const history = useHistory();
  const isLoggedIn = !!sessionStorage.getItem('elas_userLoggedIn');
  
    return (
     <React.Fragment>

        <Box color="#fff" bgcolor="#3f51b5" className={classes.Welc}>
          <div className={classes.b1}>
            Welcome to CourseInsights
          </div>
          <div className={classes.b2}>
          We relieve you from painful planing of your study at Uni-Due!
          </div>
          <div className={classes.b3}>
          (Only for studies that are part of "Ingeneurswissenschaften" right now)
          </div>
          </Box>
      <Grid container direction='row' justify="center"> 
      <Grid item className={classes.bGrid}>
      <Box className={classes.AboutUs} >
      <div className={classes.b1}>   
        About Course Catalog
      </div>
      <div className={classes.b3}>
      It's a great place for students to view the courses that are offered by University Duisburg-Essen:
      </div>
      <div style={{paddingTop:10}}>
      -Visual analysis to support decision making on the selection of the courses
      </div>
      <div>
      -Based on course catalog data
      </div>
      <div>
      -Planning courses according to the semesters
      </div>
      <div>
      -Students can select the courses and be able to compare them based on various aspects such as recommendation,
      </div>
      <div>
       understandability and so on which are done by those who have already passed the listed course
      </div>

      </Box>
      </Grid>
          
      <Grid item className={classes.AboutUs}>

      <Grid container direction='column' justify="center" alignItems="center">
          <Grid item className={classes.b1} >   
            Useful Links
          </Grid>
          <Grid item className={classes.buttons2} > 
        <Button variant="outlined" style={{backgroundColor: "#fff",color:"#000", width: 210, height: 30}}>
              About University
        </Button>
        </Grid>
        <Grid item className={classes.buttons2}> 
        <Button variant="outlined" style={{backgroundColor: "#fff",color:"#000", width: 210, height: 30 }}>
              Study Courses
        </Button>
        </Grid>
        <Grid item className={classes.buttons2} > 
        <Button variant="outlined" style={{backgroundColor: "#fff",color:"#000",width: 210, height: 30 }}>
              Faculties
        </Button>
        </Grid>
        <Grid item  className={classes.buttons2}> 
        <Button variant="outlined" style={{backgroundColor: "#fff",color:"#000", width: 210, height: 30 }}>
              international Office  
        </Button>
        </Grid>
        </Grid>
      </Grid>

      </Grid> 
      <div style={{paddingTop:25}}>
      <Button id = "next" 
          variant="contained" 
          style={{backgroundColor: "#3f51b5",color:"#fff", width: 70 , }}
          onClick={isLoggedIn ? () => history.push('/step1') : () => history.push('/login')}>
          next
      </Button>
      </div>

      </React.Fragment>
    );
  
}
