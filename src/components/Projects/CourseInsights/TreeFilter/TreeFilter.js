import React from 'react';
import {FormControl, FormControlLabel, FormGroup, FormLabel, Switch} from "@material-ui/core";
import {Step} from "../Step1Select/Step1Elem";
import './FilterNameColors.css';
import { withStyles } from '@material-ui/core/styles';
import {blue, purple} from '@material-ui/core/colors';
import GreenSwitch from "./GreenSwitch";
import BlueSwitch from "./BlueSwitch";
import PurpleSwitch from "./PurpleSwitch";
import RedSwitch from "./RedSwitch";
import YellowSwitch from "./YellowSwitch";
import OrangeSwitch from "./OrangeSwitch";


export default function TreeFilter(){
    const [state, setState] = React.useState({
        vorlesung: true,
        uebung: true,
        praktikum: true,
        vorlesung_uebung:true,
        uebung_praktikum: true,
        seminar: true,
    });

    const handleChange = (event) => {
        setState({...state, [event.target.name]: event.target.checked});
    }

    return(
      <FormControl id="filter" component="fieldset" style={{alignItems: "center"}}>
          <FormLabel id="legend" component="legend" style={{textAlign: "center"}}> Show:</FormLabel>
          <FormGroup row>
              <FormControlLabel id="vorlesung" control={<PurpleSwitch checked={state.vorlesung} onChange={handleChange} name="vorlesung"/>}
                    label= "Vorlesung"
              />
              <FormControlLabel id="uebung" control={<BlueSwitch checked={state.uebung} onChange={handleChange} name="uebung"/>}
                                label="Übung"
              />
              <FormControlLabel id="praktikum" control={<GreenSwitch checked={state.praktikum} onChange={handleChange} name="praktikum"/>}
                                label="Praktikum"
              />
              <FormControlLabel id="vorlesung_uebung"control={<RedSwitch checked={state.vorlesung_uebung} onChange={handleChange} name="vorlesung_uebung"/>}
                                label="Vorlesung/Übung"
              />
              <FormControlLabel id="uebung_praktikum"control={<YellowSwitch checked={state.uebung_praktikum} onChange={handleChange} name="uebung_praktikum"/>}
                                label="Übung/Praktikum"
              />
              <FormControlLabel id="seminar" control={<OrangeSwitch checked={state.seminar} onChange={handleChange} name="seminar"/>}
                                label="Seminar"
              />
          </FormGroup>
      </FormControl>
    );
}
