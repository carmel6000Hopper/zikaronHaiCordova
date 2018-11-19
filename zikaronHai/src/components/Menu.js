import React, { Component } from 'react';
import { Link, BrowserRouter as Route } from 'react-router-dom';

import { AuthConsumer } from '../sign/withAuthorization'
import './Menu.css';
// import {menuSign} from '../images/list-menu (1).png'


import menuExitBtn from '../images/menu-exit.png'

export class Menu extends Component {

    constructor(props) {
        super(props);
        this.navSignedInRef = React.createRef();
        this.navVisitorRef = React.createRef();
    }

    openNav = (navRef) => {
        console.log("open Nav");
        navRef.current.style.width = "100%";
    }

    closeNav = (navRef) => {
        console.log("close Nav");
        navRef.current.style.width = "0";
    }
    MenuSignedIn = () => 

        <div ref={this.navSignedInRef} id="mySidebar" className="sidebar">
            {/* <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>×</a> */}
            {/* <img src={x} href="javascript:void(0)" className="closebtn" onClick={this.closeNav} /> */}
            <a href="javascript:void(0)" className="container-closebtn" onClick={() => this.closeNav(this.navSignedInRef)}>
                <img src={menuExitBtn} className="closebtn" alt="close-btn" />
            </a>

            
            <div className="a-container">
                <Link to={'/camera'} onClick={() => this.closeNav(this.navSignedInRef)}>הוספת שלט</Link>
                <Link to={'/upload'} onClick={() => this.closeNav(this.navSignedInRef)}>upload</Link>
                <a>אודות</a>
                <Link to={'/gps'} onClick={() => this.closeNav(this.navSignedInRef)}>מפה</Link>
                <Link to={'/imageinfo'} onClick={() => this.closeNav(this.navVisitorRef)}>מידע על התמונה </Link>
                <Link to={'/account'} onClick={() => this.closeNav(this.navSignedInRef)}>פרופיל אישי</Link>
                <Link to={'/signout'} onClick={() => this.closeNav(this.navSignedInRef)}>התנתק</Link>
            </div>
        </div>

    MenuVisitor = () =>
        <div ref={this.navVisitorRef} id="mySidebar" className="sidebar">
            {/* <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>×</a> */}
            {/* <img src={x} href="javascript:void(0)" className="closebtn" onClick={this.closeNav} /> */}
            <a href="javascript:void(0)" onClick={() => this.closeNav(this.navVisitorRef)}>
                <img src={menuExitBtn} className="closebtn" alt="close-btn" />
            </a>
            <div className="a-container">
                <a>אודות</a>
                
                <Link to={'/signin'} onClick={() => this.closeNav(this.navVisitorRef)}>כניסה כמשתמש</Link>
                <Link to={'/gps'} onClick={() => this.closeNav(this.navVisitorRef)}>מפה</Link>
            </div>
        </div>


    render() {
        return (
            <div>
                <AuthConsumer>
                   {({isAuth}) =>( isAuth === true ?
                        // <p>IS AUTh</p> : <p>IS not AUTH</p>
                        (<div > <this.MenuSignedIn />
                            <div id="main" className="openbtn" onClick={() => this.openNav(this.navSignedInRef)}>זכרון חי ☰</div>
                        </div>)
                        : (<div > <this.MenuVisitor />
                            <div id="main" className="openbtn" onClick={() => this.openNav(this.navVisitorRef)}>זכרון חי ☰</div>
                        </div>)
                    ) }
                </AuthConsumer>
                {/* <div id="main" className="openbtn" onClick={this.openNav}>☰</div> */}
              {/* // <div id="main" className="openbtn" onClick={this.openNav}>{menuSign}</div>  */}
            {/* // <div className="openbtn" onClick={this.openNav}>☰</div>  */}
               </div>

            
        );

    }
}
export default Menu;