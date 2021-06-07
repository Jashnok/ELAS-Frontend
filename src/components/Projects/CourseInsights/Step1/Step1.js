import React from "react";
import {Bullets, Head} from './Step1Elem'
import {Card, CardContent, Checkbox, makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        maxWidth:400,
        marginLeft: 1000,
        marginRight: 0,
    }
})

const Step1=() => {
    const classes = useStyles();
    return(
        <>
            <Card className={classes.root}>
                <CardContent>
                    <Head activeStyle> Step1: Mark subjects of interest </Head>
                    <Bullets activeStyle> Lecture <br/> Exercise <br/> </Bullets>
                </CardContent>
            </Card>

        </>
    );
}
export default Step1;
