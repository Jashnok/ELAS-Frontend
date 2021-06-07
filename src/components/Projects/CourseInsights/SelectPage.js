import React, {Component} from 'react';
import Step1 from "./Step1/Step1";
import InteractiveTree from "./InteractiveTree/InteractiveTree";
import {BrowserRouter as Router} from "react-router-dom";
import StudyProgram from './Studyprogram/StudyProgram';




class SelectPage extends Component{

    render() {
        return (

            <Router>
                <StudyProgram/>
                <Step1/>
                <InteractiveTree/>

            </Router>
        );
    }
}

export default SelectPage;