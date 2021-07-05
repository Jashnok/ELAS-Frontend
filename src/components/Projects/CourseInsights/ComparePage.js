import {BrowserRouter as Router} from "react-router-dom";
import {
    AppBar,
    Badge,
    Button,
    Card,
    CardContent, createMuiTheme,
    Tab,
    Typography
} from "@material-ui/core";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
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
import TablePagination from "@material-ui/core/TablePagination";
import DeleteIcon from '@material-ui/icons/Delete';
import {TabContext, TabList, TabPanel} from "@material-ui/lab";
import RestoreIcon from '@material-ui/icons/Restore';
import subjectsrating from './subjectsrating.js';
import NewSelectPage from "./NewSelectPage";
import {ThemeProvider} from "styled-components";

const useStyles = makeStyles({
    step2: {
        color: "#ffffff",
        display: "block",
        justify: "center",
        marginBottom: 10,
        marginTop: 10,
        fontSize: 25,
        textAlign: "center",
        fontVariant: "small-caps",
    },
    courseinsights: {
        color: "#ffffff",
        display: "block",
        justify: "center",
        marginBottom: 10,
        marginTop: 10,
        fontSize: 30,
        textAlign: "center",
        fontVariant: "small-caps",
    },
    selection: {
        color: "#ffffff",
        display: "block",
        justify: "center",
        textAlign: "center",
        marginTop: 10,
        fontSize: 20,
    },
    lilcaptions: {
        color: "#ef6c00",
        display: "block",
        justify: "center",
        textAlign: "justify",
        marginTop: 10,
        marginBottom: 10,
        fontSize: 20,
        fontVariant: "small-caps",
        textDecoration: "underline",
    },
    caption: {
        color: "#ef6c00",
        display: "block",
        justify: "center",
        textAlign: "center",
        marginBottom: 10,
        fontSize: 25,
        fontVariant: "small-caps",
        textDecoration: "underline",
    },
    content: {
        color: "#000",
        display: "block",
        justify: "center",
        textAlign: "justify",
        marginTop: 10,
        fontSize: 20,
        fontVariant: "small-caps",
    },
    box: {
        background: "#3c56ba",
        height: "max-content",
        display: "block",
        alignContent: "center",
        paddingBottom: 20,
    },
    next: {
        width: 10,
        marginRight: 50,
    },
    back: {
        marginTop: 50,
        width: 100,
    },
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#3f51b5",
        },
        secondary: {
            main: "#ef6c00",
        }
    },
});


