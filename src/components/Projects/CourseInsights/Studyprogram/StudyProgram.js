import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import React from "react";
import {Box, Progr} from './StudyprogramElem'


const StudyProgram = () => {
    return (
        <>
            <Box>
                <Progr activeStyle>Your studyprogram: </Progr>

            </Box>
        </>
    );
}

export default StudyProgram