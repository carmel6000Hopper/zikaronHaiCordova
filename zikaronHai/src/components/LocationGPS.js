import { DisplayMapOnScreen } from "./DisplayMap"
import React, { Component } from 'react';
import { stat } from "fs";
import { dBRefImages, firebase } from '../firebase'

export class LocationGPS extends Component {
    constructor(props) {
        super(props);
        this.state = {
            outputPlace: "",
            userIdUpload: "",
            imagePlaceSrc: "",
            currPlaceName: "",
            markersPlace: [],

        }
    }

    componentDidMount() {
        this.getPlacesCoordinates();
    }

    getPlacesCoordinates = () => {
        const fbD = firebase.database();
        const dBRefI = fbD.ref();
        var Places = this.state.markersPlace.slice();
        dBRefI.once('value', (snapshot) => {
            var images = snapshot.val().images;
            let imagesValues = Object.values(images);
            let keys = Object.keys(images)
            var i = 0
            imagesValues.map((image) =>
                Places.push({ lng: image.gps_longitude, lat: image.gps_latitude, placeKey: keys[i], placeName: image.name, userId: image.userId },
                    i = i + 1)
            )

            this.setState({ markersPlace: Places })
        });
        dBRefImages.off("value");
    }


    // onMarkerClicked get the placeKey and the placeName
    // change the state to the marker information (imagePlaceSrc and placeName) from the fire base
    onMarkerClicked = (placeKey, placeName, userId) => {
        let outputPlace = this.state.outputPlace;
        let imagePlaceSrc = this.state.imagePlaceSrc;
        let currPlaceName = this.state.currPlaceName;
        let currPlaceKey = this.state.currPlaceKey;
        let userIdUpload = this.state.userIdUpload;
        if (currPlaceKey !== placeKey) {
            outputPlace = "Place name: " + placeName;
            this.getPlaceImage(placeKey);
            currPlaceKey = placeKey;
            currPlaceName = placeName;
            userIdUpload = userId;
            console.log("user name is: ", userId)
            console.log("cuurent place is: ", currPlaceName);
            this.setState({ outputPlace: outputPlace });
            this.setState({ currPlaceKey: currPlaceKey });
            this.setState({userIdUpload: userIdUpload});
            // this.setState({ currPlaceName: currPlaceName });
        }
        else {
            outputPlace = "";
            imagePlaceSrc = "";
            currPlaceName = "";
            userIdUpload = "";
            console.log("cuurent place is: ", currPlaceName);
            this.setState({ outputPlace: outputPlace });
            this.setState({ imagePlaceSrc: imagePlaceSrc });
            this.setState({ currPlaceName: currPlaceName });
            this.setState({userIdUpload: userIdUpload});
        }

        console.log("img src: ", this.state.imagePlaceSrc);
    }


    getPlaceImage = (key) => {
        const stor = firebase.storage();
        const storRef = stor.ref('images/' + key);
        storRef.getDownloadURL().then( (url) => {
            this.setState({ imagePlaceSrc: url })
          }).catch(function(error) {
            console.log(error)
          })
    }
    


    

    render() {
        return (
            <div>
                <DisplayMapOnScreen
                    longitude={this.props.longitude}
                    latitude={this.props.latitude}
                    onMarkerClicked={this.onMarkerClicked}
                    markersPlace={this.state.markersPlace}
                />
                {this.state.imagePlaceSrc === "" ?
                    <div></div>
                    :
                    <div>
                        <h3>{this.state.outputPlace}</h3>
                        <h3>Upload by: {this.state.userIdUpload}</h3>
                        {/* <h3>{this.state.imagePlaceSrc}</h3> */}
                        <img src={this.state.imagePlaceSrc}></img>
                    </div>}
        
            </div>
        );
    }
}

export default LocationGPS;