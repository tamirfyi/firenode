const readingdb = require('./readingdb');

exports.getReading = async (req, res) => {
  const readings = await readingdb.getReading(req.query.sensorId);

  if (readings) {
    res.status(200).send(readings);
  } else {
    res.status(404).send('Not found');
  }
};

exports.getLatestReading = async (req, res) => {
  const readings = await readingdb.getLatestReading();

  if (readings) {
    res.status(200).send(readings);
  } else {
    res.status(404).send('No active sensors');
  }
};

exports.getLatestReadingById = async (req, res) => {
  const readings = await readingdb.getLatestReadingById(req.params.id);

  if (readings) {
    res.status(200).send(readings);
  } else {
    res.status(404).send('Not found');
  }
};

exports.addReading = async (req, res) => {
  const newReading = await readingdb.addReading(
    req.body.sensorId,
    req.body.readTime,
    req.body.co,
    req.body.temp,
    req.body.humid
  );

  if (newReading) {
    res.status(201).send(newReading);
  } else {
    res.status(400).send('Bad request');
  }
};
