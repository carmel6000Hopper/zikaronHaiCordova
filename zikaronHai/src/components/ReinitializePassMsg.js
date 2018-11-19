import React, { Component } from 'react';
import { auth } from '../firebase';

const sendRecoverMail = (email) => {
    auth.doPasswordReset(email);
}

export class ReinitializePassMsg extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div >
                    <p> {this.props.location.state.email} שלחנו הודעת איפוס סיסמה אל   </p>
                    <p> !כדי ליצור סיסמה חדשה, לחץ על הקישור הכלול בדואר האלקטרוני והקלד חדש: קל</p>
                    <p>לא קיבלת את האימייל? בדוק את דואר הזבל שלך או שלח לי עוד.</p>
                </div>
                <button onClick={() => auth.doPasswordReset(this.props.location.state.email)} >שלח לי שוב את הודעת האיפוס </button>
            </div>
        );
    }
}

export default ReinitializePassMsg;