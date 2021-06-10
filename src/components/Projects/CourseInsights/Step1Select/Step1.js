import React, {Component} from "react";
import { Box, Selec, Step} from './Step1Elem'




export default class Step1 extends Component {
    render() {
        return (
            <div>
                <Box>

                    <Step activeStyle> Step1: {this.props.studyprogramnameData} Mark subjects of interest </Step>
                    <Selec acttiveStyle> Your selected studyprogram:</Selec>
                    <Selec activeStyle> Your selected semester:</Selec>
                </Box>


            </div>
        );
    }
}

