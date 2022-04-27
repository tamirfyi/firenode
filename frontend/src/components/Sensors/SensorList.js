import styles from './SensorList.module.css';
import React, {useState, useEffect} from 'react';
import SensorListItem from './SensorListItem';
import axios from 'axios';
import NewSensorItem from './NewSensorItem';
import ThresholdMenu from './ThresholdMenu';

const SensorList = (props) => {
  // const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [sensors, setSensors] = useState([]);
  const [filter, setFilter] = useState('A');
  const [isAdding, setIsAdding] = useState(false);
  const [editThreshold, setEditThreshold] = useState(false);

  const changeFilterHandler = (event) => {
    setFilter(event.target.value);
  };

  const onAddingHandler = () => {
    setEditThreshold(false);
    setIsAdding(true);
  };
  const onStopAddingHandler = () => setIsAdding(false);

  const editThresholdHandler = () => {
    setIsAdding(false);
    setEditThreshold(true);
  };
  const onStopEditThresholdHandler = () => {
    setEditThreshold(false);
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:3010/sensor${
          filter !== 'A' ? `?sensorType=${filter}` : ''
        }`,
      )
      .then((res) => {
        setIsLoaded(true);
        setSensors([...res.data]);
      });
  }, [filter, isAdding]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Active Nodes</h3>
        <div>
          <button onClick={editThresholdHandler} className={styles.editThresh}>
            Edit Threshold
          </button>
          <button onClick={onAddingHandler} className={styles.add}>
            Add Node
          </button>
          <select value={filter} onChange={changeFilterHandler}>
            <option disabled>Sensor Type</option>
            <option value='A'>All Nodes</option>
            <option value='B'>Base Nodes</option>
            <option value='S'>Sink Nodes</option>
            <option value='D'>Detection Nodes</option>
          </select>
        </div>
      </div>
      {isAdding && (
        <NewSensorItem
          refreshMap={props.refresh}
          onCancel={onStopAddingHandler}
        />
      )}
      {editThreshold && (
        <ThresholdMenu
          stopEditing={onStopEditThresholdHandler}
          saveThreshold={props.saveThreshold}
          saveTolerance={props.saveTolerance}
          values={props.thresholdValues}
          tolerance={props.toleranceValues}
        />
      )}
      {isLoaded ? (
        sensors.map((sensor) => {
          return <SensorListItem key={sensor.id} info={sensor} />;
        })
      ) : (
        <p className={styles.loading}>Loading active sensors...</p>
      )}
    </div>
  );
};

export default SensorList;
