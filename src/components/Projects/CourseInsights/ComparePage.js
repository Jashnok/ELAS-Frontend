import {
    Badge,
    Button,
    Card,
    CardContent, createMuiTheme,
    Tab, Tabs, Tooltip,
    Typography, ThemeProvider
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
import {TabContext, TabPanel} from "@material-ui/lab";
import RestoreIcon from '@material-ui/icons/Restore';
import subjectsrating from './subjectsrating.js';
import NewSelectPage from "./NewSelectPage";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#3f51b5",
        },
        secondary: {
            main: "#ef6c00",
            light: '#f50057',
        },
    },
});

const useStyles = makeStyles({
    step3: {
        color: "#ffffff",
        display: "block",
        justify: "center",
        fontSize: 30,
        textAlign: "center",
        fontVariant: "small-caps",
    },
    courseinsights: {
        color: "#ffffff",
        display: "block",
        justify: "center",
        fontSize: 36,
        textAlign: "center",
        fontVariant: "small-caps",
    },
    selection: {
        color: "#ffffff",
        display: "block",
        justify: "center",
        textAlign: "center",
        marginTop: 10,
        fontSize: 15,
    },
    all: {
        fontVariant: "small-caps",
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
        fontWeight: 'bold',
    },
    caption: {
        color: "#ef6c00",
        display: "block",
        justify: "center",
        textAlign: "center",
        marginBottom: 10,
        fontSize: 25,
        fontVariant: "small-caps",
        fontWeight: 'bold',
    },
    content: {
        color: "#000",
        display: "block",
        justify: "center",
        textAlign: "justify",
        marginTop: 10,
        fontSize: 18,
        fontVariant: "small-caps",
    },
    box: {
        background: "#3c56ba",
        height: "220px",
        display: "block",
        alignContent: "center",
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
    alldateswidth: {
        fontVariant: 'small-caps',
        fontSize: 14,
    },
    closeicons: {
        color: '#f50057'
    }
});

/* Create data for the table */
function createData(name, sws, fairness, support, material, fun, understandability, node_effort, recommendation, overlapping, timetable, url) {
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
        timetable,
        url,
    };
}

/* calculate the total number of sws of the selected subjects*/
function calculateSWS(markedSubjects) {
    let totalSws = 0;
    for (const [key, value] of Object.entries(markedSubjects)) {
        if (value.sws !== " ") {
            totalSws += parseInt(value.sws);
        }
    }
    return totalSws;
}

/**
 * Checks whether two entries from timetables are overlapping
 * @param subjectA entry from a timetable. Has to have attributes day, time and duration
 * @param subjectB entry from another timetable. Has to have same attributes.
 * @returns {*} - False:  if the do not overlap.
 *              - edge: if the just overlap in the same minute. E.g startA = 10.00 and endB = 10.00
 *              - critical: if the overlap in time.
 */
