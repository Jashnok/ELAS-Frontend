import {BrowserRouter as Router, useHistory} from "react-router-dom";
import {Button, Container, Typography} from "@material-ui/core";
import React from "react";
import studyprogram from './data';
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import CompareTable from "./components/CompareTable";

const useStyles = makeStyles({
    step2: {
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
        marginTop: 50,
        width: 100,
        alignItems: "center",
    },
    table:{
        marginTop: 20,
        alignSelf: "center",
        minWidth: "75%"
    }
});

export default function ComparePage(props){
    const classes = useStyles();
    const history = useHistory();
    const isLoggedIn = !!sessionStorage.getItem('elas_userLoggedIn');
    
    let subjects = studyprogram[5].categories[0].subjects;
    let swsSum = 0;
    for (let subject of subjects) {
        let sws = (subject.sws)?subject.sws.replace(/ /g,''):0;
        if (sws === "" || sws === 'undefined') {
            sws = 0;
        } else {
            let swsInt = Number.parseInt(sws);
            swsSum = swsSum + swsInt;
        }
    }
    let course = subjects[0]
    let courseIndex = subjects.indexOf(course);
    console.log("subjects: " , subjects);
    let overlappingCourses = subjects.map((x) => x);
    overlappingCourses.splice(courseIndex, 1);
    console.log("overlapping: " , overlappingCourses);
    console.log("sub: ", subjects);
    return(
        <Router>
            <Box className={classes.box}>
                <Typography className={classes.step2}> Step 3: Compare and decide which subjects you want to take  </Typography>
                <Typography className={classes.selection}> Your selected studyprogram: {studyprogram[5].name}</Typography>
                <Typography className={classes.selection}> Your selected semester: SoSe2019</Typography>
                <Typography className={classes.selection}> SWS: &Sigma; {swsSum}</Typography>
            </Box>
            <CompareTable className={classes.table} overlapCourses={overlappingCourses} course={course}/>
            <Container className={classes.back}>
                <Button variant="contained"
                        style={{backgroundColor: "#3c56ba",color:"#fff", width: 70 }}
                        onClick={isLoggedIn ? () => history.push('/selectpage') : () => history.push('/login')}>
                    back
                </Button>
            </Container>
        </Router>
    );

}