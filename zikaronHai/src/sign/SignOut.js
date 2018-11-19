import { Route, Redirect } from 'react-router-dom'
import React, { Component } from 'react';

import { auth } from '../firebase';
import {AuthConsumer}  from './withAuthorization';

export class SignOut extends Component {
    constructor(props) {
        super(props);
        this.goToSignIn = this.goToSignIn.bind(this);
    }
    goToSignIn() {
        this.props.history.push('./signin');
    }
    render() {
        return (
            <AuthConsumer>
                {({ isAuth, logout }) => (
                    <div>
                        <button
                            type="button"
                            onClick={logout} >
                            Sign Out </button>
                        <div> {isAuth === true ? null: (<Redirect to='/signin'/>) }</div>
                    </div>
                )}

            </AuthConsumer>

        );
    }
}

export default SignOut;