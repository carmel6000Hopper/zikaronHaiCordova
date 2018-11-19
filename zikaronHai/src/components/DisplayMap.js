import React from 'react'
import { compose, withProps, componentFromProp } from "recompose"
import { MapWithAMarker, withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
// import mapSign from '../images/locationSign.png';
// import yourLocation from '../images/map-placeholder.png';
import yourLocation from '../images/map-marker.png';
import mapSign from '../images/map-markers-signs.png';

// --------------OLD CODE -------------------------------------------

// TO DO check https://hackernoon.com/the-easiest-way-by-far-to-build-a-real-react-firebase-web-app-5dc6fa6f1b61

export const DisplayMapOnScreen = compose(
  withProps({
    //אישור להשתמש בגוגל מפות api
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCOkNwkwX1xa59m94TYXKXzmBYBnhQZCGE&callback=initMap",
    loadingElement: <div style={{ height: `100%` }} />,
    //map size on screen
    containerElement: <div style={{ height: `400px` }} />,
    //כמה מהפיקסלים יתפוס המפה
    mapElement: <div style={{ height: `100%` }} />,
  }),
  // --------------------------
  withScriptjs,
  // --------------------------
  withGoogleMap
)

  ((props) => {
    return (
      <div>
        <GoogleMap
          defaultZoom={7}
          // defaultCenter={{ lat:32.6, lng: 35 }} >
          defaultCenter={{ lat: { ...props }.latitude, lng: { ...props }.longitude }} >
          


          {/* ---------------------Your location Marker--------------------------------- */}
          <Marker
            position={{
              lat: { ...props }.latitude,
              lng: { ...props }.longitude
            }}
            onClick={(place) => props.onMarkerClicked("jerusalem")}
            // className="marker-style"
            icon={yourLocation}
          />

          {/* ------------------- diferent location Marker--------------------------------------- */}
          { props.markersPlace != [] ? 
            props.markersPlace.map((pos) => <Marker
            // position={{ lat: pos.lat.toString(), lng: pos.lng.toString()}}
            position={{ lat: pos.lat, lng: pos.lng}}
            onClick={() => props.onMarkerClicked(pos.placeKey, pos.placeName, pos.userId)}
            icon={mapSign}
            // icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            className="map-sign"
          /> )
        : null}
        </GoogleMap>

      </div>
    )
  }

  );

export default DisplayMapOnScreen;

// -------------------------------END----------------------------------------

