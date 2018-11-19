import React, { Component } from 'react';
import './App.css';
import { Main } from './Main.js'
// import {WelcomePage} from './components/WelcomePage.js'
//import {GoogleMapsContainer} from './components/NameLocation.js'

class App extends Component {
    render() {
        return (
            <div>
                <Main />
                {/* <WelcomePage/> */}
            </div>
        );
        //return <GoogleMapsContainer />
    }
}
export default App;