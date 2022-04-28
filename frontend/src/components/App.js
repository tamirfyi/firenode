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
import MapStats from './Map/MapStats';

/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

function App() {
  const [error, setError] = useState();
  const [location, setLocation] = useState(null);
  const [showMap, setShowMap] = useState();
  const [isStarting, setIsStarting] = useState(true);
  const [sensors, setSensors] = useState([]);
  const [threshold, setThreshold] = useState({
    temp: 50,
    humid: 20,
    co: 10,
  });
  const [tolerance, setTolerance] = useState({
    temp: 25,
    humid: 10,
    co: 5,
  });
  const [refresh, setRefresh] = useState(false);
  const [readings, setReadings] = useState([]);
  const [axiosError, setAxiosError] = useState();
  const [open, setOpen] = React.useState(true);
  const [warnSensors, setWarnSensors] = useState([]);
  const [fireSensors, setFireSensors] = useState([]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const promptRefresh = () => {
    setRefresh(!refresh);
  };

  const saveThresholdHandler = (temp, humid, co) => {
    setThreshold({
      temp: temp,
      humid: humid,
      co: co,
    });
  };

  const saveToleranceHandler = (temp, humid, co) => {
    setThreshold({
      temp: temp,
      humid: humid,
      co: co,
    });
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
    // const timer = setTimeout(() => {
    //   intro();
    // }, 500);
    setIsStarting(false);
    setShowMap(true);
  };

  const handleError = (error) => {
    setError(error.message);
  };

  const changeShowMap = () => {
    setShowMap(!showMap);
  };

  const checkReadings = (readings) => {
    const warning = [];
    const urgent = [];
    readings.forEach((reading) => {
      if (
        reading.co >= threshold.co ||
        reading.temp >= threshold.temp ||
        reading.humid >= threshold.co
      ) {
        urgent.push(reading.sensorId);
      } else if (
        reading.co >= tolerance.co ||
        reading.temp >= tolerance.temp ||
        reading.humid >= tolerance.co
      ) {
        warning.push(reading.sensorId);
      }
    });

    setWarnSensors(warning);
    setFireSensors(urgent);
    if (urgent.length > 0 || warning.length > 0) {
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

      console.log(latestReading.data);

      checkReadings(latestReading.data);
    } catch (error) {}
  };

  useEffect(() => {
    firenode();

    fetchLatestReadings();
    const interval = setInterval(() => {
      fetchLatestReadings();
    }, 10000);

    return () => clearInterval(interval);
  }, [refresh]);

  return (
    <div className={styles.app}>
      <Header hide={isStarting} show={showMap} toggleMap={changeShowMap} />
      {isStarting && <LoadingInfo />}
      {showMap && <MapStats/>}
      {showMap === true && (
        <SensorMap center={location} activeSensors={sensors} />
      )}
      {showMap === false && (
        <SensorList
          refresh={promptRefresh}
          saveThreshold={saveThresholdHandler}
          saveTolerance={saveToleranceHandler}
          thresholdValues={threshold}
          toleranceValues={tolerance}
        />
      )}
      {!isStarting && showMap && (
        <Stack spacing={2} sx={{width: '100%'}}>
          {warnSensors.length > 0 && (
            <Snackbar onClick={handleClose} open={open} autoHideDuration={20}>
              <Alert severity='warning'>
                {warnSensors.length < 2
                  ? `Sensor ${warnSensors
                      .sort()
                      .join('')} is approaching a fire!`
                  : `Sensors ${warnSensors
                      .sort()
                      .join(', ')} are approaching a fire!`}
              </Alert>
            </Snackbar>
          )}
          {fireSensors.length > 0 && (
            <Snackbar onClick={handleClose} open={open} autoHideDuration={20}>
              <Alert severity='error'>
                {fireSensors.length < 2
                  ? `Sensor ${fireSensors.sort().join('')} detects a fire!`
                  : `Sensors ${fireSensors.sort().join(', ')} detect a fire!`}
              </Alert>
            </Snackbar>
          )}
        </Stack>
      )}
    </div>
  );
}

export default App;
