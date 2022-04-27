const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

exports.getReading = async (id) => {
  let select = 'SELECT * FROM Reading';
  let queryValues = [];

  if (id) {
    select += ` WHERE sensorId=$1;`;
    queryValues = [`${id}`];
  }

  const query = {
    text: select,
    values: queryValues,
  };

  const {rows} = await pool.query(query);

  const readings = [];

  for (r of rows) {
    const reading = {
      sensorId: r.sensorid,
      readTime: new Date(r.readtime).toLocaleString(),
      co: parseFloat(r.co),
      temp: parseFloat(r.temp),
      humid: parseFloat(r.humid),
    };
    readings.push(reading);
  }

  if (readings.length == 0) {
    return undefined;
  } else {
    return readings;
  }
};

exports.getLatestReading = async () => {
  let select = `SELECT r.sensorid, r.readtime, r.temp, r.humid, r.co FROM Sensor s, Reading r WHERE s.id = r.sensorid AND readtime = (SELECT MAX(readtime) FROM Reading r2 WHERE r2.sensorid = s.id);`;

  const query = {
    text: select,
    values: [],
  };

  const {rows} = await pool.query(query);

  const readings = [];

  for (r of rows) {
    const reading = {
      sensorId: r.sensorid,
      readTime: new Date(r.readtime).toLocaleString(),
      co: parseFloat(r.co),
      temp: parseFloat(r.temp),
      humid: parseFloat(r.humid),
    };
    readings.push(reading);
  }

  if (readings.length == 0) {
    return undefined;
  } else {
    return readings;
  }
};

exports.getLatestReadingById = async (id) => {
  let select = `SELECT * FROM Reading WHERE sensorId=$1 ORDER BY readtime DESC LIMIT 1;`;
  let queryValues = [`${id}`];

  const query = {
    text: select,
    values: queryValues,
  };

  const {rows} = await pool.query(query);

  const readings = [];

  for (r of rows) {
    const reading = {
      sensorId: r.sensorid,
      readTime: new Date(r.readtime).toLocaleString(),
      co: parseFloat(r.co),
      temp: parseFloat(r.temp),
      humid: parseFloat(r.humid),
    };
    readings.push(reading);
  }

  if (readings.length == 0) {
    return undefined;
  } else {
    return readings;
  }
};

exports.addReading = async (id, time, co, temp, humid) => {
  const add = `INSERT INTO Reading(sensorId, readTime, co, temp, humid) VALUES ($1, $2, $3, $4, $5) RETURNING *;`;

  const query = {
    text: add,
    values: [`${id}`, `${time}`, `${co}`, `${temp}`, `${humid}`],
  };

  const {rows} = await pool.query(query);

  const newReading = {
    sensorId: rows[0].sensorid,
    readTime: rows[0].readtime.toString(),
    co: parseFloat(rows[0].co),
    temp: parseFloat(rows[0].temp),
    humid: parseFloat(rows[0].humid),
  };

  if (rows.length == 0) {
    return undefined;
  } else {
    return newReading;
  }
};
