import React, {Component} from 'react';
import {BrowserRouter as Router, useHistory} from "react-router-dom";
import {Button, Container} from "@material-ui/core";
import TreeFilter from "./TreeFilter/TreeFilter";
import StudyprogramTree from "./StudyprogramTree/StudyprogramTree";
import studyprogram from "./SearchBoxStart/data";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";


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
    const isLoggedIn = !!sessionStorage.getItem('elas_userLoggedIn');
    const classes = useStyles();

    return (
            <Router>
                <Box className = {classes.box}>

                    <Typography className = {classes.step1}> Step 2: Mark subjects of interest </Typography>
                    <Typography className = {classes.selection}> Your selected studyprogram: {studyprogram[5].name}</Typography>
                    <Typography className = {classes.selection}> Your selected semester: SoSe2019 </Typography>

                </Box>
                <TreeFilter/>
                <StudyprogramTree studyprogram = {studyprogram[5]} semester = "SoSe2019"/>
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

