import React, {Component, useState} from 'react';
import {BrowserRouter as Router, useHistory} from "react-router-dom";
import {Button, Container} from "@material-ui/core";
import TreeFilter from "./TreeFilter/TreeFilter";
import StudyprogramTree from "./StudyprogramTree/StudyprogramTree";
import studyprogram from './data';
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import InteractiveTree from "./InteractiveTree/InteractiveTree";
import ComparePage from "./ComparePage";
import Step1 from "./Step1";


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
        height:30,
        marginRight: 50,
    },
    back:{
        width: 10,
        height:30,
        alignItems: "center",
    },
    treeborder: {
        width: 450,
        height: "max-content",
        marginTop: 5,
    }
});

export default function SelectPage(props){
    const classes = useStyles();

    const [nextButton2Clicked, setNextButton2Clicked] = useState(false);
    const[backButton1Clicked, setBackButton1Clicked] = useState(false);

    const handleNextButton2Clicked = () =>{
        setNextButton2Clicked(true);
    }

    const handleBackButton1Clicked = () => {
        setBackButton1Clicked(true);
    }

    if (!nextButton2Clicked && !backButton1Clicked) {
        return (
            <Grid container direction="column">
                <Box className={classes.box}>

                    <Typography className={classes.step1}> Step 2: Mark subjects of interest </Typography>
                    <Typography className={classes.selection}> Your selected
                        studyprogram: {props.studyprogram.name}</Typography>
                    <Typography className={classes.selection}> Your selected semester:  {props.semester.semester} </Typography>

                </Box>
                <Grid container direction="row">

                    <Grid item>

                        <TreeFilter/>
                    </Grid>
                    <Grid>

                        <InteractiveTree/>

                    </Grid>
                </Grid>

                <Button className={classes.next} variant="contained"
                        style={{backgroundColor: "#3c56ba", color: "#fff", width: 70}}
                        onClick={handleNextButton2Clicked}>
                    next
                </Button>


                <Button className={classes.back} variant="contained"
                        style={{backgroundColor: "#3c56ba", color: "#fff", width: 70}}
                        onClick={handleBackButton1Clicked}>
                    back
                </Button>


            </Grid>
        );
    }
    if(nextButton2Clicked && !backButton1Clicked) {
        return (<ComparePage studyprogram={props.studyprogram} semester={props.semester}/>);
    }
    if(backButton1Clicked) {
        return (<Step1/>)
    }
}

