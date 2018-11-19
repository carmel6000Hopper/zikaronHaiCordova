// import { SIGHUP } from 'constants';
// import {WelcomePage} from './components/SignIn.js'
// // import '../styles/App.css';
// import { BrowserRouter as Route, Redirect, Link } from "react-router-dom";
// import Auth from '../services/auth';
import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import { auth } from '../firebase';
import { PasswordForgetForm } from './PasswordForget';
// import { BrowserRouter as Route,Link, Redirect } from "react-router-dom";
//import { Auth } from '../auth/auth.js';

import './Signin-Signup.css';
// import TeacherForgotPass from './TeacherForgotPass';
import { AuthConsumer } from './withAuthorization';

export class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pass: '',
            waitingForSignIn: false,
            loggedIn: false,
            forgotPassShowing: false,
            errorMessage: ''
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
        //this.forgotPassModal = this.forgotPassModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.openForgotPassModal = this.openForgotPassModal.bind(this);
        //this.closeForgotPassModal = this.closeForgotPassModal.bind(this);

        this.SignInForm = this.SignInForm.bind(this);
    }

    SignInForm() {
        const isInvalid =
            this.state.email === '' ||
            this.state.pass === '';

        var forgetPasswordLink = <Link className="Subtitle-1 underline" to="/forgetpass" style={{ textDecoration: 'none' }}>שכחתי סיסמה</Link>
        return (
            <AuthConsumer>
                {({ isAuth, login }) => (
                    // <form className="" onSubmit={ () => login(this.state.email, this.state.pass)}>
                    <div className="">
                        <div className="row"><input className="input" id="email" type="text" dir="rtl" placeholder="כתובת אימייל" value={this.state.email} onChange={this.handleEmailChange} required="required" /></div>
                        <br />
                        <div className="row"><input className="input" id="pass" type="password" dir="rtl" placeholder="סיסמה" value={this.state.pass} onChange={this.handlePassChange} required="required" /></div>
                        <div className="row">
                            <div className="col">
                                <div>{forgetPasswordLink}</div>
                            </div>
                        </div>
                        <div className="row">
                            {!this.state.waitingForSignIn ?
                                <button className="submit-btn" disabled={isInvalid} onClick={() => login(this.state.email, this.state.pass)}>כניסה</button> :
                                <div>cmcmds</div>}
                        </div>
                        <div>{isAuth === true ? <Redirect to='/camera'/> : null}</div>
                    {/* </form> */}
                    </div>
                )}
            </ AuthConsumer>
        );

    }

    handleEmailChange(event) {
        this.setState({ email: event.target.value });
    }

    handlePassChange(event) {
        this.setState({ pass: event.target.value });
    }

    handleSubmit(event, login) {
        login();
        //this.props.history.push('./camera');
        // event.preventDefault();
        // this.setState({ waitingForSignIn: true })
        // auth.doSignInWithEmailAndPassword(this.state.email, this.state.pass)
        //     .then(authUser => {
        //         // history.push(routes.HOME);
        //         console.log("do sign in")
        //         console.log(authUser)
        //         this.props.history.push('./camera');
        //     })
        //     .catch(error => {
        //         this.setState({ errorMessage: error });
        //     });
        //Auth.AuthSignIn(this.state.email, this.state.pass, this.onSignIn.bind(this));

    }

    onSignIn(hasSignedIn) {
        console.log("onSignedIn");
        if (hasSignedIn) {
            this.setState({ loggedIn: hasSignedIn, waitingForSignIn: false });
            //this.props.rerenderAppComp();
        }
        else {
            this.setState({ waitingForSignIn: false });
        }
    }

    // forgotPassModal() {
    //     if (this.state.forgotPassShowing)
    //         // return <TeacherForgotPass onClose={this.closeForgotPassModal}/>;
    //         return <h1>vdv</h1>
    // }
    // openForgotPassModal() {
    //     this.setState({ forgotPassShowing: true });
    // }
    // closeForgotPassModal() {
    //     this.setState({ forgotPassShowing: false });
    // }

    componentWillMount() {
        // TODO - check why it is necessary
        document.body.style.backgroundColor = "#f2f2f2";
    }

    render() {
        if (this.state.loggedIn) {
            console.log("should re-direct");
            //return (<Redirect to='/' />);
        }
        var signUpLink = <Link className="Subtitle-1 underline" to="/signup" style={{ textDecoration: 'none' }}>הרשמה</Link>
        return (
            <div className="body-container flex-box-center-container flex-horizontal-center">
                <div className="ib">
                    <h2 className="h2-center">כניסה</h2>
                    <div className="row"><p className="Subtitle-1 inline">עוד לא נרשמת ? {signUpLink} </p></div>
                    <br />
                    <div>{this.SignInForm()}</div>
                </div>
            </div>
        );
    }
}

export default SignIn;