import React, {Component} from 'react';
import Step1 from "./Step1Select/Step1";
import InteractiveTree from "./InteractiveTree/InteractiveTree";
import {BrowserRouter as Router, useHistory} from "react-router-dom";
import {Button, Container} from "@material-ui/core";
/* import TreeFilter from "./TreeFilter/TreeFilter"; */
import './styles.css';

export default function SelectPage(){
    const history = useHistory();
    const isLoggedIn = !!sessionStorage.getItem('elas_userLoggedIn');

    return (
            <Router>
                <Step1/>
                <TreeFilter/>
                <br/> <br/> <br/> <br/>
                <Container id="next">
                    <Button variant="contained"
                            style={{backgroundColor: "#3f51b5",color:"#fff", width: 70 }}
                            onClick={isLoggedIn ? () => history.push('/comparepage') : () => history.push('/login')}>
                        next
                    </Button>
                </Container>

                <Container id = "back">
                    <Button variant="contained"
                            style={{backgroundColor: "#3f51b5",color:"#fff", width: 70}}
                            onClick={isLoggedIn ? () => history.push('/courseinsights') : () => history.push('/login')}>
                        back
                    </Button>
                </Container>
            </Router>
    );

}

