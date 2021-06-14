import {Step,Box, Selec} from "./Step2Elem";
import React from "react";

const Step2 = () => {
    return(
        <div>
            <Box >

                <Step activeStyle> Step 2: Compare and decide which subjects you want to take  </Step>
                <Selec acttiveStyle> Your selected studyprogram:</Selec>
                <Selec activeStyle> Your selected semester:</Selec>
            </Box>





        </div>
    );

}

export default Step2;