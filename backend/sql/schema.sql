DROP TABLE IF EXISTS Sensor;
DROP TABLE IF EXISTS Reading;

DROP TABLE IF EXISTS dummy;
CREATE TABLE dummy(created TIMESTAMP WITH TIME ZONE);

-- Should the ID of the sensor be a UUID? If so, should it be randomly generated?

CREATE TABLE Sensor(
  id INTEGER PRIMARY KEY, 
  sensorType CHAR(1) NOT NULL,
  xPos NUMERIC(9, 6) NOT NULL,
  yPos NUMERIC(9, 6) NOT NULL
);

CREATE TABLE Reading(
  sensorId INTEGER, 
  readTime TIMESTAMP NOT NULL,
  co NUMERIC(5, 2) NOT NULL, 
  temp NUMERIC(5, 2) NOT NULL, 
  humid NUMERIC(5, 2) NOT NULL,
  PRIMARY KEY (sensorId, readTime),
  FOREIGN KEY (sensorId) REFERENCES Sensor(id)
    ON DELETE CASCADE
);
