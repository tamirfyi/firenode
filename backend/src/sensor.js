const sensordb = require('./sensordb');

exports.getSensors = async (req, res) => {
  const sensors = await sensordb.getSensors(req.query.sensorType);

  if (sensors) {
    res.status(200).send(sensors);
  } else {
    res.status(404).send('Not found');
  }
};

exports.getSensorById = async (req, res) => {
  const sensors = await sensordb.getSensorById(req.params.id);

  if (sensors) {
    res.status(200).send(sensors);
  } else {
    res.status(404).send('Not found');
  }
};

exports.addSensor = async (req, res) => {
  const newSensor = await sensordb.addSensor(
    req.body.id,
    req.body.sensorType,
    req.body.xPos,
    req.body.yPos
  );

  if (newSensor !== undefined) {
    res.status(201).send(newSensor);
  } else {
    res.status(400).send('Bad request');
  }
};

exports.deleteSensor = async (req, res) => {
  const deletedSensor = await sensordb.deleteSensor(req.params.id);


  if (deletedSensor) {
    res.status(200).send('Sensor succesfully deleted');
  } else {
    res.status(404).send('Sensor does not exist');
  }
};
