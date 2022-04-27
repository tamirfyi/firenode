/* eslint-disable */
import styles from './SensorMap.module.css';
import {GoogleApiWrapper, InfoWindow, Map, Marker} from 'google-maps-react';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

const SensorMap = (props) => {
  const [selectedMarker, setSelectedMarker] = useState({});
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [reading, setReading] = useState({});
  const [axiosError, setAxiosError] = useState();

  const containerStyle = {
    width: '95%',
    height: '80%',
  };

  const onMapClick = (props) => {
    if (showingInfoWindow) {
      setShowingInfoWindow(false);
    }
  };

  const onMarkerClick = (props, marker, e) => {
    setSelectedMarker(marker);
    setIsLoaded(null);
    if (props.type === 'D') {
      axios
        .get(`http://localhost:3010/latestReading/${marker.title}`)
        .then((res) => {
          setIsLoaded(true);
          setReading(res.data[0]);
        })
        .catch((err) => {
          setIsLoaded(false);
          setAxiosError(err);
        });
    }

    setShowingInfoWindow(true);
  };

  const assignName = (sensorType) => {
    if (sensorType === 'D') return 'Detection';
    else if (sensorType === 'S') return 'Sink';
    else if (sensorType === 'B') return 'Base';
  };

  const assignIcon = (sensorType) => {
    if (sensorType === 'B') {
      return {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: '#ff0025',
        fillOpacity: 1.0,
        strokeWeight: 2,
        strokeOpacity: 1,
        strokeColor: '#b9132c',
        scale: 10,
      };
    } else if (sensorType === 'S') {
      return {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: '#003eff',
        fillOpacity: 1.0,
        strokeWeight: 2,
        strokeOpacity: 1,
        strokeColor: '#0b3cbf',
        scale: 10,
      };
    } else if (sensorType === 'D') {
      return {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: '#ffff00',
        fillOpacity: 1.0,
        strokeWeight: 2,
        strokeOpacity: 1,
        strokeColor: '#ccc600',
        scale: 10,
      };
    }
  };

  const readingData =
    isLoaded === true ? (
      <React.Fragment>
        <p>Latest Reading: {reading.readTime}</p>
        <p>Temperature: {reading.temp} °C</p>
        <p>Humidity: {reading.humid}% RH</p>
        <p>CO: {reading.temp}ppm</p>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <br></br>
        <div>Could not retrieve latest reading...</div>
      </React.Fragment>
    );

  return (
    <div className={styles.mapContainer}>
      <Map
        google={props.google}
        containerStyle={containerStyle}
        zoom={14}
        onClick={onMapClick}
        initialCenter={{
          // lat: props.center.lat,
          // lng: props.center.lng,
          lat: 37,
          lng: -122.06,
        }}
      >
        {props.activeSensors.map((sensor) => {
          return (
            <Marker
              key={sensor.id}
              title={`${sensor.id}`}
              name={assignName(sensor.sensorType)}
              position={{lat: sensor.xPos, lng: sensor.yPos}}
              type={sensor.sensorType}
              onClick={onMarkerClick}
              icon={assignIcon(sensor.sensorType)}
            />
          );
        })}
        <InfoWindow visible={showingInfoWindow} marker={selectedMarker}>
          <div className={styles.infoWindowText}>
            <p>Sensor ID: {selectedMarker.title}</p>
            <p>Sensor Type: {selectedMarker.name}</p>
            {selectedMarker.name === 'Detection' && readingData}
          </div>
        </InfoWindow>
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: '',
})(SensorMap);
