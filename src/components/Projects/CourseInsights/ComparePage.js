import {BrowserRouter as Router, useHistory} from "react-router-dom";
import {Badge, Button, Card, CardContent, Container, Typography} from "@material-ui/core";
import React, {useState} from "react";
import studyprogram from './data';
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import SelectPage from "./SelectPage";
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import CloseIcon from '@material-ui/icons/Close';
import Grid from "@material-ui/core/Grid";
import HeatMap from "./Heatmaps/HeatMap";
import HeatMapGrid from "./Heatmaps/HeatMapGrid";

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
    sws: {
        color:"#f50057",
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
        paddingBottom: 20,
    },
    next:{
        width: 10,
        marginRight: 50,
    },
    back:{
        marginTop: 50,
        width: 100,
    },
});



function createData(name, sws, fairness, support, material, fun, understandability, node_effort, recommendation, overlapping ){
    return{
        name,
        sws,
        fairness,
        support,
        material,
        fun,
        understandability,
        node_effort,
        recommendation,
        overlapping,
    };
}

function calculateSWS(markedSubjects){
    let totalSws=0;
    for (const[key,value] of Object.entries(markedSubjects)){
        totalSws += parseInt(value.sws);
    }
    return totalSws;
}


const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

const subjectsrating =
    [
        {
            "url": "https://www.meinprof.de/uni/kurs/21400",
            "name": "Betriebssysteme",
            "prof": "Dr. Otten, Werner",
            "ratings": [
                {
                    "semester": "WS 04/05",
                    "recommendation": "Ja",
                    "node_effort": 4,
                    "fairness": 4,
                    "support": 5,
                    "material": 4,
                    "understandability": 5,
                    "fun": 3,
                    "interest": 4
                }
            ],
            "fairness": 80.0,
            "support": 100.0,
            "material": 80.0,
            "fun": 60.0,
            "understandability": 100.0,
            "interest": 80.0,
            "node_effort": 80.0,
            "recommendation": 100.0


        }]

const markedSubjects = [{
    "name": "Betriebssysteme",
    "url": "https://campus.uni-due.de/lsf/rds?state=verpublish&status=init&vmfile=no&publishid=309996&moduleCall=webInfo&publishConfFile=webInfo&publishSubDir=veranstaltung",
    "subject_type": "Vorlesung",
    "shorttext": " ",
    "longtext": " ",
    "sws": "3",
    "timetable": [
        {
            "day": "Mo.",
            "time": { "from": "09:00", "to": "12:00" },
            "rhythm": "wöch.",
            "duration": "",
            "room": "",
            "status": " ",
            "comment": " "
        }
    ],
    },
    {"name": "Mechanics I2",
        "url": "https://campus.uni-due.de/lsf/rds?state=verpublish&status=init&vmfile=no&publishid=316856&moduleCall=webInfo&publishConfFile=webInfo&publishSubDir=veranstaltung",
        "subject_type": "Vorlesung",
        "shorttext": " ",
        "longtext": "Mechanics 2",
        "sws": "2",
        "timetable": [
            {
                "day": "Mi.",
                "time": { "from": "08:00", "to": "10:00" },
                "rhythm": "wöch.",
                "duration": "",
                "room": "",
                "status": " ",
                "comment": " "
            }
        ],
  }, {
        "name": "Übung zu \"Berechenbarkeit und Komplexität\"",
        "url": "https://campus.uni-due.de/lsf/rds?state=verpublish&status=init&vmfile=no&publishid=310232&moduleCall=webInfo&publishConfFile=webInfo&publishSubDir=veranstaltung",
        "subject_type": "Übung",
        "shorttext": "B-THI",
        "longtext": " ",
        "sws": "2",
        "timetable": [
            {
                "day": "Mi.",
                "time": {"from": "10:00", "to": "12:00"},
                "rhythm": "wöch.",
                "duration": "",
                "room": "",
                "status": " ",
                "comment": " "
            }]
    }
]

function checkForOverlapping(subjectA, subjectB){
    const durationA = subjectA.duration;
    const durationB = subjectB.duration;

        if ((durationB.from < durationA.from && durationB.to < durationA.from) ||
            (durationB.from > durationA.to && durationB.to > durationA.to)) {
            return false;
        }

    if(subjectB.day !== subjectA.day){
        return false;
    }
    const timeA = subjectA.time;
    const timeB = subjectB.time;

    if ((timeB.from < timeA.from && timeB.to < timeA.from) ||
        (timeB.from > timeA.to && timeB.to > timeA.to)) {
        return false;
    }
    if (timeB.from === timeA.to || timeB.to === timeA.from) {
        return "edge"
    }
    return "critical"
}

function calculateTimeoverlaps(timetableA, timetableB) {
    const overlappings = [];
    for (let entryA of timetableA) {
        for (let entryB of timetableB) {
            let result = checkForOverlapping(entryA, entryB);
            if (result !== false) {
                overlappings.push({
                    severity: result,
                    from: entryB,
                    with: entryA
                })
            }
        }
    }
    return overlappings;
}

