import React, { Component } from 'react';
import './App.css';
import { auth, firebase } from './firebase';

// import components 
import { UploadHandler } from './components/UploadHandler'
// import { Camera } from './components/Camera.js';
import { Camera } from './components/TryCordovaCamera.js';
import { Switch, Route, BrowserRouter, HashRouter } from 'react-router-dom';
// import { DisplayMapOnScreen } from './components/Location.js';
import { LocationGPS } from './components/LocationGPS.js';
import {ReinitializePassMsg} from './components/ReinitializePassMsg.js'
import { Menu } from './components/Menu.js';
import { GPS } from './components/GPS.js';
import Navigation from './sign/Navigation.js';
import { SignUp } from './sign/SignUp';
import { SignIn } from './sign/SignIn';
import { SignOut } from './sign/SignOut';
import AccountPage from './sign/Account';
import { AuthProvider } from './sign/withAuthorization'
// import images
import carmelLogo from './images/carmel6000logo.jfif'
import { PasswordForgetForm } from './sign/PasswordForget';
import ProtectedRoute from './sign/ProtectedRoute';
import ImageInfoPage from './components/ImageInfo';
import FixSignTitlePage from './components/FixSignTitlePage';

export class Main extends Component {
  constructor(props) {
    super(props)
    this.state = ({
      finishTakingPictures: false,
      locationUserConfirmation: false,
      authUser: null,
      longitude: 0,
      latitude: 0,
      imageUrlArray: [],
      marginRight: "0px"
    });

    this.updateLocation = this.updateLocation.bind(this);
    this.gps = new GPS(this.updateLocation);
    this.finishTakingPicturesFunc = this.finishTakingPicturesFunc.bind(this);
    this.updateAuthUser = this.updateAuthUser.bind(this);
    console.log("Main componenet constructor updatelocation ", this.updateLocation)
  }

  updateLocation(latitude, longitude) {
    console.log("update location " + latitude + " " + longitude)
    this.setState({ latitude, longitude })
  }

  finishTakingPicturesFunc(imageUrlArray) {
    this.setState({ finishTakingPictures: true }, () => {
      console.log("this.state.finishTakingPictures", this.state.finishTakingPictures)
      console.log("dataUrl: ", imageUrlArray);
      this.setState({ imageUrlArray }, () => {
        console.log("this.state.imageUrlArray: ", this.state.imageUrlArray);
      })
    })
  }
  updateAuthUser() {
    firebase.auth().onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }
  componentDidMount() {
    console.log("componentDidMount Main - update authuser")
    this.updateAuthUser();
    // gps start
    this.gps.startWatchingPosition();
  }
  render() {
    return (
      <div className="App">
        <AuthProvider >
          <HashRouter>
          {/* <BrowserRouter> */}
            <Switch>
              <Route exact path="/" render={(props) =>
                (<div>
                  <Menu {...props} path="/"/>
                  <Navigation authUser={this.state.authUser} />
                </div>)} />

              {/* <ProtectedRoute exact path="/camera"
                component ={(props) =>
                  (<div>
                    <Menu {...props} />
                    <Camera {...props}
                      authUser={this.state.authUser}
                      finishTakingPicturesFunc={this.finishTakingPicturesFunc}
                      marginRight={this.state.marginRight}
                    />
                  </div>)} /> */}
                  
              <ProtectedRoute exact path="/camera"
                component ={(props) =>
                  (<div>
                    <Menu {...props} />
                    <Camera {...props}/>
                     {/* <Camera {...props} */}
                      {/* // authUser={this.state.authUser}
                    /> */}
                  </div>)} />
              <ProtectedRoute exact path="/upload" component ={(props) => (<div>
                    <Menu {...props} />
                    <UploadHandler {...props} 
                      imageUrlArray={this.state.imageUrlArray}
                      authUser={this.state.authUser}
                      longitude={this.state.longitude}
                      latitude={this.state.latitude} />
                  </div>)}  />}
                
              <Route exact path="/gps" render={(props) =>
                (<div>
                  <Menu {...props} />
                  <LocationGPS {...props}
                    longitude={this.state.longitude}
                    latitude={this.state.latitude} />
                </div>)} />
              <ProtectedRoute exact path="/imageinfo" component={(props) =>
              (<div>
                <Menu {...props} />
                <ImageInfoPage {...props}/>
              </div>)} />
     
              <Route exact path="/forgetpass" render={(props) =>
                (<div>
                  <Menu {...props} />
                  <PasswordForgetForm  {...props} />
                </div>)} />

              <Route exact path="/signup" render={(props) =>
                (<div>
                  {/* <Menu {...props} /> */}
                  <SignUp  {...props} />
                </div>)} />
              <ProtectedRoute exact path="/account" component={(props) =>
                (<div>
                  <Menu {...props} />
                  <AccountPage  {...props} />
                </div>)} />
                <ProtectedRoute exact path="/fixtitle" component={(props) =>
                (<div>
                  <Menu {...props} />
                  <FixSignTitlePage  {...props} />
                </div>)} />
              <Route exact path="/signin" render={(props) =>
                (<div>
                  {/* <Menu {...props} /> */}
                  <SignIn {...props} />
                  {/* updateAuthUser = {this.updateAuthUser}/> */}
                </div>)} />
                <Route exact path="/reinitializepassmsg" render={(props) =>
                (<div>
                  <Menu {...props} />
                  <ReinitializePassMsg {...props} />
                  {/* updateAuthUser = {this.updateAuthUser}/> */}
                </div>)} />
              <ProtectedRoute exact path="/signout" component={(props) =>
                (<div>
                  <Menu {...props} />
                  <SignOut  {...props} />
                </div>)} />
            </Switch>
            
          
          </HashRouter>
          {/* </BrowserRouter> */}

          <br /> <br />
          <img id="carmelLogo" src={carmelLogo} height="60" alt="carmel 6000 logo" />
        </AuthProvider>
      </div>

    );
  }
}

export default Main;