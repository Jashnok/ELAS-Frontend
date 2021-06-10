import {BrowserRouter as Router, useHistory} from "react-router-dom";
import Step2 from "./Step2Compare/Step2";
import {Button, Container} from "@material-ui/core";
import React from "react";

export default function ComparePage(){
    const history = useHistory();
    const isLoggedIn = !!sessionStorage.getItem('elas_userLoggedIn');
    return(
        <Router>
            <Step2/>
            <br/> <br/> <br/> <br/>
            <Container id="back">
                <Button variant="contained"
                        style={{backgroundColor: "#3f51b5",color:"#fff", width: 70 }}
                        onClick={isLoggedIn ? () => history.push('/selectpage') : () => history.push('/login')}>
                    back
                </Button>
            </Container>
        </Router>
    );

}