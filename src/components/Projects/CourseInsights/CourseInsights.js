import React, {Component} from 'react';
import { BrowserRouter as Router, useHistory} from 'react-router-dom';
import SearchBox from './SearchBoxStart/SearchBox';
import Navbar from './NavbarStart/index'
import WelcomeText from './WelcomeText/index'
import {Button} from "@material-ui/core"; 



export default function CourseInsights(){

  const history = useHistory();
  const isLoggedIn = !!sessionStorage.getItem('elas_userLoggedIn');

  
  

    return (
      <Router>
              <Navbar/>
              <WelcomeText/> 
              <br />
              <SearchBox/>
              <Button id = "next" variant="contained" color = "primary" onClick={isLoggedIn ? () => history.push('/selectpage') : () => history.push('/login')}> next </Button>
      </Router>
    );
  
}
