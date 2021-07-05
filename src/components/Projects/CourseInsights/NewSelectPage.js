import React, {useState} from 'react';
import {Button, Card, makeStyles,Typography,TableBody,TableCell,TableContainer,
  createMuiTheme, ThemeProvider, lighten,Table,TableHead, TablePagination,
  TableRow,TableSortLabel,Toolbar,Paper,Checkbox,IconButton,Tooltip,FormControlLabel,
  FormControl,FormGroup, FormLabel,Switch} from "@material-ui/core"; 
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import ApexColumnChart from "./ApexColumnChart";
/* import {Delete} from "@material-ui/icons"; */
import DeleteIcon from "@material-ui/icons/Delete";
/* import {setsEqual} from "chart.js/helpers"; */
import ComparePage from "./ComparePage";
import Step1 from "./Step1";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import FilterListIcon from '@material-ui/icons/FilterList';
import PurpleSwitch from './SelectPageComp/PurpleSwitch';
import IndigoSwitch from './SelectPageComp/IndigoSwitch';
import LightBlueSwitch from './SelectPageComp/LightBlueSwitch';
import TealSwitch from './SelectPageComp/TealSwitch';
import GreenASwitch from './SelectPageComp/GreenASwitch';
import GreenSwitch from './SelectPageComp/GreenASwitch';
import LightGreenSwitch from './SelectPageComp/LightGreenSwitch';
import LimeSwitch from './SelectPageComp/LimeSwitch';
import YellowSwitch from './SelectPageComp/YellowSwitch';
import OrangeSwitch from './SelectPageComp/OrangeSwitch';
import DeepOrangeSwitch from './SelectPageComp/DeepOrangeSwitch';
import BrownSwitch from './SelectPageComp/BrownSwitch';
import GreySwitch from './SelectPageComp/GreySwitch';
 
const theme = createMuiTheme({   
    palette: {      
        primary: {         
            main: "#3f51b5",                 
        },     
        secondary: {         
            main: "#ef6c00"                
        }       
    },
});


const useStyles = makeStyles({
    all: {
        fontVariant:"small-caps",
    },
    root: {
        width: '100%',
      },
      paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
        borderRadius:15,
      },
      card: {
        borderRadius: 15,
/*         backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
        boxShadow: "none" */
       },
      table: {
        minWidth: 400,
      },
      visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
      },
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
        marginTop:10,
		width: 50,
		fontVariant:"small-caps"
    },
    legend:{
        paddingTop: 5,
        color: "black",
    },
    p:{
      marginTop:10,
      width: 64,
    },
});

