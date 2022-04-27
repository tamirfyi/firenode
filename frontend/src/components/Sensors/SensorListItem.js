/* eslint-disable */

import styles from './SensorListItem.module.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';

const SensorListItem = (props) => {
  const [reading, setReading] = useState({});
  const [noReading, setNoReading] = useState(true);
  const [axiosError, setAxiosError] = useState(undefined);

  const fetchLatestReading = async () => {
    if (props.info.sensorType === 'D') {
      try {
        const latestReading = await axios
          .get(`http://localhost:3010/latestReading/${props.info.id}`)
          .catch((err) => {
            setAxiosError(err);
          });
        setNoReading(false);
        setReading(latestReading.data[0]);
        console.log(latestReading.data[0]);
      } catch (error) {
        setNoReading(true);
      }
    }
  };

  useEffect(() => {
    fetchLatestReading();

    const interval = setInterval(() => {
      fetchLatestReading();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  let readingContent = noReading ? (
    <p>Retrieving latest reading...</p>
  ) : (
    <div>
      <div className={styles.itemReading}>
        <p>Temp: {reading.temp}°C</p>
        <p>Humidity: {reading.humid}% RF</p>
        <p>CO: {reading.co}ppm</p>
      </div>
      <div className={styles.readTime}>
        <p>Latest Reading: {reading.readTime}</p>
      </div>
    </div>
  );

  return (
    <div className={`${styles.container}`}>
      <div className={styles.itemHeader}>
        <p>Node {props.info.id} </p>
        <p className={styles.coords}>
          ({props.info.xPos}°, {props.info.yPos}°)
        </p>
      </div>
      {props.info.sensorType === 'D' ? readingContent : ''}
    </div>
  );
};

export default SensorListItem;
