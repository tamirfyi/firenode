import styles from './NewSensorItem.module.css';
import React, {useState} from 'react';
import axios from 'axios';
import {MdLocationOn} from 'react-icons/md';

const NewSensorItem = (props) => {
  const [wasAdded, setWasAdded] = useState();
  const [disableButtons, setDisableButtons] = useState(false);
  const [newId, setNewId] = useState();
  const [newX, setNewX] = useState();
  const [newY, setNewY] = useState();
  const [newType, setNewType] = useState('B');
  const [geoLoading, setGeoLoading] = useState(false);
  const [inputError, setInputError] = useState('');

  const handleSuccess = (pos) => {
    setGeoLoading(false);
    const {latitude, longitude} = pos.coords;
    setNewX(latitude);
    setNewY(longitude);
  };

  const handleError = (error) => {
    setInputError('Please enable location services!');
  };

  const findPosition = () => {
    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  };

  const onAddingHandler = () => {
    if (!newId || !newX || !newY) {
      setInputError('Input values cannot be empty!');
      return;
    } else if (newX > 180 || newX < -180 || newY > 180 || newY < -180) {
      setInputError('Please enter valid coordinates');
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
        setInputError('');
        setWasAdded(true);
        setDisableButtons(true);
        props.refreshMap();
      })
      .catch((error) => {
        console.log(error);
        setInputError('Sensor with that ID already exists!');
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

  const errorMessage = <p className={styles.errorMessage}>{inputError}</p>;
  const locationMessage = (
    <p className={styles.locationMessage}>Finding current location...</p>
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
        <input
          onChange={newXHandler}
          value={newX ? newX : null}
          placeholder='X°'
        ></input>
        <input
          onChange={newYHandler}
          value={newY ? newY : null}
          placeholder='Y°'
        ></input>
        <button onClick={findPosition} className={styles.generateCoordsButton}>
          <MdLocationOn size={20} />
        </button>
      </div>
      {wasAdded ? addedMessage : null}
      {inputError ? errorMessage : null}
      {geoLoading ? locationMessage : null}
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