function generateTimeoverlapChartData(selectedSubjects) {
    let data = [];
    for (let subjectA of selectedSubjects) {
        for (let subjectB of selectedSubjects) {
            if (subjectA !== subjectB) {
                data.push({
                    subjectA: subjectA,
                    subjectB: subjectB,
                    overlaps: calculateTimeoverlaps(subjectA.timetable, subjectB.timetable)
                })
            } else {
                data.push({
                    subjectA: subjectA,
                    subjectB: subjectB,
                    overlaps: []
                })
            }
        }
    }
    return data;
}


function calculateOverlapping(subject){
    const data = [];
    for (let subjects of markedSubjects){
        if(subjects.name !== subject.name){
            /*if(!checkForOverlapping(subjects.timetable[0], subject.timetable[0])){
                data.push({
                    overlappingsubject: undefined,
                    overlappingday: undefined,
                    overlappingfrom: undefined,
                    overlappingto: undefined,
                    time: "no overlapping"
                })
            }*/
            if(checkForOverlapping(subject.timetable[0], subjects.timetable[0]) === "edge"){
                data.push({
                    overlappingsubject: subjects.name,
                    overlappingday: subject.timetable[0].day,
                    overlappingfrom: subject.timetable[0].time.from,
                    overlappingto: subject.timetable[0].time.to,
                    time: "no time between subjects"
                })
            }
            if(checkForOverlapping(subject.timetable[0], subjects.timetable[0]) === "critical"){
                data.push({
                    overlappingsubject: subjects.name,
                    overlappingday: subject.timetable[0].day,
                    overlappingfrom: subject.timetable[0].time.from,
                    overlappingto: subject.timetable[0].time.to,
                    time: "OVERLAPPING"
                })
            }
        }
    }
    return data;
}




function createSubjectAndRating(markedSubjects, subjectsrating) {
    const subjectAndRating = [];
    for (const [key, value] of Object.entries(markedSubjects)) {
        console.log(value.timetable);
        console.log(value);
        //for (const [key3, value3] of Object.entries(markedSubjects)) {
         //   if (value.name !== value3.name) {
           //     console.log(value3);
                for (const [key2, value2] of Object.entries(subjectsrating)) {
                    console.log(value2);
                    if (value.name === value2.name) {
             //           if (!(checkForOverlapping(markedSubjects[key].timetable[0], markedSubjects[key3].timetable[0]))) {
               //             console.log(checkForOverlapping(markedSubjects[key].timetable[0], markedSubjects[key3].timetable[0]));
                            subjectAndRating.push(createData(value.name, value.sws, value2.fairness, value2.support, value2.material, value2.fun, value2.understandability, value2.node_effort, value2.recommendation, calculateOverlapping(value)));
                        }
                 //       if ((checkForOverlapping(markedSubjects[key].timetable[0], markedSubjects[key3].timetable[0])) === "edge") {
                    //         subjectAndRating.push(createData(value.name, value.sws, value2.fairness, value2.support, value2.material, value2.fun, value2.understandability, value2.node_effort, value2.recommendation, markedSubjects[key3], markedSubjects[key].timetable[0].day, markedSubjects[key].timetable[0].time.from, markedSubjects[key].timetable[0].time.to, "no time between subjects"));
                      //  }
                        //if ((checkForOverlapping(markedSubjects[key].timetable[0], markedSubjects[key3].timetable[0])) === "critical") {
                          //  subjectAndRating.push(createData(value.name, value.sws, value2.fairness, value2.support, value2.material, value2.fun, value2.understandability, value2.node_effort, value2.recommendation, markedSubjects[key3], markedSubjects[key].timetable[0].day, markedSubjects[key].timetable[0].time.from, markedSubjects[key].timetable[0].time.to, "OVERLAPPING"));
                        //}
                  //  }
                    if (value.name !== value2.name) {
                    //    if (!(checkForOverlapping(markedSubjects[key].timetable[0], markedSubjects[key3].timetable[0]))) {
                      //      console.log(checkForOverlapping(markedSubjects[key].timetable[0], markedSubjects[key3].timetable[0]));
                            subjectAndRating.push(createData(value.name, value.sws, undefined, undefined, undefined, undefined, undefined, undefined, undefined, calculateOverlapping(value)));
                        }
                        //if ((checkForOverlapping(markedSubjects[key].timetable[0], markedSubjects[key3].timetable[0])) === "edge") {
                         //   subjectAndRating.push(createData(value.name, value.sws, undefined, undefined, undefined, undefined, undefined, undefined, undefined, markedSubjects[key3], markedSubjects[key].timetable[0].day, markedSubjects[key].timetable[0].time.from, markedSubjects[key].timetable[0].time.to, "no time between subjects"));
                        //}
                        //if ((checkForOverlapping(markedSubjects[key].timetable[0], markedSubjects[key3].timetable[0])) === "critical") {
                        //    subjectAndRating.push(createData(value.name, value.sws, undefined, undefined, undefined, undefined, undefined, undefined, undefined, markedSubjects[key3], markedSubjects[key].timetable[0].day, markedSubjects[key].timetable[0].time.from, markedSubjects[key].timetable[0].time.to, "OVERLAPPING"));
                        //}

                    //}

                }
            }
       //     console.log(markedSubjects[key]);
     //       console.log(value);

        //}

    //}
    return subjectAndRating;
}


