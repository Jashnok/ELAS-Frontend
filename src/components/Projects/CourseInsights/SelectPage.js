import React, {/*Component, */useState} from 'react';
import {BrowserRouter as Router/*, useHistory*/} from "react-router-dom";
import {Button/*, Container*/} from "@material-ui/core";
import studyprogram from './data';
import SelectedTable from './NewApproach/SelectedTable';
import {Autocomplete} from '@material-ui/lab';
import {makeStyles} from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import {Box, Grid} from "@material-ui/core";
import SubjectsTable from './NewApproach/SubjectsTable';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ComparePage from "./ComparePage";
import Step1 from "./Step1";
import { TrendingUp } from '@material-ui/icons';
import SelectedChart from "./NewApproach/SelectedChart";

const useStyles = makeStyles({
	root: {
		minWidth: 275,
		marginTop: 25,
		width:"75%",
		alignSelf:"center"
	},
	root2: {
		minWidth: 275,
		marginTop: 25,
		marginLeft:25,
		width:"80%",
		alignSelf:"center"
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
		marginTop:40,
		marginBottom: 40,
		textAlign: "center",
		fontVariant: "small-caps",
	},
	
	selection: {
		color: "#f50057",
		display: "block",
		justify: "center",
		textAlign: "left",
		width:"50%",
		marginLeft:25,
		fontSize: 24,
		fontVariant: "small-caps",
		textDecoration:"underline",
	},
	selection2: {
		color: "#000000",
		display: "block",
		justify: "center",
		textAlign: "left",
		width:"50%",
		marginLeft:25,
		fontSize: 20,
		fontVariant: "small-caps",
	},
	box: {
		background: "#3c56ba",
		height: "250px",
		display: "block",
		alignContent: "center",
	},
	next: {
		width: 10,
		height: 30,
		marginRight: 50,
	},
	back: {
		width: 10,
		height: 30,
		alignItems: "center",
	buttons: {
			marginTop: 10,
			width: 50,
			background: "#3c56ba",
			color: "#ffffff",
			fontVariant: "small-caps"
	},
		treeborder: {
			width: 450,
			height: "max-content",
			marginTop: 5,
		}
	},
	buttons:{
		marginTop:10,
		width: 50,
		background: "#f50057",
		color:"#ffffff",
		fontVariant:"small-caps"
	},
});

