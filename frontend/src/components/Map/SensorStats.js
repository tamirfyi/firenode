import {useEffect} from 'react';
import styles from './SensorStats.module.css';

const SensorsStats = (props) => {
  // const [stats, setStats] = useState({});

  useEffect(() => {}, []);

  return (
    <div className={styles.sensorStats}>
      <div className={styles.statContainer}>
        <h3>Nodes (x)</h3>
        <div className={styles.statInfo}>
          <p>Base: x</p>
          <p>Sink: x</p>
          <p>Detection: x</p>
        </div>
      </div>
      <div className={styles.statContainer}>
        <h3>Threshold</h3>
        <div className={styles.statInfo}>
          <p>Temperature: x</p>
          <p>Humidity: x</p>
          <p>CO: x</p>
        </div>
      </div>
    </div>
  );
};

export default SensorsStats;
