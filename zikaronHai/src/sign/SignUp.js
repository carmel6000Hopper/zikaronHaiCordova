import React, { Component } from 'react';
// import { SIGHUP } from 'constants';
// import {WelcomePage} from './components/SignIn.js'
// // import '../styles/App.css';
// import { BrowserRouter as Route, Redirect, Link } from "react-router-dom";
//import { Auth } from '../auth/auth.js';
// import doCreateUser from '../firebase/accountDb'
import { auth, dBRefUsers } from '../firebase';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router'
import './Signin-Signup.css';

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});
function checkForLetters(str) {
    let letter;
    for (let i = 0; i < 26; i++) {
        let t = String.fromCharCode(('a').charCodeAt(0) + i);
        if (str.indexOf(t) > -1)
            return true;
    }
    for (let i = 0; i < 26; i++) {
        let t = String.fromCharCode(('A').charCodeAt(0) + i);
        if (str.indexOf(t) > -1)
            return true;
    }
    for (let i = 0; i < 26; i++) {
        let t = String.fromCharCode(('א').charCodeAt(0) + i);
        if (str.indexOf(t) > -1)
            return true;
    }
    return false;
}

export class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            pass: '',
            passconfirm: '',
            nickname: '',
            firstNameErrorMsg: '',
            lastNameErrorMsg: '',
            passErrorMsg: '',
            passconfirmErrorMsg: '',
            // nicknameErrorMsg: '',
            waitingForSignup: false,
            signedUp: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentWillMount() {
        document.body.style.backgroundColor = "#f2f2f2";

    }
    handleChange(event) {
        if (event.target.id === "email")
            this.setState({ email: event.target.value });
        if (event.target.id === "first-name") {
            this.setState({ firstName: event.target.value });
            if (!checkForLetters(event.target.value))
                this.setState({ firstNameErrorMsg: 'על השם להכיל אותיות' });
            else if (this.state.firstNameErrorMsg.length !== 0)
                this.setState({ firstNameErrorMsg: '' });
        }

        if (event.target.id === "last-name") {
            this.setState({ lastName: event.target.value });
            if (!checkForLetters(event.target.value))
                this.setState({ lastNameErrorMsg: 'על השם להכיל אותיות' });
            else if (this.state.lastNameErrorMsg.length !== 0)
                this.setState({ lastNameErrorMsg: '' });
        }
        if (event.target.id === "pass") {
            this.setState({ pass: event.target.value });
            if (event.target.value.length < 5)
                this.setState({ passErrorMsg: 'סיסמה קצרה מידי' });
            else if (this.state.passErrorMsg.length !== 0)
                this.setState({ passErrorMsg: '' });
        }
        if (event.target.id === "passconfirm") {
            this.setState({ passconfirm: event.target.value });
            if (event.target.value !== this.state.pass)
                this.setState({ passconfirmErrorMsg: 'סיסמה לא תואמת' });
            else if (this.state.passconfirmErrorMsg.length !== 0)
                this.setState({ passconfirmErrorMsg: '' });
        }
        if (event.target.id === "nickname")
            this.setState({ nickname: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.firstNameErrorMsg || this.state.lastNameErrorMsg || this.state.passErrorMsg || this.state.passconfirmErrorMsg) {
            return (<div>something wrong</div>);
        }
        else {
            this.setState({ waitingForSignup: true });
            console.log(this.state.email, this.state.pass);
            auth.doCreateUserWithEmailAndPassword(this.state.email, this.state.pass)
                .then(authUser => {
                    console.log("doCreateUserWithEmailAndPassword");
                    // Create a user in your own accessible Firebase Database too
                    var userInfos = {};
                    // TODO : ADD AUTH
                    //imageInfos['userId'] = isUserSignedIn() ? firebase.auth().currentUser.uid : "no-uid";
                    userInfos['uid'] = authUser.user.uid;
                    userInfos['email'] = this.state.email;
                    userInfos['firstName'] = this.state.firstName;
                    userInfos['lastName'] = this.state.lastName;
                    userInfos['nickname'] = this.state.nickname;
                    userInfos['numSignsPictureFirstAdded'] = 0;
                    userInfos['numSignsPictureTaken'] = 0;
                    dBRefUsers.push( userInfos,
                        function onComplete(err) {
                        if (err) {
                          alert("uploadImageInfosToDB: push failed with " + err);
                        } else {
                          console.log("uploadUserInfosToDB: done");
                        }
                      });
                    this.props.history.push('./camera');
                })
                .catch(error => {
                    this.setState(byPropKey('error', error));
                });

        }

    }

    onSignup(hasSignedUp) {
        if (hasSignedUp) {
            this.setState({ signedUp: hasSignedUp, waitingForSignup: false });
            //this.props.rerenderAppComp();
        }
        else {
            this.setState({ waitingForSignup: false });
        }
    }


    render() {
        if (this.state.signedUp) {
            console.log("should re-direct")
            return (<Redirect to='/' />);
        }
        // var linkToAccount = <Link className="Subtitle-1 underline" to="/signIn" style={{ textDecoration: 'none' }}>כניסה</Link>;
        const isInvalid =
            this.state.pass !== this.state.passconfirm ||
            this.state.pass === '' ||
            this.state.email === '' ||
            this.state.firstName === '' ||
            this.state.lastName === '' ||
            this.state.nickname === '';

        return (
            <div className="flex-box-center-container flex-horizontal-center" dir="rtl" >
                <div className="ib signup-container" dir="rtl" >
                    <h1 className="tac ib">הרשמה</h1>
                    <div className="row" dir="rtl" >
                        <p className="Subtitle-1 inline" dir="rtl" >משתמש רשום? </p>
                        <Link className="Subtitle-1 underline" to="/signin">פרופיל אישי</Link></div><br />
                    <form onSubmit={this.handleSubmit}>
                        {/* first name input */}
                        <div className="row" dir="rtl" >
                            <input id="first-name" type="text" dir="rtl" placeholder="שם פרטי" value={this.state.firstName} onChange={this.handleChange} required="required" />
                            <p className="error-text" dir="rtl" >{this.state.firstNameErrorMsg}</p>
                        </div>
                        {/* last name input */}
                        <div className="row" dir="rtl" >
                            <input id="last-name" type="text" dir="rtl" placeholder="שם משפחה" value={this.state.lastName} onChange={this.handleChange} required="required" />
                            <p className="error-text" dir="rtl" >{this.state.lastNameErrorMsg}</p>
                        </div>
                        {/* email input */}
                        <div className="row" dir="rtl" >
                            <input id="email" type="email" dir="rtl" placeholder="כתובת אימייל" value={this.state.email} onChange={this.handleChange} required="required" />
                            <p className="error-text" dir="rtl" >{''}</p>
                        </div>
                        {/* password input */}
                        <div className="row" dir="rtl" >
                            <input id="pass" type="password" dir="rtl" value={this.state.pass} onChange={this.handleChange} placeholder="סיסמה" required="required" />
                            <p className="error-text" dir="rtl" >{this.state.passErrorMsg}</p>
                        </div>
                        {/* confirm password input */}
                        <div className="row" dir="rtl" >
                            <input id="passconfirm" type="password" dir="rtl" value={this.state.passconfirm} onChange={this.handleChange} placeholder="אימות סיסמה" required="required" />
                            <p className="error-text" dir="rtl" >{this.state.passconfirmErrorMsg}</p>
                        </div>
                        {/* nickname input */}
                        <div className="row" dir="rtl" >
                            <input id="nickname" type="text" dir="rtl" placeholder="כינוי" value={this.state.nickname} onChange={this.handleChange} required="required" />
                            {/* <p className="error-text">{this.state.nicknameErrorMsg}</p> */}
                        </div>
                        <div className="row" dir="rtl" >
                            {!this.state.waitingForSignup ? <button className="submit-btn" disabled={this.isInvalid} type="submit">כניסה</button> : null}
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default SignUp;