import React, {Component} from 'react';
import { BrowserRouter as Router, useHistory} from 'react-router-dom';
import SearchBox from './SearchBoxStart/SearchBox';
import BarChart from './SearchBoxStart/BarChart';
import WelcomeText from './WelcomeText/index'
import {Selec, ButSelec, OrderSelecChart} from './WelcomeText/WcTextElem'
import {Button, Grid} from "@material-ui/core"; 
import "./styles.css"
import SemesterSelec from './SemesterSelec/SemesterSelec'


export default function CourseInsights(){

  const history = useHistory();
  const isLoggedIn = !!sessionStorage.getItem('elas_userLoggedIn');
<<<<<<< HEAD
  
  
  
=======


>>>>>>> 7c444e5bad981bb47af97069ff9cdcbe0301d890

    return (

       <React.Fragment>
        <WelcomeText/> 
      <OrderSelecChart>
        <Selec>

          <div style={{paddingTop:20}}> 
            <SearchBox />   
          </div>
          <ButSelec>
            <div style={{paddingTop:40}}>
            <SemesterSelec/>
            </div>

           <div style={{paddingTop:75, paddingLeft:30}}>  

              <Button id = "next" 
                variant="contained" 
                style={{backgroundColor: "#3f51b5",color:"#fff", width: 70 }}
                onClick={isLoggedIn ? () => history.push('/selectpage') : () => history.push('/login')}>
                next
              </Button>
            </div>  
          </ButSelec>
          </Selec>

        </OrderSelecChart>
        </React.Fragment> 
    );
  
}
//          <Barchart/> line 45