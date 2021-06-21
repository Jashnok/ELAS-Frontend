import React, {Component, useState} from 'react';
import {BrowserRouter as Router, useHistory} from "react-router-dom";
import {Button, Container} from "@material-ui/core";
import TreeFilter from "./TreeFilter/TreeFilter";
import studyprogram from './data';
import {Autocomplete} from '@material-ui/lab';
import {makeStyles} from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import {Box, Grid} from "@material-ui/core"; 
import TreeChart from './InteractiveTree/TreeChart';
import SubjectsTable from './NewApproach/SubjectsTable';
import BarChart from './StartpageComp/BarChart';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        marginTop: 20,

      },
      bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        fontSize: 14,
      },
      pos: {
        marginBottom: 12,
      },
    step1: {
        color: "#ffffff",
        display: "block",
        justify: "center",
        marginBottom: 10,
        marginTop: 10,
        fontSize: 25,
        textAlign: "center",
        fontVariant:"small-caps",
    },

    selection: {
        color:"#ffffff",
        display: "block",
        justify: "center",
        textAlign: "center",
        marginTop: 10,
        marginBottom: 10,
        fontSize: 20,
        fontVariant:"small-caps",
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
    buttons:{
        marginTop:10,
        width: 50,
        background: "#3c56ba",
        color:"#ffffff",
        fontVariant:"small-caps"
    },
    treeborder: {
        width: 450,
        height: "max-content",
        marginTop: 5,
    }
});

export default function SelectPage(props){

    const history = useHistory();

    const pstudyprogram = studyprogram[0];
    
    
    const [category1, setCategory1] = React.useState(undefined);
    const [category2, setCategory2] = React.useState(undefined);
    const [category3, setCategory3] = React.useState(undefined);
    const [index, setIndex] = React.useState(undefined); 
    const isLoggedIn = !!sessionStorage.getItem('elas_userLoggedIn');
    const classes = useStyles();
    const [isChanged, setIsChanged] = React.useState(false);
    const [depth, setDepth] = React.useState(undefined);

    console.log(pstudyprogram);
    console.log(category1);
    console.log(category2);
    console.log(category3);

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
            <Router>
                <Box className={classes.box}>

                    <Typography className={classes.step1}> Step 2: Mark subjects of interest </Typography>
                    <Typography className={classes.selection}> Your selected
                        studyprogram: {props.studyprogram.name}</Typography>
                    <Typography className={classes.selection}> Your selected semester:  {props.semester.semester} </Typography>

                </Box>
               <Card className={classes.root} variant="outlined"> 

                     <CardContent> 
                         <Grid container alignItems="flex-start">
                            <Grid item  >
                            <Grid container direction="column">
                            <Grid item>

                                <Autocomplete
                                    value={category1}
                                    autoHighlight="true"
                                    
                                    onChange={(event, newValue) => {
                                        if(newValue===null){
                                         setCategory1(undefined);
                                         setCategory2(undefined);
                                         setCategory3(undefined);   
                                        }
                                        else{
                                        setCategory1(newValue);
                                        }
                                    }}
                                    id="search-category"
                                    options={pstudyprogram.categories}
                                    getOptionLabel={(option) => option.name }
                                    style={{width:"auto", minWidth:750,marginTop:30, fontVariant:"small-caps"}}
                                    renderInput={(params) => <TextField {...params} label="Select a category here" variant="outlined" color="secondary"/>}/>
                            </Grid>  
                            <Grid item>
                                { category1 && category1.categories.length > 0 ?
                                    <Autocomplete
                                    value={category2}
                                    onChange={(event, newValue) => {
                                        if(newValue===null){
                                            setCategory2(undefined);
                                            setCategory3(undefined);   
                                           }
                                           else{
                                           setCategory2(newValue);
                                           }
                                    }}
                                    id="search-category"
                                    options={category1.categories}
                                    getOptionLabel={(option) => option.name }
                                    style={{width:"auto", marginTop:30}}
                                    renderInput={(params) => <TextField {...params} label="Select a category here" variant="outlined"/>}/>
                            
                                : <></> }
                            </Grid>

                            <Grid item>
                                { category2 && category2.categories.length > 0 ?
                                    <Autocomplete
                                    value={category3}
                                    onChange={(event, newValue) => {
                                        if(newValue===null){
                                            setCategory3(undefined);
                                        }
                                        else{
                                            setCategory3(newValue);
                                        }
                                        
                                    }}
                                    id="search-category"
                                    options={category2.categories}
                                    getOptionLabel={(option) => option.name }
                                    style={{width:"auto", marginTop:30}}
                                    renderInput={(params) => <TextField {...params} label="Select a category here" variant="outlined"/>}/>
                            
                                : <></> }

                            </Grid> 

                            <Grid item>
 
                             <div style={{width:"100%", paddingTop:50}}>
                            {  category3  && category2 && category1 ? <SubjectsTable test={category3}/> : <></> }
                            {  !category3 && category2 && category1? <SubjectsTable test={category2}/> : <></> }
                            {  !category3 && !category2 && category1  ? <SubjectsTable test={category1}/> : <></> }
                            </div> 
 
                            </Grid>
                              
                            </Grid>
                            </Grid>

                            </Grid>
                                    

 
                       
                    </CardContent>                    
                </Card>   

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
                </Router>
        );
    }
    if(nextButton2Clicked && !backButton1Clicked) {
        return (<ComparePage studyprogram={props.studyprogram} semester={props.semester}/>);
    }
    if(backButton1Clicked) {
        return (<Step1/>)
    }
}
