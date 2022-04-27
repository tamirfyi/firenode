import styles from './ThresholdMenu.module.css';
import React, {useState} from 'react';

const ThresholdMenu = (props) => {
  const [newTemp, setNewTemp] = useState();
  const [newHumid, setNewHumid] = useState();
  const [newCo, setNewCo] = useState();
  const [thresholdError, setThresholdError] = useState(false);

  const newTempHandler = (e) => setNewTemp(e.target.value);
  const newHumidHandler = (e) => setNewHumid(e.target.value);
  const newCoHandler = (e) => setNewCo(e.target.value);

  const onCancelThreshold = () => {
    setThresholdError(false);
    props.stopEditing();
  };

  const onSaveThreshold = () => {
    if (!newTemp || !newHumid || !newCo) {
      setThresholdError(true);
      return;
    } else {
      setThresholdError(false);
    }

    props.saveThreshold(+newTemp, +newHumid, +newCo);
    props.stopEditing();
  };

  const errorMessage = (
    <p className={styles.errorMessage}>Invalid threshold values!</p>
  );

  return (
    <div className={styles.container}>
      <div>
        <h4 className={styles.title}>Edit Threshold Levels</h4>
        <div className={styles.inputs}>
          <input
            type='number'
            onChange={newTempHandler}
            placeholder={`${props.values.temp}°C`}
          ></input>
          <input
            type='number'
            onChange={newHumidHandler}
            placeholder={`${props.values.humid}% RF`}
          ></input>
          <input
            type='number'
            onChange={newCoHandler}
            placeholder={`${props.values.co}ppm`}
          ></input>
        </div>
        {thresholdError && errorMessage}
      </div>
      <div className={styles.buttons}>
        <button onClick={onSaveThreshold} className={styles.saveButton}>
          Save
        </button>
        <button className={styles.cancel} onClick={onCancelThreshold}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ThresholdMenu;
