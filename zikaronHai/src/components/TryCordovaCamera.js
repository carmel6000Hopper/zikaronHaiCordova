import React, { Component } from 'react';
// import iconCamera from './images/iconCamera.png';

export class Camera extends Component {
    constructor(props) {
        super(props);
        
        this.state = ({
            imageUrl: ""
        });

        this.cameraTakePicture = this.cameraTakePicture.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onFail = this.onFail.bind(this);
    }
    onSuccess(imageData) {
        this.setState({imageUrl: imageData}, () => {
            console.log("onSuccess: this.state.imageUrl: ", this.state.imageUrl);
        });
    }
    onFail(message) {
        alert('Failed because: ' + message);
    }
    cameraTakePicture() {
        console.log(navigator.camera);
        navigator.camera.getPicture(this.onSuccess, this.onFail, {
            quality: 50,
            //check why it was Camera and not navigator.camera
            destinationType: navigator.camera.DestinationType.FILE_URI,
            saveToPhotoAlbum : true,
            mediaType : navigator.camera.MediaType.ALLMEDIA,
            correctOrientation: true
        });
    }
   
    render() {
        return (
            <div className="take-photo-div">
                {this.cameraTakePicture()}
                <button id="take-photo-btn" onClick = {() => {this.cameraTakePicture()}}>TAKE PHOTO</button>
                <img src={this.state.imageUrl} alt="place image" width="100" height="auto"></img>
            </div> 
        );
    }
}