export default function SelectPage(props) {
	
	// const history = useHistory();
	
	const pstudyprogram = props.studyprogram;
	
	
	const [category1, setCategory1] = React.useState(undefined);
	const [category2, setCategory2] = React.useState(undefined);
	const [category3, setCategory3] = React.useState(undefined);
	const [current, setCurrent] = React.useState([]);
	const [selectedSubjects, setSelectedSubjects] = React.useState([]);

	const [select,setSelect]=React.useState(false);
	const classes = useStyles();
	

	const [nextButton2Clicked, setNextButton2Clicked] = useState(false);
	const [backButton1Clicked, setBackButton1Clicked] = useState(false);
	
	const handleNextButton2Clicked = () => {
		setNextButton2Clicked(true);
	}
	
	const handleBackButton1Clicked = () => {
		setBackButton1Clicked(true);
	}

	const handleAppend = (item) => {

		const newSelected = selectedSubjects.concat(item);
		setSelectedSubjects(newSelected);
	}

	const handleDelete = (row) => {
		const filterData = (num) => {
            return num.name !== row.name;
        }
		
		const newSelected = selectedSubjects.filter(filterData);
		setSelectedSubjects(newSelected);
		
	}
	const handleDelete2 = (row) => {
		const filterData = (num) => {
			if(num.name !== row.name){
				console.log(row);
				return num.name !== row.name;
			}
            
        }
		
		const newSelected = selectedSubjects.filter(filterData);
		setSelectedSubjects(newSelected);
		
	}

	console.log(current);



	
	
	if (!nextButton2Clicked && !backButton1Clicked) {
		return (
			<Router>
				<Box className={classes.box}>
					
					<Typography className={classes.step1} style={{fontSize:40}}> CourseInsights </Typography>
					<Typography className={classes.step1} style={{fontSize:35}}> Step 2: Mark subjects of interest </Typography>
				
				</Box>
				<Card className={classes.root} variant="outlined">				
					<CardContent style={{alignContent:"center"}} >

								<Grid container>
										<Grid item style={{width:"50%"}}>

											<Card className={classes.root2} variant="outlined">
												<CardContent style={{alignContent:"center"}} >
													<Typography className={classes.selection} style={{marginTop:50}}> Your selected studyprogram: </Typography>
													<Typography className={classes.selection2}style={{marginTop:10}}>  {props.studyprogram.name}	  </Typography>			
													<Typography className={classes.selection}style={{marginTop:20}}> Your selected semester: 	  </Typography>
													<Typography className={classes.selection2}style={{marginTop:10}}>{props.semester.semester}     </Typography>
												</CardContent>
											</Card>		


										<Autocomplete
											value={category1}
											autoHighlight="true"
											
											onChange={(event, newValue) => {
												if (newValue === null) {
													setCategory1(undefined);
													setCategory2(undefined);
													setCategory3(undefined);
												} else {
													setCategory1(newValue);
												}
											}}
											id="search-category"
											options={pstudyprogram.categories}
											getOptionLabel={(option) => option.name}
											style={{width:"80%", marginTop: 25, marginLeft:25, fontVariant: "small-caps"}}
											renderInput={(params) => <TextField {...params} label="Select a category here" variant="outlined"
												                                    color="secondary"/>}/>

										{category1 && category1.categories.length > 0 ?
											<Autocomplete
												value={category2}
												onChange={(event, newValue) => {
													if (newValue === null) {
														setCategory2(undefined);
														setCategory3(undefined);
													} else {
														setCategory2(newValue);
													}
												}}
												id="search-category"
												options={category1.categories}
												getOptionLabel={(option) => option.name}
												style={{width:"80%", marginTop: 25, marginLeft:25, fontVariant: "small-caps"}}
												renderInput={(params) => <TextField {...params} label="Select a category here"
												                                    variant="outlined"/>}/>
											
											: <></>}

										{category2 && category2.categories.length > 0 ?
											<Autocomplete
												value={category3}
												onChange={(event, newValue) => {
													if (newValue === null) {
														setCategory3(undefined);
													} else {
														setCategory3(newValue);
													}
													
												}}
												id="search-category"
												options={category2.categories}
												getOptionLabel={(option) => option.name}
												style={{width:"80%", marginTop: 25, marginLeft:25, fontVariant: "small-caps"}}
												renderInput={(params) => <TextField {...params} label="Select a category here"
												                                    variant="outlined"/>}/>
											
											: <></>}

										<div style={{width:"80%", marginTop: 25, marginLeft:25, fontVariant: "small-caps"}}>
											{category3 && category2 && category1 ? <SubjectsTable test={category3} 	 append={handleAppend} delete={handleDelete}  current={current} setCurrent={setCurrent}/> : <></>}
											{!category3 && category2 && category1 ? <SubjectsTable test={category2}  append={handleAppend} delete={handleDelete}  current={current} setCurrent={setCurrent}/> : <></>}
											{!category3 && !category2 && category1 ? <SubjectsTable test={category1} append={handleAppend} delete={handleDelete}  current={current} setCurrent={setCurrent}/> : <></>}
										</div>
										</Grid>
										<Grid item style={{width:"50%"}}>	


										<SelectedChart subjects={selectedSubjects}/>



										<div style={{width:"80%", marginTop: 25, marginLeft:25, fontVariant: "small-caps"}}>

											{selectedSubjects && selectedSubjects.length > 0 ? <SelectedTable subjects={selectedSubjects} delete={handleDelete2}/> : <></>}
											
										</div>		
									</Grid>
								</Grid>


										<Grid container style={{width:"100%"}} justify="space-evenly">

											<Grid item>
												<Button 
														variant="contained"
														className={classes.buttons}
														onClick={handleBackButton1Clicked}>
													back
												</Button>
											</Grid>

											<Grid item>
												<Button 
														variant="contained"
														className={classes.buttons}
														onClick={handleNextButton2Clicked}>
													next
												</Button>
											</Grid>

										</Grid>

			
				</CardContent>
			</Card>
				
				
				
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