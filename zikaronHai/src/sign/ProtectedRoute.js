import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthConsumer } from './withAuthorization'
import {Menu} from '../components/Menu'

const NavigationAuth = () =>
    <div className="flex-box-center-container flex-horizontal-center">
      <p>isAuth</p>
    </div>

const NavigationNonAuth = () =>
    <div className="flex-box-center-container flex-horizontal-center">
         <p>not Auth</p>
    </div>

const ProtectedRoute = ({ component: Component, props, ...rest }) => (
  <AuthConsumer>
    {({ isAuth }) => (
        <div>
         {/* {(isAuth == true) ? <h1>TRUE</h1>:<h1>False</h1>} */}
        {/* {(isAuth === true) ? <Component {...props} /> : <Redirect to="../signin" />} */}
        {(isAuth === true) ? <Component {...props} /> : <Component {...props} />}
      {/* <Route
        render={ 
        // (isAuth == true) ? <Component {...props} /> :  <Redirect to="../signin" />
        }
        {...rest}
      /> */}
  
                    
      </div>
    )}
  </AuthConsumer>
)
const authCondition = (isAuth) => !isAuth;
export default ProtectedRoute
