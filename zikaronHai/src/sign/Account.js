import React from 'react';

import AuthUserContext from './AuthUserContext';
import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import { AuthConsumer } from './withAuthorization';
const AccountPage = () =>
  <AuthConsumer>
        {({ isAuth, login, logout }) => (
          <h1>in ACCOUNT PAGE</h1>
        )}
  </AuthConsumer>

export default AccountPage;