import React, {useRef, useState} from 'react';
import {Button, Card, makeStyles, Typography} from "@material-ui/core";
import {BrowserRouter as Router} from "react-router-dom";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import { DataGrid } from '@material-ui/data-grid';
import ApexColumnChart from "./ApexColumnChart";
import {Delete} from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import {setsEqual} from "chart.js/helpers";
import ComparePage from "./ComparePage";
import Step1 from "./Step1";

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
        color: "#f50057",
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
        color: "#f50057",
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
        color: '#3c56ba'
    },
    back: {
        marginTop: 50,
        width: 100,
        color: '#3c56ba'
    },

});


const columns = [
    {field: 'subject', headerName: 'Subject', width: 300},
    {field: 'type', headerName: 'Subject Type', width: 200},
];

export default function NewSelectPage(props) {
    const [nextButton2Clicked, setNextButton2Clicked] = useState(false);
    const [backButton1Clicked, setBackButton1Clicked] = useState(false);

    const handleNextButton2Clicked = () => {
        setNextButton2Clicked(true);
    }

    const handleBackButton1Clicked = () => {
        setBackButton1Clicked(true);
    }

    const classes = useStyles();
    const [selectedSubjects, setSelectedSubjects] = React.useState([]);
    const [selectAll, setSelectAll] = useState(false);
    console.log(selectedSubjects);

    console.log(props.studyprogram);

    const generateSubjects = (studyprogram) => {
        const subjectslist = [];
        /*for(let subject of studyprogram.subjects){
            if(subject.semesters.includes(props.semester)){
                subjectslist.push(subject);
            }
        }*/
        for (let subject of studyprogram.categories) {
            console.log(subject);
            for (let sub of subject.subjects) {
                console.log(sub);
                console.log(props.semester.semester);
                for (let sem of sub.semesters) {
                    console.log(sem);
                    if (sem === props.semester.semester) {
                        subjectslist.push(sub);
                        console.log(subjectslist);
                    }


                }
            }
            for (let cat of subject.categories) {
                console.log(cat);
                for (let sub2 of cat.subjects) {
                    console.log(sub2);
                    for (let sem of sub2.semesters) {
                        if (sem === props.semester.semester) {
                            subjectslist.push(sub2);


                        }
                    }
                }

            }


        }
        console.log(subjectslist);
        return subjectslist;
    }


    const subjects = generateSubjects(props.studyprogram);
    console.log(subjects);

    const generateRows = (list) => {
        const rows = [];
        for (const [key, subjects] of Object.entries(list)) {
            rows.push({id: key, subject: subjects.name, type: subjects.subject_type, data: subjects});
            console.log(rows);
        }
        return rows;
    }

    const rows = generateRows(subjects);

    const selctionRows = generateRows(selectedSubjects);

    const handleselection = (row) => {
        console.log(row.data);
        if (!selectedSubjects.includes(row.data.data)) {
            setSelectedSubjects(selectedSubjects.concat(row.data.data));
            setSelectAll(true);
        } else {
            const filterData = (num) => {
                console.log(row.data.data.name);
                console.log(num.name);
                return row.data.data.name !== num.name;
            }
            const newSelectedSubjects = selectedSubjects.filter(filterData);
            setSelectedSubjects(newSelectedSubjects);
            if (newSelectedSubjects.length === 0) {
                setSelectAll(false)
            }
        }
    }

    const handleColumnHeaderClick = (row) => {
        if (!selectAll) {
            setSelectedSubjects(subjects);
            setSelectAll(true);
        } else {
            setSelectedSubjects([]);
            setSelectAll(false);
        }
    }

    if (!nextButton2Clicked && !backButton1Clicked) {
    return (
        <Router>
            <Grid container direction="column">
                <Grid item>
                    <Box className={classes.box}>
                        <Typography className={classes.courseinsights}>CourseInsights</Typography>

                        <Typography className={classes.step2}> Step 2: Mark subjects of interest </Typography>
                    </Box>
                </Grid>
                <Grid item style={{paddingTop: 25, alignSelf: "center"}}>
                    <Card style={{alignSelf: "center", width: 1100}}>
                        <CardContent>
                            <Grid container direction="column">
                                <Grid container>
                                    <Grid item xs={6} style={{paddingTop: 25}}>
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
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={6} style={{paddingTop: 25, paddingLeft: 100}}>
                                        <ApexColumnChart selected={selectedSubjects}/>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={6} style={{paddingTop: 25}}>
                                        <div style={{height: 400, width: '95%', color: '#f50057'}}>
                                            <DataGrid rows={rows} columns={columns} checkboxSelection={true}
                                                      onRowSelected={handleselection}
                                                      onColumnHeaderClick={handleColumnHeaderClick}/>
                                        </div>
                                    </Grid>
                                    <Grid item xs={6} style={{paddingTop: 25}}>
                                        <div style={{height: 400, width: '95%', color: '#f50057'}}>
                                            <DataGrid rows={selctionRows} columns={columns} />
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container style={{width: "100%"}} justify="space-between">
                                <Grid item>
                                    <Button variant="contained"
                                            className={classes.back}
                                            onClick={handleBackButton1Clicked}>
                                        back
                                    </Button>

                                </Grid>

                                <Grid item>
                                    <Button variant="contained"
                                            className={classes.next}
                                            onClick={handleNextButton2Clicked}>
                                        next
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>


        </Router>
    );
}
    if (nextButton2Clicked && !backButton1Clicked) {
        return (<ComparePage studyprogram={props.studyprogram} semester={props.semester} selected={selectedSubjects}/>);
    }
    if (backButton1Clicked) {
        return (<Step1/>)
    }
}