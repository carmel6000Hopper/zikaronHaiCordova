import React, { Component } from 'react';
import AuthUserContext from '../sign/AuthUserContext';
import { AuthConsumer } from '../sign/withAuthorization';

import { firebase } from '../firebase';
import "./Camera.css";
import { CanvasArr } from './CanvasArr'


export class Camera extends Component {
  static CANVAS_WIDTH = 160;
  static CANVAS_HEIGHT = 120;
  constructor(props) {
    super(props);
    this.state = {
      canList: [],
      video: '',
      hasToAddCanvas: false,
      //cameraMode: true,
      authUser: ''
    };

    this.cameraRef = React.createRef();
    this.canvasRef = React.createRef();
    this.canvasArrRef = React.createRef();
    this.addSnapOnCanvas = this.addSnapOnCanvas.bind(this);
    this.hasAddedCanvas = this.hasAddedCanvas.bind(this);
  }

  hasAddedCanvas() {
    this.setState({ hasToAddCanvas: false });
  }

  setNavBarIsOpened() {
    document.getElementById("cam-container").style.marginRight = "250px";
  }

  setNavBarIsClosed() {
    document.getElementById("cam-container").style.marginRight = "0";
  }

  /** this function calls the the addCanvashandler when the snap-photo button is clicked */
  addSnapOnCanvas() {
    this.setState({ hasToAddCanvas: true }, () => { this.canvasArrRef.current.addCanvasHandler() });
  }
  // afterCameraRendering() {
  //   this.actualizeVideo();
  // }
  notAuthorized() {
    console.log("in if (!authCondition(authUser))");
    this.props.history.push('./signin');
  }

  // CameraRender = () =>
  //   <div>
  //       <div id="cam-container">
  //         <div id="video-border">
  //           <video id="video" autoPlay></video>
  //           <div className="container"></div>
  //           <button id="snap" onClick={this.addSnapOnCanvas}></button>
  //         </div>
  //         <button id="finishButton" onClick={this.onFinish} >Finish</button>
  //         <br /><br />
  //         <button onClick={() => { this.props.history.push('/') }} >back</button>
  //         <label id="resultURL"></label>
  //       </div>
  //     <CanvasArr
  //       hasToAddCanvas={this.state.hasToAddCanvas}
  //       hasAddedCanvas={this.hasAddedCanvas}
  //       changeCameraMode={this.changeCameraMode}
  //       ref={this.CanvasArrRef}
  //       video={this.state.video}
  //     />
  //     {this.afterCameraRendering()}
  //   </div>

  actualizeVideo = () => {
    if (this.state.cameraMode) {

      console.log("in component did mount - actualize video");

      let video = this.cameraRef.current;
      console.log("this.cameraRef.current: ", this.cameraRef.current);

      // gets the video from the camera of the device - DOESN'T WORK ON PHONE!!!!
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        video.src = window.URL.createObjectURL(stream);
        video.play();
        this.setState({ video }, () => {
          console.log('Camera.js: this.state.video: ', this.state.video);
        });
      })
    }
  }

  onFinish = () => {
    var URLArray = [];

    // save url of the canvas in url array
    for (var i = 0; i < this.state.canList.length; i++) {
      console.log("this.state.canList[i]" + this.state.canList[i].elem.ref.current)
      var dataURL = this.state.canList[i].elem.ref.current.toDataURL();
      console.log("dataURL" + dataURL);
      URLArray.push(dataURL);
    }

    console.log("on finish this.props" + this.props);
    this.props.finishTakingPicturesFunc(URLArray);

    // router - go to the next page - upload Handler
    this.props.history.push('/upload');
  }
  changeCameraMode = (flag) => {
    this.setState({ cameraMode: flag }, this.actualizeVideo);
  }
  render() {
    return (
      <div>
        {this.state.cameraMode ?
          <div id="cam-container">
            <div id="video-border">
              <video ref={this.cameraRef} id="video" autoPlay></video>
              <div className="container"></div>
              <button id="snap" onClick={this.addSnapOnCanvas}></button>
            </div>
            <button id="finishButton" onClick={this.onFinish} >Finish</button>
            <br /><br />
            <button onClick={() => { this.props.history.push('/') }} >back</button>
            <label id="resultURL"></label>
          </div>
          : null}

        <CanvasArr
          hasToAddCanvas={this.state.hasToAddCanvas}
          hasAddedCanvas={this.hasAddedCanvas}
          changeCameraMode={this.changeCameraMode}
          ref={this.canvasArrRef}
          video={this.state.video}
        />

      </div>
      // <this.CameraRender />
    );
 
  }
}
export default Camera;