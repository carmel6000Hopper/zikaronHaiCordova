import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Route, } from "react-router-dom";
import AuthUserContext from './AuthUserContext';
import { AuthConsumer } from './withAuthorization';
import SignOut from './SignOut';


// import css
import './WelcomePage.css'

const NavigationAuth = () =>
    <div className="flex-box-center-container flex-horizontal-center">
        <Link className="link" to="/homepage"><div className="sign-btn to-home-page">לדף הראשי</div></Link><br />
        <Link className="link" to="/account"><div className="sign-btn to-account-page">החשבון שלי</div></Link><br />
        <Link className="link" to="/signout"><div className="sign-btn signout">התנתק</div></Link><br />
    </div>

const NavigationNonAuth = () =>
    <div className="flex-box-center-container flex-horizontal-center">
        <Link className="link" to="/signup" ><div className="sign-btn signup">משתמש חדש</div></Link>
        <br />
        <Link className="link" to="/signin"><div className="sign-btn signin">משתמש רשום</div></Link><br />
        <Link className="link" to="/gps"><div className="sign-btn visitor">כניסה כאורח</div></Link><br/>
    </div>

const Navigation = () =>
    <AuthConsumer>
        {({isAuth}) =>(
             (isAuth === true )? 
             <NavigationAuth />
             : <NavigationNonAuth />) 
        }
    </AuthConsumer>

export default Navigation;