function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();


    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : row.overlapping.length !== 0 ? <Badge variant="dot" color="secondary" > <KeyboardArrowDownIcon /> </Badge> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="center">{row.sws ? row.sws : <CloseIcon color="secondary"/>}</TableCell>
                 <TableCell align="center">{row.fairness ? row.fairness : <CloseIcon color="secondary"/>}</TableCell>
                <TableCell align="center">{row.support ? row.fairness : <CloseIcon color="secondary"/>}</TableCell>
                <TableCell align="center">{row.material ? row.material : <CloseIcon color="secondary"/>}</TableCell>
                <TableCell align="center">{row.fun ? row.fun : <CloseIcon color="secondary"/>}</TableCell>
                <TableCell align="center">{row.understandability ? row.understandability : <CloseIcon color="secondary"/>}</TableCell>
                <TableCell align="center">{row.node_effort ? row.node_effort : <CloseIcon color="secondary"/>}</TableCell>
                <TableCell align="center">{row.recommendation ? row.recommendation : <CloseIcon color="secondary"/>}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Overlapping
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Overlapping with</TableCell>
                                        <TableCell>Day</TableCell>
                                        <TableCell>Start Time</TableCell>
                                        <TableCell>End Time</TableCell>
                                        <TableCell>Comment</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.overlapping.map((overlappingRow) => (
                                        <TableRow key={overlappingRow.overlapping}>
                                        <TableCell component="th" scope="row">
                                            {overlappingRow.overlappingsubject ? <Typography color="secondary"> {overlappingRow.overlappingsubject} </Typography> : <> </>}
                                        </TableCell>
                                        <TableCell>{overlappingRow.overlappingday ? overlappingRow.overlappingday : <> </>}</TableCell>
                                        <TableCell>{overlappingRow.overlappingfrom ? overlappingRow.overlappingfrom : <> </>}</TableCell>
                                            <TableCell>{overlappingRow.overlappingto ? overlappingRow.overlappingto : <> </>}</TableCell>
                                            <TableCell> <Typography color="secondary">{overlappingRow.time !== "no overlapping" ? overlappingRow.time : <> </>} </Typography></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function ComparePage(props){
    const classes = useStyles();

    const[backButton2Clicked, setBackButton2Clicked] = useState(false);

    const handleBackButton2Clicked = () => {
        setBackButton2Clicked(true);
    }
    const subjectAndRating = createSubjectAndRating(markedSubjects, subjectsrating);
    console.log(subjectAndRating);

    if(!backButton2Clicked) {
        return (
            <Router>
                <Box className={classes.box}>

                    <Typography className={classes.step2} style={{fontVariant:"small-caps"}}> Step 3: Compare and decide which subjects you want to
                        take </Typography>
                    <Typography className={classes.selection} style={{fontVariant:"small-caps"}}> Your selected
                        studyprogram: {props.studyprogram.name}</Typography>
                    <Typography className={classes.selection} style={{fontVariant:"small-caps"}}> Your selected
                        semester: {props.semester.semester}</Typography>

                </Box>
                <Typography className={classes.sws} style={{fontVariant:"small-caps"}}> Your total SWS: {calculateSWS(markedSubjects)} </Typography>
                <Card>
                    <CardContent>
                <Grid container direction="column">
                    <Grid item style={{paddingTop:20, paddingLeft: 10}}>
                        <HeatMapGrid subjects={subjectAndRating}/>
                    </Grid>

                    <Grid item xs={9} style={{paddingTop:20, fontVariant:"small-caps"}}>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>Subject name</TableCell>
                                <TableCell align="center">SWS</TableCell>
                                <TableCell align="center">Fairness</TableCell>
                                <TableCell align="center">Support</TableCell>
                                <TableCell align="center">Material</TableCell>
                                <TableCell align="center">Fun</TableCell>
                                <TableCell align="center">Understandability</TableCell>
                                <TableCell align="center">Node_Effort</TableCell>
                                <TableCell align="center">Recommendation</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {subjectAndRating.map((row) => (
                                <Row key={row.name} row={row} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                    </Grid>



                </Grid>




                <Grid item className={classes.back}>
                    <Button variant="contained"
                            style={{backgroundColor: "#3c56ba", color: "#fff", width: 70}}
                            onClick={handleBackButton2Clicked}>
                        back
                    </Button>
                </Grid>
                    </CardContent>
                </Card>
            </Router>
        );
    }
    return (<SelectPage studyprogram={props.studyprogram} semester={props.semester}/>);

}