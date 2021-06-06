import React from 'react';  
import {Nav, NavLink, Bars, NavMenu} from './NavbarElements'

const Navbar = () => {
    return (
        <>
        <Nav>
            <NavLink to="/">
                <h1>CourseInsights</h1>
            </NavLink>
            <Bars />
            <NavMenu>
                 <NavLink to ="/about" activeStyle>
                     About
                 </NavLink>
                 <NavLink to ="/links" activeStyle>
                     Links
                 </NavLink>
            </NavMenu>
        </Nav>
        </>
    );
}

export default Navbar;