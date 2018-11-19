import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { auth } from '../firebase';

const PasswordForgetPage = () =>
  <div>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});


const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE, hasSubmit: false , submitEmail :''};
  }

  onSubmit = (event) => {
    const { email } = this.state;
    auth.doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE, hasSubmit: true , submitEmail:email });
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });
    event.preventDefault();

  }

  render() {
    const {
      email,
      error,
    } = this.state;

    const isInvalid = email === '';

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            value={this.state.email}
            onChange={event => this.setState(byPropKey('email', event.target.value))}
            type="text"
            placeholder="Email Address" />
          <button disabled={isInvalid} type="submit">
            Reset My Password
        </button>

          {error && <p>{error.message}</p>}
        </form>
        <div> {this.state.hasSubmit === true ? <Redirect
          to={{
            pathname: "/reinitializepassmsg",
            state: {email : this.state.submitEmail}

          }}
        />
          : null} </div>
      </div>
    );
  }
}


export default PasswordForgetPage;

export {
  PasswordForgetForm
};
