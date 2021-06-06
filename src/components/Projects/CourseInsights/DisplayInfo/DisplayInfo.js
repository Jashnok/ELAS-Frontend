import React, {Component} from 'react';
import studyprogram from "./data";
import * as d3 from d3;



export default class DisplayInfo extends Component {

    constructor(props) {
  
      super(props);
        
  
      this.myReference = React.createRef();
  
    }
  
  
    render() {
  
      return (
  
        <div ref={this.myReference}>
  
        </div>
  
      );
  
    }
  
  }
