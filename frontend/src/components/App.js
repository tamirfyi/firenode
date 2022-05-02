/* eslint-disable */
import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import styles from './App.module.css';
import Header from './UI/Header';
import SensorMap from './Map/SensorMap';
import SensorList from './Sensors/SensorList';
import LoadingInfo from './UI/LoadingInfo';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

function App() {
  const [location, setLocation] = useState(null);
  const [showMap, setShowMap] = useState();
  const [isStarting, setIsStarting] = useState(true);
  const [sensors, setSensors] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [readings, setReadings] = useState([]);
  const [axiosError, setAxiosError] = useState();
  const [open, setOpen] = useState(false);
  const [detected, setDetected] = useState([]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const promptRefresh = () => {
    setRefresh(!refresh);
  };

  const firenode = () => {
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  };

  const handleSuccess = (pos) => {
    const {latitude, longitude} = pos.coords;
    setLocation({
      lat: latitude,
      lng: longitude,
    });
    axios.get(`http://localhost:3010/sensor`).then((res) => {
      setSensors([...res.data]);
    });
    const timer = setTimeout(() => {
      setIsStarting(false);
      setShowMap(true);
    }, 500);
  };

  const handleError = (error) => {
    setError(error.message);
  };

  const changeShowMap = () => {
    setShowMap(!showMap);
  };

  const checkReadings = (readings) => {
    const detectedSensors = [];
    const currentTime = new Date();

    readings.forEach((reading) => {
      const readTime = new Date(reading.readTime);
      if (reading.temp >= 25 && currentTime - readTime <= 10000) {
        detectedSensors.push(reading.sensorId);
      }
      // } else if (reading.humid >= 20) {
      //   detectedSensors.push(reading.sensorId);
      // } else if (reading.co >= 5) {
      //   detectedSensors.push(reading.sensorId);
      // }
    });
    setDetected(detectedSensors);

    if (detectedSensors.length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const fetchLatestReadings = async () => {
    try {
      const latestReading = await axios
        .get(`http://localhost:3010/latestReading/`)
        .catch((err) => {
          setAxiosError(err);
        });
      setReadings(latestReading.data);
      checkReadings(latestReading.data);
    } catch (error) {
      setAxiosError(error);
    }
  };

  useEffect(() => {
    firenode();

    fetchLatestReadings();
    const interval = setInterval(() => {
      fetchLatestReadings();
    }, 5000);

    return () => clearInterval(interval);
  }, [refresh]);

  return (
    <div className={styles.app}>
      <Header hide={isStarting} show={showMap} toggleMap={changeShowMap} />
      {isStarting && <LoadingInfo />}
      {showMap === true && (
        <SensorMap show={showMap} center={location} activeSensors={sensors} />
      )}
      {showMap === false && <SensorList refresh={promptRefresh} />}
      {!isStarting && showMap && (
        <Stack spacing={2} sx={{width: '100%'}}>
          {open && (
            <Snackbar onClick={handleClose} open={open} autoHideDuration={20}>
              <Alert severity='error'>
                {detected.length < 2
                  ? `Sensor ${detected.sort().join('')} detects a fire!`
                  : `Sensors ${detected.sort().join(', ')} detect a fire!`}
              </Alert>
            </Snackbar>
          )}
        </Stack>
      )}
    </div>
  );
}

export default App;
