import React, {Component} from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import SearchBox from './SearchBoxStart/SearchBox';
import Navbar from './NavbarStart/index'
import WelcomeText from './WelcomeText/index'

class CourseInsights extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
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
}

export default CourseInsights;