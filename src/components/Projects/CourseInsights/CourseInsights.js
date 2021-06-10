import React, {Component} from 'react';
import { BrowserRouter as Router, useHistory} from 'react-router-dom';
import SearchBox from './SearchBoxStart/SearchBox';
import WelcomeText from './WelcomeText/index'
import {Selec, ButSelec} from './WelcomeText/WcTextElem'
import {Button, Grid} from "@material-ui/core";
import SemesterSelec from './SemesterSelec/SemesterSelec'


export default function CourseInsights(){

  const history = useHistory();
  const isLoggedIn = !!sessionStorage.getItem('elas_userLoggedIn');



    return (
      <Router>
        
        <WelcomeText/> 

        <Selec>

          <div style={{paddingTop:20}}> 
            <SearchBox />   
          </div>
          <ButSelec>
            <div style={{paddingTop:20}}>
            <SemesterSelec/>
            </div>

           <div style={{paddingTop:55, paddingLeft:30}}>
              <Button id = "next" 
                variant="contained" 
                style={{backgroundColor: "#3f51b5",color:"#fff", width: 70 }}
                onClick={isLoggedIn ? () => history.push('/selectpage') : () => history.push('/login')}>
                next
              </Button>
            </div>  
          </ButSelec>
        </Selec>

      </Router>
    );
  
}