function checkForOverlapping(subjectA, subjectB) {
    const durationA = subjectA.duration;
    const durationB = subjectB.duration;
    if ((durationB.to > durationA.to) && (durationB.from > durationA.to)) {
        return false;
    }

    if ((durationB.to < durationA.to) && (durationB.to < durationA.from)) {
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

/**
 * Calculate overlapping of time-entries for different timetables
 * @param timetableA first timetable
 * @param timetableB second timetable
 * @returns {Array} A list of pairs of entries with the type of overlap
 */
function calculateTimeoverlaps(timetableA, timetableB) {
    let overlappings = [];
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

/**
 * Generates data for the timeoverlap chart by comparing differences in timetables of subjects
 * @param selectedSubjects A list of subjects
 * @returns {Array} A list of all combinations of subjects and their overlaps (can be empty).
 */
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

/**
 * Geneartes data for the timeoverlap table for a selected subject
 * @param subject the subject for which we need the timeoverlap data
 * @param markedSubjects the list of all selected subjects
 * @returns {Array} A list of the overlappings of the seletcted subject and the comment whether there is an overlapping or no time */
function calculateOverlapping(subject, markedSubjects) {
    const data = [];
    for (let subjects of markedSubjects) {
        if (subjects.name !== subject.name) {
            for (let timetableA of subject.timetable) {
                for (let timetableB of subjects.timetable) {
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

/** Generates the data for the whole table
 * @param markedSubjects list of the selected subjects
 * @param subjectsrating list of all ratings
 * @returns {Array} with all subjects, their ratings and their overlappings
 * */
function createSubjectAndRating(markedSubjects, subjectsrating) {
    const subjectAndRating = [];
    const subjectnames = [];
    for (const [key, value] of Object.entries(markedSubjects)) {
        for (const [key2, value2] of Object.entries(subjectsrating)) {
            if (value.name === value2.name && !subjectnames.includes(value.name)) {
                subjectAndRating.push(createData(value.name, value.sws, value2.fairness, value2.support, value2.material, value2.fun, value2.understandability, value2.node_effort, value2.recommendation, calculateOverlapping(value, markedSubjects)));
                subjectnames.push(value.name);
            }
        }
        if (!subjectnames.includes(value.name)) {
            subjectAndRating.push(createData(value.name, value.sws, undefined, undefined, undefined, undefined, undefined, undefined, undefined, calculateOverlapping(value, markedSubjects), value.timetable, value.url));
        }
    }
    return subjectAndRating;
}

/** Generates data for the tooltip
 * @param timetable timetable of the subject
 * @returns Typography components for showing the data of the subject*/
function createAllDates(timetable) {
    if (timetable) {
        return (<Typography>
            <Typography style={{fontWeight: 'bold', fontSize: 18}}> All Dates:</Typography>
            {timetable.map((times) => {
                return (
                    <Grid container direction='column'>
                        <Typography> Day: {times.day} </Typography>
                        <Typography> From: {times.time.from} </Typography>
                        <Typography> To: {times.time.to}</Typography>
                        <Typography> rhythm: {times.rhythm}</Typography>
                        <Typography style={{fontWeight: 'bold'}}> Duration: </Typography>
                        <Typography> {(Object.keys(times.duration).indexOf('from') < 0) ? times.duration : 'from ' + times.duration.from + ' to ' + times.duration.to}</Typography>
                        <br/>
                    </Grid>
                );
            })
            }
        </Typography>);
    } else {
        return <Typography style={{fontWeight: 'bold', fontSize: 18}}> All Dates:</Typography>
    }
}

/* Tooltip to show all dates of a subject */
function AllDates(props) {
    const classes = useStyles();
    return (
        <Grid container='column'>
            <Tooltip classes={{tooltip: classes.alldateswidth}} title={createAllDates(props.timetable)} arrow>
                <Button variant='outlined' color='primary' style={{maxWidth: 20}}>
                    All dates
                </Button>
            </Tooltip>
            {/*<Button variant='outlined' color='primary' href={props.url} style={{maxWidth: 20}}>
                LSF
            </Button>*/}
        </Grid>
    );
}

/* Displays all selected subjects and their overlappings*/
function Row(props) {
    let {row} = props;
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon/> : row.overlapping.length !== 0 ?
                            <Badge variant="dot" color='secondary'> <KeyboardArrowDownIcon/> </Badge> :
                            <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="center">{row.sws ? row.sws : <CloseIcon color="secondary"/>}</TableCell>
                <TableCell align="center">{row.fairness ? Math.round(row.fairness) :
                    <CloseIcon className={classes.closeicons}/>}</TableCell>
                <TableCell align="center">{row.support ? Math.round(row.fairness) :
                    <CloseIcon className={classes.closeicons}/>}</TableCell>
                <TableCell align="center">{row.material ? Math.round(row.material) :
                    <CloseIcon className={classes.closeicons}/>}</TableCell>
                <TableCell align="center">{row.fun ? Math.round(row.fun) :
                    <CloseIcon className={classes.closeicons}/>}</TableCell>
                <TableCell align="center">{row.understandability ? Math.round(row.understandability) :
                    <CloseIcon className={classes.closeicons}/>}</TableCell>
                <TableCell align="center">{row.node_effort ? Math.round(row.node_effort) :
                    <CloseIcon className={classes.closeicons}/>}</TableCell>
                <TableCell align="center">{row.recommendation ? Math.round(row.recommendation) :
                    <CloseIcon className={classes.closeicons}/>}</TableCell>
                <TableCell> <AllDates timetable={row.timetable} url={row.url}/> </TableCell>
                <TableCell align="left"><DeleteIcon onClick={() => props.deleteRow(row)}/></TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={12}>
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
    );
}

/*Displays all subjects that were removed from the list of the selected subjects */
function Row2(props) {
    let {row} = props;
    const classes = useStyles();
    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="center">{row.sws ? row.sws : <CloseIcon color="secondary"/>}</TableCell>
                <TableCell align="center">{row.fairness ? Math.round(row.fairness) :
                    <CloseIcon className={classes.closeicons}/>}</TableCell>
                <TableCell align="center">{row.support ? Math.round(row.support) :
                    <CloseIcon className={classes.closeicons}/>}</TableCell>
                <TableCell align="center">{row.material ? Math.round(row.material) :
                    <CloseIcon className={classes.closeicons}/>}</TableCell>
                <TableCell align="center">{row.fun ? Math.round(row.fun) :
                    <CloseIcon className={classes.closeicons}/>}</TableCell>
                <TableCell align="center">{row.understandability ? Math.round(row.understandability) :
                    <CloseIcon className={classes.closeicons}/>}</TableCell>
                <TableCell align="center">{row.node_effort ? Math.round(row.node_effort) :
                    <CloseIcon className={classes.closeicons}/>}</TableCell>
                <TableCell align="center">{row.recommendation ? Math.round(row.recommendation) :
                    <CloseIcon className={classes.closeicons}/>}</TableCell>
                <TableCell> <AllDates timetable={row.timetable} url={row.url}/> </TableCell>
                <TableCell align="left"><RestoreIcon onClick={() => props.recoverRow(row)}/></TableCell>
            </TableRow>
            <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={13}/>
        </React.Fragment>
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

    const handleBackButton2Clicked = () => {
        setBackButton2Clicked(true);
    }

    /* Adds an already removed subject to the list of selected ones and updates the visualization  */
    const handleRecover = (row) => {

        const filterTable = (num) => {
            return num.name !== row.name;
        }

        for (let subject of removedMarkedSubjects) {
            if (subject.name === row.name) {
                setMarkedSubjects(markedSubjects.concat(subject));
                setHeatMapData(generateTimeoverlapChartData(markedSubjects.concat(subject)));
                setSubjectAndRating(createSubjectAndRating(markedSubjects.concat(subject), subjectsrating));
            }
        }
        const newRemovedMarkedSubjects = removedMarkedSubjects.filter(filterTable);
        setRemovedMarkedSubjects(newRemovedMarkedSubjects);

        const newRemovedSubjects = removedSubjects.filter(filterTable);
        setRemovedSubjects(newRemovedSubjects);
    }

    /*Removes the selected subject from the list and updates the visualization */
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

        let filteredSubjectAndRating = createSubjectAndRating(newMarkedSubjects, subjectsrating);
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
            <Grid container direction="column" className={classes.all}>
                <Grid item>
                    <Box className={classes.box}>
                        <Grid container direction='column' alignItems='center' justify='space-evenly'
                              style={{height: '100%'}}>
                            <Grid item>
                                <Typography className={classes.courseinsights}>CourseInsights</Typography>
                            </Grid>
                            <Grid item>
                                <Typography className={classes.step3}> Step 3: Compare and decide which subjects you
                                    want to take </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Grid item style={{paddingTop: 25, alignSelf: "center", width: "80%"}}>
                    <Card style={{alignSelf: "center"}}>
                        <CardContent style={{margin: 25}}>
                            <Grid container direction="column">
                                <Grid container alignItems="center" justify="space-evenly">
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
                                    <Grid item style={{width: "25%", height: "25%"}}
                                    >
                                        <HeatMap data={heatMapData}/>
                                    </Grid>
                                </Grid>
                                <Grid item style={{
                                    fontVariant: "small-caps",
                                    alignSelf: "center",
                                    width: "90%",
                                    paddingTop: 50,
                                }}>
                                    <TabContext value={value}>
                                        <ThemeProvider theme={theme}>
                                            <Tabs value={value} onChange={handleChange} indicatorColor='primary'>
                                                <Tab label="marked subjects" value="1"/>
                                                {removedSubjects.length === 0 ?
                                                    <Tab label="removed subjects" disabled value="2"/> :
                                                    <Tab label="removed subjects" value="2"
                                                         style={{color: '#f50057'}}/>}
                                            </Tabs>
                                        </ThemeProvider>
                                        {/* Table of all selected subjects*/}
                                        <TabPanel value="1">
                                            <TableContainer component={Paper}>
                                                <Table stickyHeader aria-label="collapsible table" cellSpacing="2">
                                                    <caption style={{paddingTop: 10}}> Ratings: 0-100% <CloseIcon
                                                        className={classes.closeicons} style={{paddingTop: 10}}/>:No
                                                        Rating
                                                    </caption>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell style={{width: 20}}/>
                                                            <TableCell style={{width: 20}}>Subject name</TableCell>
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
                                                            <TableCell align="center"
                                                                       style={{width: 20}}>Info</TableCell>
                                                            <TableCell style={{width: 20}}/>
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
                                        {/* Table of all removed subjects*/}
                                        <TabPanel value="2">
                                            <TableContainer component={Paper}>
                                                <Table stickyHeader aria-label="collapsible table" cellSpacing="1">
                                                    <TableHead>
                                                        <TableRow>
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
                                                            <TableCell align="center"
                                                                       style={{width: 20}}>Info</TableCell>
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
                                        onClick={handleBackButton2Clicked} color='primary'>
                                    Back
                                </Button>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        )
    }
    return (<NewSelectPage studyprogram={props.studyprogram} semester={props.semester}/>);
}