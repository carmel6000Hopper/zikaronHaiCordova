

// import firebase from '../services/FireBaseSingleToned';
import firebase from 'firebase/app';


export const Auth = {

    _isAuthenticated: false,

    isAuthenticated() {

        let pCode = localStorage.getItem('pinCode');
        this._isAuthenticated = pCode !== null;
        return this._isAuthenticated;

    },

    authenticate(pinCode, cb) {


        let db = firebase.database();

        db.ref('Experiments/').once('value', (snapshot) => {

            if (snapshot.hasChild(pinCode)) {

                console.log('pin valid');

                localStorage.setItem("pinCode", pinCode);

                return cb(true);

            } else {
                return cb(false);
            }
        });
    },
    logout(cb) {

        localStorage.removeItem('pinCode', '');
        this._isAuthenticated = false;
        return cb();

    },
    getPin() {
        return localStorage.getItem("pinCode");
    }

}

export default Auth;