import React, {Component} from 'react';
import { BrowserRouter as Router, useHistory} from 'react-router-dom';
import SearchBox from './SearchBoxStart/SearchBox';
import WelcomeText from './WelcomeText/index'
import {Button, Grid} from "@material-ui/core"; 
import "./styles.css"



export default function CourseInsights(){

  const history = useHistory();
  const isLoggedIn = !!sessionStorage.getItem('elas_userLoggedIn');

  
  

    return (
      <Router>
        
              <WelcomeText/> 


         <div style={{paddingTop:20}}> 
        <SearchBox />   
        </div>

        <div style={{paddingTop:20}}>  
        <Button id = "next" 
                variant="contained" 
                color = "primary" 
                onClick={isLoggedIn ? () => history.push('/selectpage') : () => history.push('/login')}>
                next 
        </Button>
        </div>

      </Router>
    );
  
}