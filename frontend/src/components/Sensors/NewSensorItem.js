import styles from './NewSensorItem.module.css';
import React, {useState} from 'react';
import axios from 'axios';

const NewSensorItem = (props) => {
  const [wasAdded, setWasAdded] = useState(undefined);
  const [disableButtons, setDisableButtons] = useState(false);
  const [newId, setNewId] = useState();
  const [newX, setNewX] = useState();
  const [newY, setNewY] = useState();
  const [newType, setNewType] = useState('B');
  const [inputError, setInputError] = useState(false);

  const onAddingHandler = () => {
    if (!newId || !newX || !newY) {
      setInputError(true);
      return;
    }

    axios
      .post('http://localhost:3010/sensor', {
        id: +newId,
        sensorType: newType,
        xPos: +newX,
        yPos: +newY,
      })
      .then((response) => {
        // console.log(response);
        setWasAdded(true);
        setDisableButtons(true);
        props.refreshMap();
      })
      .catch((error) => {
        // console.log(error);
        setInputError(true);
      });
  };

  const newIdHandler = (event) => {
    setNewId(event.target.value);
  };
  const newXHandler = (event) => {
    setNewX(event.target.value);
  };
  const newYHandler = (event) => {
    setNewY(event.target.value);
  };
  const newTypeHandler = (event) => {
    setNewType(event.target.value);
  };
  const onCancelHander = () => {
    props.onCancel();
    setInputError(false);
  };

  const errorMessage = (
    <p className={styles.errorMessage}>Could not add sensor!</p>
  );
  const addedMessage = (
    <p className={styles.message}>
      Adding sensor and rebuilding network visualization...
    </p>
  );

  const newItemContent = (
    <div>
      <h4 className={styles.title}>Configure New Node</h4>
      <div className={styles.inputs}>
        <input onChange={newIdHandler} placeholder='Sensor ID'></input>
        <select
          value={newType}
          onChange={newTypeHandler}
          className={styles.select}
        >
          <option disabled>Sensor Type</option>
          <option value='B'>Base</option>
          <option value='S'>Sink</option>
          <option value='D'>Detection</option>
        </select>
        <input onChange={newXHandler} placeholder='X°'></input>
        <input onChange={newYHandler} placeholder='Y°'></input>
      </div>
      {wasAdded ? addedMessage : null}
      {inputError ? errorMessage : null}
    </div>
  );

  return (
    <div className={styles.container}>
      {newItemContent}
      <div className={styles.buttons}>
        <button
          className={styles.confirm}
          onClick={onAddingHandler}
          disabled={disableButtons}
        >
          Confirm
        </button>
        <button
          className={styles.cancel}
          onClick={onCancelHander}
          disabled={disableButtons}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NewSensorItem;
