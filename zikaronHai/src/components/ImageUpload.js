import React, { Component } from 'react';
import { storage, dBRefImages, fbData, firebase } from '../firebase';
import dataURItoBlob from '../helpFunction'

import { style, styleCount } from './ImageStyle'
// WARNING - not thread safe
var imageCounter = 0;

export class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.handleUpload = this.handleUpload.bind(this);
    this.uploadImagesToDb = this.uploadImagesToDb.bind(this);
  }
  uploadImagesToDb(imageUrl, gps) {
    console.log("uploadImagesToDb");
    console.log("image Url is " + imageUrl);
    var imageInfos = {};
    // TODO : ADD AUTH
    //imageInfos['userId'] = isUserSignedIn() ? firebase.auth().currentUser.uid : "no-uid";
    imageInfos['userId'] = "no-uid";
    imageInfos['gps_longitude'] = this.props.longitude;
    imageInfos['gps_latitude'] = this.props.latitude;
    imageInfos['name'] = 'name';
    const uploadToDb = dBRefImages.push(
      imageInfos, function onComplete(err) {
        if (err) {
          alert("uploadImageInfosToDB: push failed with " + err);
        } else {
          console.log("uploadImageInfosToDB: done");
        }
      });
    var dbKey = uploadToDb.key;
    console.log("dbKey is " + dbKey);
    //upload to geofire - such that we will be able to retrieve data from specific radius
    this.props.geoFire.set("geoFire_images" + dbKey, [this.props.longitude, this.props.latitude]).then(function () {
      console.log("Provided key has been added to GeoFire");
    }, function (error) {
      console.log("Error: " + error);
    });
    // TODO check if not necessary to write 
    return dbKey;

  }

  handleUpload() {
    console.log("HERE - HANDLE UPLOAD");
    const urlArr = this.props.imageUrlArray;
    console.log("url is " + urlArr);
    console.log("url length is " + urlArr.length);
    for (var i = 0; i < urlArr.length; i++) {
      console.log("in loop");
      var blob = dataURItoBlob(urlArr[i]);
      console.log("blob " + blob);
      var key = this.uploadImagesToDb(urlArr[i], 0);
      console.log("key is " + key);
      storage.ref(`images/${key}`).put(blob).then(function (snapshot) {
        console.log('Uploaded an array!');
        imageCounter++;
      });
    }
  }

  render() {

    return (
      <div style={style} >
        מתעדים את שלטי המורשת
      <br /><br />
        <br />
        <button onClick={this.handleUpload}>upload</button>
        <br />
        <div style={styleCount} className="counter" ><h2>עד כה צולמו {imageCounter} שלטים</h2></div>
        <br />
        <button onClick={() => { this.props.history.push('/') }} >back</button>

      </div>
    )
  }
}


export default ImageUpload;


