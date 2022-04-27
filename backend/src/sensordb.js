const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

exports.getSensors = async (type) => {
  let select = `SELECT * FROM Sensor`;
  let queryValues = [];

  if (type) {
    select += ` WHERE sensorType ILIKE $1;`;
    queryValues = [`${type}`];
  }

  const query = {
    text: select,
    values: queryValues,
  };

  const {rows} = await pool.query(query);

  const sensors = [];

  for (r of rows) {
    const sensor = {
      id: r.id,
      sensorType: r.sensortype,
      xPos: parseFloat(r.xpos),
      yPos: parseFloat(r.ypos),
    };
    sensors.push(sensor);
  }

  if (sensors.length == 0) {
    return undefined;
  } else {
    return sensors;
  }
};

exports.getSensorById = async (id) => {
  let select = `SELECT * FROM Sensor`;
  let queryValues = [];

  if (id) {
    select += ` WHERE id=$1;`;
    queryValues = [`${id}`];
  }

  const query = {
    text: select,
    values: queryValues,
  };

  const {rows} = await pool.query(query);

  const sensors = [];

  for (r of rows) {
    const sensor = {
      id: r.id,
      sensorType: r.sensortype,
      xPos: parseFloat(r.xpos),
      yPos: parseFloat(r.ypos),
    };
    sensors.push(sensor);
  }

  if (sensors.length == 0) {
    return undefined;
  } else {
    return sensors;
  }
};

exports.addSensor = async (id, type, xpos, ypos) => {
  const add = `INSERT INTO Sensor(id, sensorType, xPos, yPos) VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO NOTHING RETURNING *;`;

  const query = {
    text: add,
    values: [`${id}`, `${type}`, `${xpos}`, `${ypos}`],
  };

  const {rows} = await pool.query(query);

  if (rows.length == 0) {
    return undefined;
  }

  const newSensor = {
    id: rows[0].id,
    sensorType: rows[0].sensortype,
    xPos: parseFloat(rows[0].xpos),
    yPos: parseFloat(rows[0].ypos),
  };

  return newSensor;
};

exports.deleteSensor = async (id) => {
  const statement = `DELETE FROM Sensor WHERE id=$1 RETURNING *;`;

  const query = {
    text: statement,
    values: [`${id}`],
  };

  const {rows} = await pool.query(query);

  if (rows.length === 0) {
    return false;
  } else {
    return true;
  }
};