function createData(name, sws, fairness, support, material, fun, understandability, node_effort, recommendation, overlapping) {
    return {
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

function calculateSWS(markedSubjects) {
    let totalSws = 0;
    for (const [key, value] of Object.entries(markedSubjects)) {
        if(value.sws !== " "){
            totalSws += parseInt(value.sws);
        }
        console.log(value.sws);
    }
    return totalSws;
}

const markedSubjects2 = [{
    "name": "Betriebssysteme",
    "url": "https://campus.uni-due.de/lsf/rds?state=verpublish&status=init&vmfile=no&publishid=309996&moduleCall=webInfo&publishConfFile=webInfo&publishSubDir=veranstaltung",
    "subject_type": "Vorlesung",
    "shorttext": " ",
    "longtext": " ",
    "sws": "3",
    "timetable": [
        {
            "day": "Mi.",
            "time": {"from": "13:00", "to": "15:00"},
            "rhythm": "wöch.",
            "duration": "",
            "room": "",
            "status": " ",
            "comment": " "
        }
    ],
},
    {
        "name": "Mechanics I2",
        "url": "https://campus.uni-due.de/lsf/rds?state=verpublish&status=init&vmfile=no&publishid=316856&moduleCall=webInfo&publishConfFile=webInfo&publishSubDir=veranstaltung",
        "subject_type": "Vorlesung",
        "shorttext": " ",
        "longtext": "Mechanics 2",
        "sws": "2",
        "timetable": [
            {
                "day": "Mi.",
                "time": {"from": "09:00", "to": "10:00"},
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
    },
    {
        "name": "Objektorientierte Programmierung Praktikum",
        "url": "https://campus.uni-due.de/lsf/rds?state=verpublish&status=init&vmfile=no&publishid=309878&moduleCall=webInfo&publishConfFile=webInfo&publishSubDir=veranstaltung",
        "subject_type": "Praktikum",
        "shorttext": "OOPP",
        "longtext": " ",
        "sws": "1",
        "persons": [
            {
                "name": "Petersen, Jörg , Dr.-Ing. Dipl.-Inform.",
                "url": "https://campus.uni-due.de/lsf/rds?state=verpublish&status=init&vmfile=no&moduleCall=webInfo&publishConfFile=webInfoPerson&publishSubDir=personal&keep=y&personal.pid=2874"
            },
            {
                "name": "Wiss. Mitarb., ",
                "url": "https://campus.uni-due.de/lsf/rds?state=verpublish&status=init&vmfile=no&moduleCall=webInfo&publishConfFile=webInfoPerson&publishSubDir=personal&keep=y&personal.pid=10168"
            }
        ],
        "timetable": [
            {
                "day": "Fr.",
                "time": {"from": "13:00", "to": "16:00"},
                "rhythm": "wöch.",
                "duration": {"from": "19.10.2018", "to": "07.12.2018"},
                "room": "",
                "status": " ",
                "comment": " "
            }]
    },
    {
        "name": "Übungen zu 'Wahrscheinlichkeitsrechnung und Statistik für Informatiker'",
        "url": "https://campus.uni-due.de/lsf/rds?state=verpublish&status=init&vmfile=no&publishid=310285&moduleCall=webInfo&publishConfFile=webInfo&publishSubDir=veranstaltung",
        "subject_type": "Übung",
        "shorttext": " ",
        "longtext": " ",
        "sws": "1",
        "persons": [
            {
                "name": "Simon, René , Dr.",
                "url": "https://campus.uni-due.de/lsf/rds?state=verpublish&status=init&vmfile=no&moduleCall=webInfo&publishConfFile=webInfoPerson&publishSubDir=personal&keep=y&personal.pid=50250"
            }
        ],
        "timetable": [
            {
                "day": "Do.",
                "time": {"from": "16:00", "to": "18:00"},
                "rhythm": "wöch.",
                "duration": "",
                "room": "",
                "status": " ",
                "comment": " "
            }
        ]
    },
    {
        "name": "Rechnernetze und Kommunikationssysteme",
        "url": "https://campus.uni-due.de/lsf/rds?state=verpublish&status=init&vmfile=no&publishid=309926&moduleCall=webInfo&publishConfFile=webInfo&publishSubDir=veranstaltung",
        "subject_type": "Vorlesung",
        "shorttext": "B-RSI",
        "longtext": " ",
        "sws": "2",
        "timetable": [
            {
                "day": "Mi.",
                "time": {"from": "12:00", "to": "14:00"},
                "rhythm": "wöch.",
                "duration": "",
                "room": "",
                "status": " ",
                "comment": " "
            }
        ]
    }
]

function checkForOverlapping(subjectA, subjectB) {
            const durationA = subjectA.duration;
            const durationB = subjectB.duration;

            if ((durationB.from < durationA.from && durationB.to < durationA.from) ||
                (durationB.from > durationA.to && durationB.to > durationA.to)) {
                return false;
            }


            if (subjectB.day !== subjectA.day) {
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


function calculateOverlapping(subject, markedSubjects) {
    const data = [];
    for (let subjects of markedSubjects) {
        if (subjects.name !== subject.name) {
            console.log(checkForOverlapping(subject.timetable[0], subjects.timetable[0]))
            for(let timetableA of subject.timetable){
                for(let timetableB of subjects.timetable){
                    if (checkForOverlapping(timetableA, timetableB) === "edge") {
                        data.push({
                            overlappingsubject: subjects.name,
                            overlappingday: timetableA.day,
                            subjectstimefrom: timetableA.time.from,
                            subjectstimeto: timetableA.time.to,
                            overlappingfrom: timetableB.time.from,
                            overlappingto: timetableB.time.to,
                            time: "no time between subjects"
                        })
                    }
                    if (checkForOverlapping(timetableA, timetableB) === "critical") {
                        data.push({
                            overlappingsubject: subjects.name,
                            overlappingday: timetableA.day,
                            subjectstimefrom: timetableA.time.from,
                            subjectstimeto: timetableA.time.to,
                            overlappingfrom: timetableB.time.from,
                            overlappingto: timetableB.time.to,
                            time: "OVERLAPPING"
                        })
                    }
                }
            }

        }
    }
    return data;
}


function createSubjectAndRating(markedSubjects, subjectsrating) {
    const subjectAndRating = [];
    const subjectnames = [];
    for (const [key, value] of Object.entries(markedSubjects)) {
        for (const [key2, value2] of Object.entries(subjectsrating)) {
            if (value.name === value2.name /*&& !subjectnames.includes(value.name)*/) {
                    subjectAndRating.push(createData(value.name, value.sws, value2.fairness, value2.support, value2.material, value2.fun, value2.understandability, value2.node_effort, value2.recommendation, calculateOverlapping(value, markedSubjects)));
                    subjectnames.push(value.name);
            }
        }
        if (!subjectnames.includes(value.name)) {

                subjectAndRating.push(createData(value.name, value.sws, undefined, undefined, undefined, undefined, undefined, undefined, undefined, calculateOverlapping(value, markedSubjects)));

        }

    }
    return subjectAndRating;
}

function Row(props) {
    let {row} = props;
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    console.log(row);
    return (
        <ThemeProvider theme={theme}>
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon/> : row.overlapping.length !== 0 ?
                            <Badge variant="dot" color="secondary"> <KeyboardArrowDownIcon/> </Badge> :
                            <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="center">{row.sws ? row.sws : <CloseIcon color="secondary"/>}</TableCell>
                <TableCell align="center">{row.fairness ? Math.round(row.fairness) : <CloseIcon color="secondary"/>}</TableCell>
                <TableCell align="center">{row.support ? Math.round(row.fairness) : <CloseIcon color="secondary"/>}</TableCell>
                <TableCell align="center">{row.material ? Math.round(row.material) : <CloseIcon color="secondary"/>}</TableCell>
                <TableCell align="center">{row.fun ? Math.round(row.fun) : <CloseIcon color="secondary"/>}</TableCell>
                <TableCell align="center">{row.understandability ? Math.round(row.understandability) :
                    <CloseIcon color="secondary"/>}</TableCell>
                <TableCell align="center">{row.node_effort ? Math.round(row.node_effort) :
                    <CloseIcon color="secondary"/>}</TableCell>
                <TableCell align="center">{row.recommendation ? Math.round(row.recommendation) :
                    <CloseIcon color="secondary"/>}</TableCell>
                <TableCell align="left"><DeleteIcon onClick={() => props.deleteRow(row)}/></TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={11}>
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
                                        <TableCell>Start Time of selected subject</TableCell>
                                        <TableCell>End Time of selected subject</TableCell>
                                        <TableCell>Start Time of overlapping subject</TableCell>
                                        <TableCell>End Time of overlapping subject</TableCell>
                                        <TableCell>Comment</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.overlapping.map((overlappingRow) => (
                                        <TableRow key={overlappingRow.overlapping}>
                                            <TableCell component="th" scope="row">
                                                {overlappingRow.overlappingsubject ? <Typography
                                                    color="secondary"> {overlappingRow.overlappingsubject} </Typography> : <> </>}
                                            </TableCell>
                                            <TableCell>{overlappingRow.overlappingday ? overlappingRow.overlappingday : <> </>}</TableCell>
                                            <TableCell>{overlappingRow.subjectstimefrom ? overlappingRow.subjectstimefrom : <> </>}</TableCell>
                                            <TableCell>{overlappingRow.subjectstimeto ? overlappingRow.subjectstimeto : <> </>}</TableCell>
                                            <TableCell>{overlappingRow.overlappingfrom ? overlappingRow.overlappingfrom : <> </>}</TableCell>
                                            <TableCell>{overlappingRow.overlappingto ? overlappingRow.overlappingto : <> </>}</TableCell>
                                            <TableCell> <Typography
                                                color="secondary">{overlappingRow.time !== "no overlapping" ? overlappingRow.time : <> </>} </Typography></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
        </ThemeProvider>
    );
}

function Row2(props) {
    let {row} = props;
    const classes = useStyles();
    return (
        <ThemeProvider theme={theme}>
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell/>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="center">{row.sws ? row.sws : <CloseIcon color="secondary"/>}</TableCell>
                <TableCell align="center">{row.fairness ? Math.round(row.fairness) : <CloseIcon color="secondary"/>}</TableCell>
                <TableCell align="center">{row.support ? Math.round(row.support): <CloseIcon color="secondary"/>}</TableCell>
                <TableCell align="center">{row.material ? Math.round(row.material) : <CloseIcon color="secondary"/>}</TableCell>
                <TableCell align="center">{row.fun ? Math.round(row.fun) : <CloseIcon color="secondary"/>}</TableCell>
                <TableCell align="center">{row.understandability ? Math.round(row.understandability) :
                    <CloseIcon color="secondary"/>}</TableCell>
                <TableCell align="center">{row.node_effort ? Math.round(row.node_effort) :
                    <CloseIcon color="secondary"/>}</TableCell>
                <TableCell align="center">{row.recommendation ? Math.round(row.recommendation) :
                    <CloseIcon color="secondary"/>}</TableCell>
                <TableCell align="left"><RestoreIcon onClick={() => props.recoverRow(row)}/></TableCell>
            </TableRow>
        </React.Fragment>
        </ThemeProvider>
    );
}


export default function ComparePage(props) {
    const classes = useStyles();
    const [markedSubjects, setMarkedSubjects] = useState(props.selected);
    const [removedMarkedSubjects, setRemovedMarkedSubjects] = useState([]);
    const [backButton2Clicked, setBackButton2Clicked] = useState(false);
    const [removedSubjects, setRemovedSubjects] = useState([]);
    const [heatMapData, setHeatMapData] = useState(generateTimeoverlapChartData(markedSubjects));
    const [subjectAndRating, setSubjectAndRating] = React.useState(createSubjectAndRating(markedSubjects, subjectsrating));
    console.log(heatMapData);
    console.log(subjectAndRating);

    const handleBackButton2Clicked = () => {
        setBackButton2Clicked(true);
    }

    const handleRecover = (row) => {

        const filterTable = (num) => {
            return num.name !== row.name;
        }

        for (let subject of removedMarkedSubjects) {
            if (subject.name === row.name) {
                setMarkedSubjects(markedSubjects.concat(subject));
                setHeatMapData(generateTimeoverlapChartData(markedSubjects.concat(subject)));
            }
        }
        const newRemovedMarkedSubjects = removedMarkedSubjects.filter(filterTable);
        setRemovedMarkedSubjects(newRemovedMarkedSubjects);

        const newRemovedSubjects = removedSubjects.filter(filterTable);
        setRemovedSubjects(newRemovedSubjects);

        const recoveredSubjectAndRating = subjectAndRating.concat(row);
        setSubjectAndRating(recoveredSubjectAndRating);
    }

    const handleDelete = (row) => {

        const filterData = (num) => {
            return num.subjectA.name !== row.name && num.subjectB.name !== row.name;
        }

        const filterTable = (num) => {
            return num.name !== row.name;
        }

        for (let subject of markedSubjects) {
            if (subject.name === row.name) {
                setRemovedMarkedSubjects(removedMarkedSubjects.concat(subject));
            }
        }

        const newMarkedSubjects = markedSubjects.filter(filterTable);
        setMarkedSubjects(newMarkedSubjects);

        let filteredSubjectAndRating = subjectAndRating.filter(filterTable);
        setSubjectAndRating(filteredSubjectAndRating);

        let filteredData = heatMapData.filter(filterData);
        setHeatMapData(filteredData);

        const newRemovedSubjects = removedSubjects.concat(row);
        setRemovedSubjects(newRemovedSubjects);

    }


    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    if (!backButton2Clicked) {
        return (
            <ThemeProvider theme={theme}>
            <Router>
                <Grid container direction="column">
                    <Grid item>
                        <Box className={classes.box}>
                            <Typography className={classes.courseinsights}>CourseInsights</Typography>

                            <Typography className={classes.step2}> Step 3: Compare and decide which subjects you want to
                                take </Typography>
                        </Box>
                    </Grid>
                    <Grid item style={{paddingTop: 25, alignSelf: "center", width:1100}}>
                        <Card style={{alignSelf: "center"}}>
                            <CardContent>
                                <Grid container direction="column">
                                    <Grid container>
                                        <Grid item xs={5} style={{paddingTop: 25}}>
                                            <Card>
                                                <CardContent>
                                                    <Typography className={classes.caption}> Your
                                                        selection:</Typography>
                                                    <Typography className={classes.lilcaptions}> Your
                                                        selected studyprogram: </Typography>
                                                    <Typography
                                                        className={classes.content}>{props.studyprogram.name}</Typography>
                                                    <Typography className={classes.lilcaptions}> Your selected
                                                        semester: </Typography>
                                                    <Typography
                                                        className={classes.content}>{props.semester.semester}</Typography>
                                                    <Typography className={classes.lilcaptions}> Your total
                                                        SWS: </Typography>
                                                    <Typography
                                                        className={classes.content}>{calculateSWS(markedSubjects)} </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                        <Grid item xs={7}
                                              style={{paddingTop: 20, paddingLeft: 100, fontVariant: "small-caps"}}>
                                            <HeatMap data={heatMapData}/>
                                        </Grid>
                                    </Grid>
                                    <Grid item style={{
                                        fontVariant: "small-caps",
                                        alignSelf: "center",
                                        width: 1100,
                                        paddingTop: 20,
                                    }}>
                                        <TabContext value={value}>

                                                <TabList onChange={handleChange} aria-label="simple tabs example" color={"secondary"}>
                                                    <Tab label="marked subjects" value="1"/>
                                                    {removedSubjects.length === 0 ?
                                                        <Tab label="removed subjects" disabled value="2"/> :
                                                        <Tab label="removed subjects" value="2"
                                                             style={{color: '#f50057'}}/>}
                                                </TabList>

                                            <TabPanel value="1">
                                                <TableContainer component={Paper}>
                                                    <Table stickyHeader aria-label="collapsible table" cellSpacing="2">
                                                        <caption> Ratings: 0-100% <CloseIcon color="secondary"/>:No Rating</caption>
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell/>
                                                                <TableCell>Subject name</TableCell>
                                                                <TableCell align="center"
                                                                           style={{width: 20}}>SWS</TableCell>
                                                                <TableCell align="center"
                                                                           style={{width: 20}}>Fairness</TableCell>
                                                                <TableCell align="center"
                                                                           style={{width: 20}}>Support</TableCell>
                                                                <TableCell align="center"
                                                                           style={{width: 20}}>Material</TableCell>
                                                                <TableCell align="center"
                                                                           style={{width: 20}}>Fun</TableCell>
                                                                <TableCell align="center"
                                                                           style={{width: 20}}>Understandability</TableCell>
                                                                <TableCell align="center"
                                                                           style={{width: 20}}>Effort</TableCell>
                                                                <TableCell align="center"
                                                                           style={{width: 20}}>Recommendation</TableCell>
                                                                <TableCell/>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {subjectAndRating.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                                                return (
                                                                    <Row key={row.name} row={row}
                                                                         deleteRow={handleDelete}/>
                                                                );
                                                            })
                                                            }
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                                <TablePagination
                                                    rowsPerPageOptions={[5, 10, 20, 30]}
                                                    component="div"
                                                    count={subjectAndRating.length}
                                                    rowsPerPage={rowsPerPage}
                                                    page={page}
                                                    onChangePage={handleChangePage}
                                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                                />
                                            </TabPanel>
                                            <TabPanel value="2">
                                                <TableContainer component={Paper}>
                                                    <Table stickyHeader aria-label="collapsible table" cellSpacing="2">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell/>
                                                                <TableCell>Subject name</TableCell>
                                                                <TableCell align="center"
                                                                           style={{width: 20}}>SWS</TableCell>
                                                                <TableCell align="center"
                                                                           style={{width: 20}}>Fairness</TableCell>
                                                                <TableCell align="center"
                                                                           style={{width: 20}}>Support</TableCell>
                                                                <TableCell align="center"
                                                                           style={{width: 20}}>Material</TableCell>
                                                                <TableCell align="center"
                                                                           style={{width: 20}}>Fun</TableCell>
                                                                <TableCell align="center"
                                                                           style={{width: 20}}>Understandability</TableCell>
                                                                <TableCell align="center"
                                                                           style={{width: 20}}>Effort</TableCell>
                                                                <TableCell align="center"
                                                                           style={{width: 20}}>Recommendation</TableCell>
                                                                <TableCell/>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {removedSubjects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                                                return (
                                                                    <Row2 key={row.name} row={row}
                                                                          recoverRow={handleRecover}/>
                                                                );
                                                            })
                                                            }
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                                <TablePagination
                                                    rowsPerPageOptions={[5, 10, 20, 30]}
                                                    component="div"
                                                    count={removedSubjects.length}
                                                    rowsPerPage={rowsPerPage}
                                                    page={page}
                                                    onChangePage={handleChangePage}
                                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                                />
                                            </TabPanel>
                                        </TabContext>
                                    </Grid>
                                </Grid>
                                <Grid item className={classes.back}>
                                    <Button variant="outlined"
                                            // style={{backgroundColor: "#3c56ba", color: "#fff", width: 70}}
                                            onClick={handleBackButton2Clicked} color='primary'>
                                        back
                                    </Button>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                {/*<NewSelectPage studyprogram={props.studyprogram} semester={props.semester}/>*/}
            </Router>
            </ThemeProvider>
        );
    }
    // return (<SelectPage studyprogram={props.studyprogram} semester={props.semester}/>);
    return (<NewSelectPage studyprogram={props.studyprogram} semester={props.semester} />);

}