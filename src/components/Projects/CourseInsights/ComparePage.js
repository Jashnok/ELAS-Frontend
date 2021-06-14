import {BrowserRouter as Router, useHistory} from "react-router-dom";
import {Button, Container, Typography} from "@material-ui/core";
import React from "react";
import studyprogram from './data';
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

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
});

export default function ComparePage(props){
    const classes = useStyles();
    const history = useHistory();
    const isLoggedIn = !!sessionStorage.getItem('elas_userLoggedIn');
    return(
        <Router>
            <Box className={classes.box}>

                <Typography className={classes.step2}> Step 3: Compare and decide which subjects you want to take  </Typography>
                <Typography className={classes.selection}> Your selected studyprogram: {studyprogram[5].name}</Typography>
                <Typography className={classes.selection}> Your selected semester: SoSe2019</Typography>
            </Box>
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