function descendingComparator(a, b, orderBy) {

    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  
  const headCellsSub = [
    { id: 'name', numeric: true, disablePadding: true, label: 'Subject-name' },
    { id: 'subject_type', numeric: false, disablePadding: true, label: 'Subject-type' },
  ];

  /* TableHead and TableToolbar for all subjects Table */
  function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {        
      onRequestSort(event, property);
    };
    
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all subjects' }}
            />
          </TableCell>
          {headCellsSub.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'left' : 'center'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  
  EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };
  
  const useToolbarStyles = makeStyles((theme) => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
    },
  }));
  
  const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected } = props;
  
    return (
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            Select your Subjects
          </Typography>
        )}
  
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
  };
  
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };
   /* TableHead and TableToolbar für selected Table */
  function EnhancedTableHeadSel(props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
            <TableCell padding="checkbox">

          </TableCell>
          {headCellsSub.map((headCell) => (
              
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'left' : 'center'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
                      <TableCell>
                
                </TableCell>
        </TableRow>
      </TableHead>
    );
  }
  
  EnhancedTableHeadSel.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
  };
  const EnhancedTableToolbarSel = () => {
    const classes = useToolbarStyles();
  
    return (
      <Toolbar
        className={clsx(classes.root)}
      >

          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            Your selected Subjects :
          </Typography>

      </Toolbar>
    );
  };
  

export default function NewSelectPage(props) {


    
    /* Variables for all Subjects Table */

    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    /* Variables for selected Subjects Table */
    
    const [orderSel, setOrderSel] = React.useState('asc');
    const [orderBySel, setOrderBySel] = React.useState('name');
    const [selectedSel, setSelectedSel] = React.useState([]);
    const [pageSel, setPageSel] = React.useState(0);
    const [denseSel, setDenseSel] = React.useState(false);
    const [rowsPerPageSel, setRowsPerPageSel] = React.useState(5);

    /* Pagination Vars Step1/Compare-Page */

    const [nextButton2Clicked, setNextButton2Clicked] = useState(false);
    const [backButton1Clicked, setBackButton1Clicked] = useState(false);

    const generateSubjects = (studyprogram) => {
        const subjectslist = [];
        const subjectnames = [];

        for (let subject of studyprogram.categories) {
            
            for (let sub of subject.subjects) {
                
                if (sub.semesters.includes(props.semester.semester) && !subjectnames.includes(sub.name) ) {

                        subjectslist.push(sub);
                        subjectnames.push(sub.name);
                    }


                }
            
            for (let cat of subject.categories) {
                
                for (let sub2 of cat.subjects) {
                    
                    if(sub2.semesters.includes(props.semester.semester && !subjectnames.includes(sub2.name))) {
                            subjectslist.push(sub2);
                            subjectnames.push(sub2.name);
                        }
                    
                }

            
            for(let cats of cat.categories){
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
    const[subjects,setSubjects] = React.useState(generateSubjects(props.studyprogram));
    console.log(subjects.filter( el => el.subject_type ==="Übung"));
    const [counts,setCounts] = React.useState({
        vorlesungCount: subjects.filter( el => el.subject_type ==="Vorlesung").length,
        anleitungCount: subjects.filter( el => el.subject_type ==="Anleitung zum selbständigen Arbeiten").length,
        uebungCount : subjects.filter( el => el.subject_type ==="Übung").length,
        praktikumCount : subjects.filter( el => el.subject_type ==="Praktikum").length,
        vorlesungÜbungCount : subjects.filter( el => el.subject_type ==="Vorlesung/Übung").length,
        uebungPraktikumCount : subjects.filter( el => el.subject_type ==="Übung/Praktikum").length,
        seminarCount : subjects.filter( el => el.subject_type ==="Seminar").length,
        blockseminarCount : subjects.filter( el => el.subject_type ==="Blockseminar").length,
        seminarUebungCount : subjects.filter( el => el.subject_type ==="Seminar/Übung").length,
        tutoriumCount : subjects.filter( el => el.subject_type ==="Tutorium").length,
        vorlesungSeminarCount : subjects.filter( el => el.subject_type ==="Vorlesung/Seminar").length,
        praxisprojektCount : subjects.filter( el => el.subject_type ==="Praxisprojekt").length,
        keineAngabeCount : subjects.filter( el => el.subject_type ==="Keine Angabe").length,
    })

    /* All functions for the Subject Table with all possible subjects */

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = subjects;
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, row) => {
    const selectedIndex = selected.indexOf(row);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (row) => selected.indexOf(row) !== -1;

   const emptyRows = rowsPerPage - Math.min(rowsPerPage, subjects.length - page * rowsPerPage); 

   /* All functions for the Subject Table with all selected subjects from the other table */

   const handleRequestSortSel = (event, property) => {
    console.log(property);
    const isAsc = orderBy === property && order === 'asc';
    setOrderSel(isAsc ? 'desc' : 'asc');
    setOrderBySel(property);
    };

    const handleChangePageSel = (event, newPage) => {
    setPageSel(newPage);
    };

    const handleChangeRowsPerPageSel = (event) => {
        setRowsPerPageSel(parseInt(event.target.value, 10));
        setPageSel(0);
      };
    const handleChangeDenseSel = (event) => {
    setDenseSel(event.target.checked);
    };

    const handleDelete = (event, row) => {
        const selectedIndex = selected.indexOf(row);
        let newSelected = [];

        if (selectedIndex === 0) {
          newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
          );
        }
    
        setSelected(newSelected);
    }

    const emptyRowsSel = rowsPerPageSel - Math.min(rowsPerPageSel, selected.length - pageSel * rowsPerPageSel);

    /* Pagination Functions Step1/Compare-Page */

    const handleNextButton2Clicked = () => {
        setNextButton2Clicked(true);
    }

    const handleBackButton1Clicked = () => {
        setBackButton1Clicked(true);
    }

    /* FilterFunctions and SwitchStates */

    const [state, setState] = React.useState({
        vorlesung: true,
        uebung: true,
        praktikum: true,
        vorlesung_uebung:true,
        uebung_praktikum: true,
        seminar: true,
        blockseminar: true,
        seminar_uebung: true,
        tutorium: true,
        vorlesung_seminar: true,
        praxisprojekt: true,
        selbstaendigesarbeiten: true,
        keineAngabe: true,
      });
    
      const filterSubjects = (event,cond,comp) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        if(cond === true){
           const filteredArray = subjects.filter( el => el.subject_type !==comp);
           setSubjects(filteredArray);
        }
        else{
            const old = generateSubjects(props.studyprogram).filter(el => el.subject_type ===comp);
            const test = subjects.concat(old);
            setSubjects(test);
        }     
      };      


    if (!nextButton2Clicked && !backButton1Clicked) {
    return (
        <ThemeProvider theme={theme}>
            <Grid container direction="column" className={classes.all}>

                <Grid item>
                    <Box className={classes.box}>
                        <Grid container direction="column" alignItems="center" justify="space-evenly" style={{height:"100%"}}>
                            <Grid item>
                                <Typography className={classes.courseinsights}>CourseInsights</Typography>
                            </Grid>
                            <Grid item>
                                
                                 <Typography className={classes.step2}> Step 2: Mark subjects of interest </Typography>

                            </Grid>

                        </Grid>
                        
                    </Box>
                </Grid>

                <Grid item style={{marginTop: 25, alignSelf: "center", width:"80%"}}>

                    <Card classes={{root: classes.card}} style={{alignSelf: "center"}} variant="outlined" >
                        <CardContent style={{margin:50, padding:0}}>
                            
                               
                                <Grid container justify="space-between">
                                    <Grid item  style={{width:"45%"}}>
                                        <Card variant="outlined"classes={{root: classes.card}}>
                                            <CardContent >
                                                <Typography color="secondary" className={classes.caption}> Your
                                                    selection:</Typography>
                                                <Typography color="secondary" className={classes.lilcaptions}> Your
                                                    selected studyprogram: </Typography>
                                                <Typography
                                                    className={classes.content}>{props.studyprogram.name}</Typography>
                                                <Typography color="secondary" className={classes.lilcaptions}> Your selected
                                                    semester: </Typography>
                                                <Typography
                                                    className={classes.content}>{props.semester.semester}</Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item style={{width:"45%", marginTop:20}}>
                                         <ApexColumnChart selected={selected}/> 
                                    </Grid>
                                </Grid>

                                <div style={{marginTop:25}}>
                                <FormControl id="filter" component="fieldset" style={{alignItems: "flex-start"}}>
                                    <FormLabel className={classes.legend} component="legend" style={{textAlign: "center", marginBottom:15}}> Filter:</FormLabel>
                                        <FormGroup row >

                                            {counts.anleitungCount > 0 ? <FormControlLabel control={<PurpleSwitch 
                                                checked={state.selbstaendigesarbeiten}
                                                onChange={(event) => filterSubjects(event,state.selbstaendigesarbeiten,"Anleitung zum selbständigen Arbeiten")} 
                                                name="selbstaendigesarbeiten"/>}
                                                label="Anleitung zum selbständigen Arbeiten"
                                            />: <></>}

                                            {counts.blockseminarCount > 0 ? <FormControlLabel control={<IndigoSwitch
                                                checked={state.blockseminar}
                                                onChange={(event) => filterSubjects(event,state.blockseminar,"Blockseminar")} 
                                                name="blockseminar"/>}
                                                label="Blockseminar"
                                            />: <></>}

                                            {counts.praktikumCount > 0 ? <FormControlLabel control={<LightBlueSwitch
                                                checked={state.praktikum}
                                                onChange={(event) => filterSubjects(event,state.praktikum,"Praktikum")} 
                                                name="praktikum"/>}
                                                label="Praktikum"
                                            />: <></>}

                                            {counts.praxisprojektCount > 0 ? <FormControlLabel control={<TealSwitch
                                                checked={state.praxisprojekt}
                                                onChange={(event) => filterSubjects(event,state.praxisprojekt,"Praxisprojekt")} 
                                                name="praxisprojekt"/>}
                                                label="Praxisprojekt"
                                            />: <></>}

                                            {counts.seminarCount > 0 ? <FormControlLabel control={<GreenASwitch
                                                checked={state.seminar}
                                                onChange={(event) => filterSubjects(event,state.seminar,"Seminar")} 
                                                name="seminar"/>}
                                                label="Seminar"
                                            />: <></>}

                                            {counts.seminarUebungCount > 0 ? <FormControlLabel control={<GreenSwitch
                                                checked={state.seminar_uebung}
                                                onChange={(event) => filterSubjects(event,state.seminar_uebung,"Seminar/Übung")} 
                                                name="seminarUebung"/>}
                                                label="Seminar/Übung"
                                            />: <></>}

                                            {counts.tutoriumCount > 0 ? <FormControlLabel control={<LightGreenSwitch
                                                checked={state.tutorium}
                                                onChange={(event) => filterSubjects(event,state.tutorium,"Tutorium")} 
                                                name="tutorium"/>}
                                                label="Tutorium"
                                            />: <></>}
                                              
                                            {counts.uebungCount > 0 ? <FormControlLabel control={<LimeSwitch 
                                                    checked={state.uebung} 
                                                    onChange={(event) => filterSubjects(event,state.uebung,"Übung")}
                                                    name="uebung"/>}
                                                    label="Übung"
                                            />: <></>} 

                                            {counts.uebungPraktikumCount > 0 ? <FormControlLabel control={<YellowSwitch
                                                checked={state.uebung_praktikum}
                                                onChange={(event) => filterSubjects(event,state.uebung_praktikum,"Übung/Praktikum")} 
                                                name="uebung_praktikum"/>}
                                                label="Übung/Praktikum"
                                            />: <></>}

                                            {counts.vorlesungCount > 0 ?<FormControlLabel control={<OrangeSwitch 
                                                    checked={state.vorlesung} 
                                                    onChange={(event) => filterSubjects(event,state.vorlesung,"Vorlesung")}
                                                    name="vorlesung"/>}
                                                label="Vorlesung"
                                                />: <></>} 

                                            {counts.vorlesungSeminarCount > 0 ? <FormControlLabel control={<DeepOrangeSwitch
                                                checked={state.vorlesung_seminar}
                                                onChange={(event) => filterSubjects(event,state.vorlesung_seminar,"Vorlesung/Seminar")} 
                                                name="vorlesungSeminar"/>}
                                                label="Vorlesung/Seminar"
                                            />: <></>}

                                            {counts.vorlesungÜbungCount > 0 ? <FormControlLabel control={<BrownSwitch
                                                checked={state.vorlesung_uebung}
                                                onChange={(event) => filterSubjects(event,state.vorlesung_uebung,"Vorlesung/Übung")} 
                                                name="vorlesung_uebung"/>}
                                                label="Vorlesung/Übung"
                                            />: <></>} 

                                            {counts.keineAngabeCount > 0 ? <FormControlLabel control={<GreySwitch
                                                checked={state.keineAngabe}
                                                onChange={(event) => filterSubjects(event,state.keineAngabe,"Keine Angabe")} 
                                                name="keineAngabe"/>}
                                                label="Keine Angabe"
                                            />: <></>}
 
                                        </FormGroup>
                                    </FormControl>    
                                </div>
                                                            
                                    
                                <Grid container justify="space-between" style={{marginTop:25}}>

                                    <Grid item style={{width:"45%"}}>
                                                 
                                        <div className={classes.root}>
                                            <Paper className={classes.paper}>
                                                <EnhancedTableToolbar numSelected={selected.length} />
                                                <TableContainer>
                                                <Table
                                                    className={classes.table}
                                                    aria-labelledby="tableTitle"
                                                    size={dense ? "small" : "medium"}
                                                    aria-label="enhanced table"
                                                >
                                                    <EnhancedTableHead
                                                    classes={classes}
                                                    numSelected={selected.length}
                                                    order={order}
                                                    orderBy={orderBy}
                                                    onSelectAllClick={handleSelectAllClick}
                                                    onRequestSort={handleRequestSort}
                                                    rowCount={subjects.length}
                                                    />
                                                    <TableBody>
                                                    {stableSort(subjects, getComparator(order, orderBy))
                                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                        .map((row, index) => {
                                                        const isItemSelected = isSelected(row);
                                                        const labelId = `enhanced-table-checkbox-${index}`;

                                                        return (
                                                            <TableRow
                                                            hover
                                                            onClick={(event) => handleClick(event, row)}
                                                            role="checkbox"
                                                            aria-checked={isItemSelected}
                                                            tabIndex={-1}
                                                            key={row.name}
                                                            selected={isItemSelected}
                                                            >
                                                            <TableCell padding="checkbox">
                                                                <Checkbox
                                                                checked={isItemSelected}
                                                                inputProps={{ "aria-labelledby": labelId }}
                                                                />
                                                            </TableCell>
                                                            <TableCell
                                                                component="th"
                                                                id={labelId}
                                                                scope="row"
                                                                padding="none"
                                                            >
                                                                {row.name}
                                                            </TableCell>
                                                            <TableCell align="left">{row.subject_type}</TableCell>
                                                            </TableRow>
                                                        );
                                                        })}
                                                    {emptyRows > 0 && (
                                                        <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                                        <TableCell colSpan={6} />
                                                        </TableRow>
                                                    )}
                                                    </TableBody>
                                                </Table>
                                                </TableContainer>
                                                <TablePagination
                                                rowsPerPageOptions={[5, 10, 25]}
                                                component="div"
                                                count={subjects.length}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                onChangePage={handleChangePage}
                                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                                />
                                            </Paper>
                                            <FormControlLabel
                                                control={<Switch checked={dense} onChange={handleChangeDense} />}
                                                label="Dense padding"
                                            />
                                            </div> 
                                            
                                    </Grid>
                                    <Grid item  style={{width:"45%"}}>

                                        <div className={classes.root}>
                                            <Paper className={classes.paper}>
                                                <EnhancedTableToolbarSel/>
                                                <TableContainer>
                                                <Table
                                                    className={classes.table}
                                                    aria-labelledby="tableTitle"
                                                    size={denseSel ? "small" : "medium"}
                                                    aria-label="enhanced table"
                                                >
                                                    <EnhancedTableHeadSel
                                                    classes={classes}
                                                    order={orderSel}
                                                    orderBy={orderBySel}
                                                    onRequestSort={handleRequestSortSel}
                                                    />
                                                    <TableBody>
                                                    {stableSort(selected, getComparator(orderSel, orderBySel))
                                                        .slice(pageSel * rowsPerPageSel, pageSel * rowsPerPageSel + rowsPerPageSel)
                                                        .map((row, index) => {
                                                         const isItemSelected = isSelected(row); 
                                                        const labelId = `enhanced-table-checkbox-${index}`; 

                                                        return (
                                                            <TableRow
                                                            hover
                                                            tabIndex={-1}
                                                            key={row.name}
                                                            >
                                                            <TableCell padding="checkbox"></TableCell>
                                                            <TableCell
                                                                component="th"
                                                                id={labelId}
                                                                scope="row"
                                                                padding="none"
                                                            >
                                                                {row.name}
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                {row.subject_type}
                                                            
                                                               
                                                            </TableCell>
                                                            <TableCell>
                                                            <Tooltip title="Delete">
                                                                    <IconButton aria-label="delete" onClick={(event) => handleDelete(event, row)} >
                                                                    < DeleteIcon />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </TableCell>
                                                            </TableRow>
                                                        );
                                                        })}
                                                    {emptyRowsSel > 0 && (
                                                        <TableRow style={{ height: (denseSel ? 33 : 53) * emptyRowsSel }}>
                                                        <TableCell colSpan={6} />
                                                        </TableRow>
                                                    )}
                                                    </TableBody>
                                                </Table>
                                                </TableContainer>
                                                <TablePagination
                                                rowsPerPageOptions={[5, 10, 25]}
                                                component="div"
                                                count={selected.length}
                                                rowsPerPage={rowsPerPageSel}
                                                page={pageSel}
                                                onChangePage={handleChangePageSel}
                                                onChangeRowsPerPage={handleChangeRowsPerPageSel}
                                                />
                                            </Paper>
                                            <FormControlLabel
                                                control={<Switch checked={denseSel} onChange={handleChangeDenseSel} />}
                                                label="Dense padding"
                                            />
                                        </div> 

                                    </Grid>
                                </Grid>
                                

                              

                            <Grid container  justify="space-evenly">
                                <Grid item>
                                    <Button variant="outlined"
                                            className={classes.buttons}
                                            color="primary"
                                            onClick={handleBackButton1Clicked}>
                                        back
                                    </Button>

                                </Grid>

                                <Grid item>
                                  {selected.length > 0 ?
                                    <Button variant="contained"
                                            color="primary"
                                            className={classes.buttons}
                                            onClick={handleNextButton2Clicked}>
                                        next
                                    </Button> :<div className={classes.p}>
                                        </div>}

                                </Grid>
                            </Grid>
                            
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
    if (nextButton2Clicked && !backButton1Clicked) {
        return (<ComparePage studyprogram={props.studyprogram} semester={props.semester} selected={selected}/>);
    }
    if (backButton1Clicked) {
        return (<Step1/>)
    }
}