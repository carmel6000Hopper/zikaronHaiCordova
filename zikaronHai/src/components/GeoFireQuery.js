// import { storage, dBRefImages } from '../firebase';
// import React, { Component } from 'react';

// // import { firebaseRef, geoFire } from './ImageUpload'

// export class GeoFireQuery extends Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             key: '',
//             location: ''
//         }
//     }

//     componentDidMount(){

//         console.log("componentDidMount is launched");
//         var geoQuery = this.props.geoFire.query({
//             center: [this.props.longitude, this.props.latitude],
//             // radius in kilometer
//             radius: 0.05
//         });
        
//         var onKeyEnteredRegistration = geoQuery.on("key_entered", (key, location) => {
//             console.log("location is " + location)
//             console.log(key + " entered the query. Hi " + key + "!");
//             //this.setState({key, location});
//             this.props.setKeyClosestImage(key);
//             this.props.setFindCloseLocationImage();
//             geoQuery.cancel();
//         });


//     }

//     render() {

//         return (<div/>);
 
//     }
// }
// export default GeoFireQuery;