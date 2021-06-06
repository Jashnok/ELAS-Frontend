import React from 'react'
import {Box, Welc, Nxt, Lst} from './WcTextElem'

const WelcomeText = () => {
    return (
        <>
           <Box>
            <Welc activeStyle>Welcome to CourseInsights</Welc>
            <Nxt activeStyle>We relieve you from painful planing of your study at Uni-Due!</Nxt>
            <Lst activeStyle>(Only for studies that are part of "Ingeneurswissenschaften" right now)</Lst>
           </Box> 
        </>
    );
}

export default WelcomeText
