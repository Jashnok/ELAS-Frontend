import React, {useRef, useState} from 'react';
import {Button, Card, makeStyles, Typography} from "@material-ui/core";
import {BrowserRouter as Router} from "react-router-dom";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import {DataGrid} from '@material-ui/data-grid';
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
        height: "220px",
        display: "block",
        alignContent: "center",
    },

    buttons: {
        marginTop: 10,
        width: 50,
        background: "#f50057",
        color: "#ffffff",
        fontVariant: "small-caps"
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
        const subjectnames = [];
        for (let subject of studyprogram.categories) {
            console.log(subject);
            for (let sub of subject.subjects) {
                console.log(sub);
                console.log(props.semester.semester);
                if (sub.semesters.includes(props.semester.semester)) {
                    if(!subjectnames.includes(sub.name)) {
                        subjectslist.push(sub);
                        subjectnames.push(sub.name);
                    }
                }
            }
            for (let cat of subject.categories) {
                console.log(cat);
                for (let sub2 of cat.subjects) {
                    console.log(sub2);
                    if (sub2.semesters.includes(props.semester.semester)) {
                        if(!subjectnames.includes(sub2.name)){
                            subjectslist.push(sub2);
                            subjectnames.push(sub2.name);
                        }

                    }
                }
                for (let cats of cat.categories){
                    for(let sub3 of cats.subjects){
                        if(sub3.semesters.includes(props.semester.semester) && !subjectnames.includes(sub3.name)){
                            subjectslist.push(sub3);
                            subjectnames.push(sub3.name);
                        }
                    }
                }
            }
        }
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

            <Grid container direction="column">

                <Grid item>
                    <Box className={classes.box}>
                        <Grid container direction="column" alignItems="center" justify="space-evenly"
                              style={{height: "100%"}}>
                            <Grid item>
                                <Typography className={classes.courseinsights}>CourseInsights</Typography>
                            </Grid>
                            <Grid item>

                                <Typography className={classes.step2}> Step 2: Mark subjects of interest </Typography>

                            </Grid>

                        </Grid>

                    </Box>
                </Grid>


                <Grid item style={{marginTop: 25, alignSelf: "center", width: "80%"}}>

                    <Card style={{alignSelf: "center"}} variant="outlined">
                        <CardContent style={{margin: 50, padding: 0}}>


                            <Grid container justify="space-between">
                                <Grid item style={{width: "45%"}}>
                                    <Card variant="outlined">
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
                                <Grid item style={{width: "45%", marginTop: 20, fontVariant: "small-caps"}}>
                                    <ApexColumnChart selected={selectedSubjects}/>
                                </Grid>
                            </Grid>


                            <Grid container justify="space-between" style={{marginTop: 25}}>

                                <Grid item style={{marginTop: 25, width: "45%",}}>

                                    <DataGrid rows={rows} columns={columns} checkboxSelection={true}
                                              onRowSelected={handleselection}
                                              onColumnHeaderClick={handleColumnHeaderClick}
                                              style={{color: '#f50057'}}/>

                                </Grid>
                                <Grid item style={{marginTop: 25, width: "45%",}}>
                                    <div style={{height: 400}}>
                                        <DataGrid rows={selctionRows} columns={columns} style={{color: '#f50057'}}/>
                                    </div>
                                </Grid>
                            </Grid>


                            <Grid container justify="space-evenly">
                                <Grid item>
                                    <Button variant="contained"
                                            className={classes.buttons}
                                            onClick={handleBackButton1Clicked}>
                                        back
                                    </Button>

                                </Grid>

                                <Grid item>
                                    <Button variant="contained"
                                            className={classes.buttons}
                                            onClick={handleNextButton2Clicked}>
                                        next
                                    </Button>
                                </Grid>
                            </Grid>

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

        );
    }
    if (nextButton2Clicked && !backButton1Clicked) {
        return (<ComparePage studyprogram={props.studyprogram} semester={props.semester} selected={selectedSubjects}/>);
    }
    if (backButton1Clicked) {
        return (<Step1/>)
    }
}