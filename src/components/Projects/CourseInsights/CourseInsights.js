import React, { useState} from 'react';
import {Button, Box, Grid, makeStyles, Card, Typography, CardContent, createMuiTheme, ThemeProvider} from "@material-ui/core";
import Step1 from "./Step1";

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

    ttb: {
        flexGrow: 1,
    },
    Welc: {
        height:"220px",
        textAlign: 'center',
        alignItems: 'center',
        width: 'auto',
    },
    card: {
        borderRadius: 15,
/*         backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
        boxShadow: "none" */
       },
    AboutUs: {
        paddingTop: 40,
        paddingBottom: 40,
        textAlign: 'center',
        alignItems: 'center',
    },
    leftA: {
        width: "50%",
    },
    b1: {
        fontSize: 36,
    },
    b2: {
        fontSize: 24,
        paddingTop: 20,
    },
    b3: {
        fontSize: 18,
        paddingTop: 20,
    },
    b4: {
        fontSize: 18,
        paddingTop: 8,
        fontWeight: 'normal',
    },
    buttons2: {
        paddingTop: 20,
    },
    sbCon: {
        paddingTop: 25,
    },
    button: {
        paddingLeft: 30,
        paddingTop: 19.5,
    },
    bottom: {
        textAlign: 'left',
    },
    next: {
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    CourseInsight: {
        width: "50%",
        
    }
}))

export default function CourseInsights(props) {

    const[beginButtonClicked, setBeginButtonClicked] = useState(false);

    const handleBeginButtonClicked = () => {
      setBeginButtonClicked(true);
    };

    const classes = useStyles();
    if(!beginButtonClicked) {
        return (
            <ThemeProvider theme={theme}>

                    <Box color="#fff" bgcolor="primary.main" className={classes.Welc}>
                        <Grid container direction="column"alignItems="center" justify="space-evenly" style={{height:"100%"}}>

                            <Grid item>
                                <Typography  style={{fontVariant: "small-caps"}} className={classes.b1}>
                                    Welcome to CourseInsights
                                </Typography>
                            </Grid>
                                   
                            <Grid item>
                                 <Typography style={{fontVariant: "small-caps"}} className={classes.b2}>
                                    We relieve you from painful planing of your study at Uni-Due!
                                </Typography>
                            </Grid>

                            <Grid item>
                                <Typography style={{fontVariant: "small-caps"}} className={classes.b3}>
                                    (Only for studies that are part of "Ingenieurswissenschaften" right now)
                                </Typography>
                            </Grid>

                        

                        </Grid>
                 

                    </Box>



                    <Card classes={{root: classes.card}} style={{marginBottom: 100, marginTop:25, width:"80%", alignSelf:"center"}} variant="outlined">
                        <CardContent style={{alignItems:"center", margin:50, padding:0}}>
                            <Grid container justify="space-around"  >
                                <Grid item className={classes.leftA}style={{width:"60%"}}>
                                <Box >
                                    <Typography color="secondary"
                                                style={{fontVariant: "small-caps"}}
                                                className={classes.b1}>
                                        About CourseInsights:
                                    </Typography>
                                    <Typography style={{
                                        textAlign: "justify",
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                        fontVariant: "small-caps"
                                    }}
                                                className={classes.b4}>
                                        This tool helps you in planning of subjects that you can take in one semester.

                                        You will get an overview of all the courses offered by your study program in that
                                        semester.

                                        Afterwards you can select the courses you like and see their comparison based on
                                        course
                                        rating and time overlapping.
                                    </Typography>
                                    <Typography color="secondary"
                                        style={{
                                        fontVariant: "small-caps",
                                        textAlign: "justify",
                                        paddingLeft: 10
                                    }} className={classes.b4}>
                                        This Tool Offers:
                                    </Typography>
                                    {/*It's a great place for students to view the courses that are offered by University Duisburg-Essen:*/}
                                    <Typography style={{
                                        textAlign: "justify",
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                        fontVariant: "small-caps"
                                    }}>
                                        <li style={{paddingTop: 10}}>
                                            Visual analysis to support decision making on the selection of the courses
                                        </li>
                                        <li style={{paddingTop: 10}}>
                                            Based on course catalog data
                                        </li>
                                        <li style={{paddingTop: 10}}>
                                            Planning courses according to the semesters
                                        </li>
                                        <li style={{paddingTop: 10}}>
                                            Students can select the courses and be able to compare them based on various
                                            aspects
                                            such as
                                            recommendation, understandability and so on which are done by those who have
                                            already
                                            passed the listed
                                            course
                                        </li>
                                    </Typography>

                                </Box>
                                </Grid>
                                <Grid item style={{padding:0, width:"30%"}}>
                                <Grid container direction='column' alignItems="center" style={{height:"100%"}}>
                                        
                                        <Grid item style={{height:"15%"}}>
                                        <Typography 
                                                    color="secondary"
                                                    style={{fontVariant: "small-caps"}}
                                                    className={classes.b1}>
                                            Useful Links:
                                        </Typography>
                                        </Grid>
                                        <Grid item className={classes.buttons2}style={{height:"15%"}}>
                                            <Button variant="outlined" color="secondary"
                                                    href="https://www.uni-due.de/en/university.php"
                                                    style={{backgroundColor: "#fff", color: "#3f51b5", width: 210, height: 30}}>
                                                About University
                                            </Button>
                                        </Grid>

                                        <Grid item className={classes.buttons2}style={{height:"15%"}}>
                                            <Button variant="outlined" color="secondary"
                                                    href="https://www.uni-due.de/en/study_courses.php"
                                                    style={{backgroundColor: "#fff", color: "#3f51b5", width: 210, height: 30}}>
                                                Study Courses
                                            </Button>
                                        </Grid>
                                        
                                        <Grid item className={classes.buttons2}style={{height:"15%"}}>
                                            <Button variant="outlined" color="secondary"
                                                    href="https://www.uni-due.de/en/faculties.php"
                                                    style={{backgroundColor: "#fff", color: "#3f51b5", width: 210, height: 30}}>
                                                Faculties
                                            </Button>
                                        </Grid>

                                        <Grid item className={classes.buttons2}style={{height:"15%"}}>
                                            <Button variant="outlined" color="secondary"
                                                    href="https://www.uni-due.de/international/index_en.shtml"
                                                    style={{backgroundColor: "#fff", color: "#3f51b5", width: 210, height: 30}}>
                                                international Office
                                            </Button>
                                        </Grid>

                                    
                                    
                                    <Grid item className={classes.buttons2}style={{height:"20%"}}>
                                        <Button className={classes.next}
                                                variant="contained"
                                
                                                style={{
                                                    backgroundColor: "#3f51b5",
                                                    color: "#fff",
                                                    height: 50,
                                                    width: 210,
                                                    alignItems: "center",
                                                    fontSize: "1.5rem"
                                                }}
                                                onClick={handleBeginButtonClicked}>
                                            Begin
                                        </Button>
                                    </Grid>
                                </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    </ThemeProvider>
        );
    }
        return (<Step1/>);
}
