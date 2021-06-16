import React from 'react';
import {FormControl, FormControlLabel, FormGroup, FormLabel, makeStyles, Switch} from "@material-ui/core";

import GreenSwitch from "./GreenSwitch";
import BlueSwitch from "./BlueSwitch";
import PurpleSwitch from "./PurpleSwitch";
import RedSwitch from "./RedSwitch";
import YellowSwitch from "./YellowSwitch";
import OrangeSwitch from "./OrangeSwitch";
import DeepPurpleSwitch from "./DeepPurpleSwitch";
import DeepPinkSwitch from "./DeepPinkSwitch";
import DeepOrangeSwitch from "./DeepOrangeSwitch";
import LightGreenSwitch from "./LightGreenSwitch";
import GreySwitch from "./GreySwitch";
import AmberSwitch from "./AmberSwitch";
import IndigoSwitch from "./IndigoSwitch";

const useStyles = makeStyles({
    vorlesung: {
        color: "purple",

    },
    uebung:{
        color: "blue",
    },
    praktikum:{
        color: "green",
    },
    vorlesung_uebung: {
        color:"red",
    },
    uebung_praktikum:{
        color:"darkcyan",
    },
    seminar:{
        color: "orange",
    },
    blockseminar:{
      color: "rebeccapurple"
    },
    seminar_uebung:{
      color: "deeppink"
    },
    tutorium:{
      color: "orangered",
    },
    vorlesung_seminar:{
        color: "forestgreen",
    },
    praxisprojekt:{
        color:"#FFBF00",
    },
    keineAngabe:{
        color: "darkgrey",
    },
    selbstaendigesarbeiten:{
      color: "darkblue",
    },
    legend:{
        paddingTop: 5,
        color: "black",
    },
})

export default function TreeFilter(props){
    const classes = useStyles();
    const [state, setState] = React.useState({
        vorlesung: true,
        uebung: true,
        praktikum: true,
        vorlesung_uebung:true,
        uebung_praktikum: true,
        seminar: true,
        blockseminar: true,
        seminar_uebung: true,
        tutorium: true,
        vorlesung_seminar: true,
        praxisprojekt: true,
        selbstaendigesarbeiten: true,
        keineAngabe: true,

    });

    const handleChange = (event) => {
        setState({...state, [event.target.name]: event.target.checked});
    }

    return(
      <FormControl id="filter" component="fieldset" style={{alignItems: "flex-start"}}>
          <FormLabel className={classes.legend} component="legend" style={{textAlign: "center"}}> Show:</FormLabel>
          <FormGroup row>
              <FormControlLabel className={classes.vorlesung} control={<PurpleSwitch checked={state.vorlesung} onChange={handleChange} name="vorlesung"/>}
                    label= "Vorlesung"
              />
              <FormControlLabel className={classes.uebung} control={<BlueSwitch checked={state.uebung} onChange={handleChange} name="uebung"/>}
                                label="Übung"
              />
              <FormControlLabel className={classes.praktikum} control={<GreenSwitch checked={state.praktikum} onChange={handleChange} name="praktikum"/>}
                                label="Praktikum"
              />
              <FormControlLabel className={classes.vorlesung_uebung} control={<RedSwitch checked={state.vorlesung_uebung} onChange={handleChange} name="vorlesung_uebung"/>}
                                label="Vorlesung/Übung"
              />
              <FormControlLabel className={classes.uebung_praktikum} control={<YellowSwitch checked={state.uebung_praktikum} onChange={handleChange} name="uebung_praktikum"/>}
                                label="Übung/Praktikum"
              />
              <FormControlLabel className={classes.seminar} control={<OrangeSwitch checked={state.seminar} onChange={handleChange} name="seminar"/>}
                                label="Seminar"
              />
              <FormControlLabel className={classes.blockseminar} control={<DeepPurpleSwitch checked={state.blockseminar} onChange={handleChange} name="blockseminar"/>}
                                label="Blockseminar"
              />
              <FormControlLabel className={classes.seminar_uebung} control={<DeepPinkSwitch checked={state.seminar_uebung} onChange={handleChange} name="seminar_uebung"/>}
                                label="Seminar/Übung"
              />
              <FormControlLabel className={classes.tutorium} control={<DeepOrangeSwitch checked={state.tutorium} onChange={handleChange} name="tutorium"/>}
                                label="Tutorium"
              />
              <FormControlLabel className={classes.vorlesung_seminar} control={<LightGreenSwitch checked={state.vorlesung_seminar} onChange={handleChange} name="vorlesung_seminar"/>}
                                label="Vorlesung/Seminar"
              />
              <FormControlLabel className={classes.praxisprojekt} control={<AmberSwitch checked={state.praxisprojekt} onChange={handleChange} name="praxisprojekt"/>}
                                label="Praxisprojekt"
              />
              <FormControlLabel className={classes.keineAngabe} control={<GreySwitch checked={state.keineAngabe} onChange={handleChange} name="keineAngabe"/>}
                                label="Keine Angabe"
              />
              <FormControlLabel className={classes.selbstaendigesarbeiten} control={<IndigoSwitch checked={state.selbstaendigesarbeiten} onChange={handleChange} name="selbstaendigesarbeiten"/>}
                                label="Anleitung zum selbständigen Arbeiten"
              />
          </FormGroup>
      </FormControl>
    );
}
