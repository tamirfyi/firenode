-- Dummy data
INSERT INTO dummy (created) VALUES (current_timestamp);

-- Sample sensor data

DELETE FROM Sensor;

INSERT INTO Sensor(id, sensorType, xpos, ypos) VALUES (01, 'B', 37.00, -122.06);
INSERT INTO Sensor(id, sensorType, xpos, ypos) VALUES (02, 'S', 37.00, -122.07);
INSERT INTO Sensor(id, sensorType, xpos, ypos) VALUES (03, 'D', 37.00, -122.08);

-- Sample reading data

DELETE FROM Reading;

-- INSERT INTO Reading(sensorId, readTime, co, temp, humid) VALUES (3, '2021-04-20 10:10:10', 1, 2, 3);
-- INSERT INTO Reading(sensorId, readTime, co, temp, humid) VALUES (3, '2021-04-20 10:15:10', 1, 2, 3);
-- INSERT INTO Reading(sensorId, readTime, co, temp, humid) VALUES (3, '2021-04-20 10:20:10', 1, 2, 3);
-- INSERT INTO Reading(sensorId, readTime, co, temp, humid) VALUES (3, '2021-04-20 10:25:10', 1, 2, 3);
-- INSERT INTO Reading(sensorId, readTime, co, temp, humid) VALUES (3, '2021-04-20 10:30:10', 1, 2, 3);
-- INSERT INTO Reading(sensorId, readTime, co, temp, humid) VALUES (3, '2021-04-20 10:35:10', 1, 2, 3);
-- INSERT INTO Reading(sensorId, readTime, co, temp, humid) VALUES (3, '2021-04-20 10:40:10', 1, 2, 3);
-- INSERT INTO Reading(sensorId, readTime, co, temp, humid) VALUES (3, '2021-04-20 10:45:10', 1, 2, 3);
-- INSERT INTO Reading(sensorId, readTime, co, temp, humid) VALUES (3, '2021-04-20 10:50:10', 1, 2, 3);
-- INSERT INTO Reading(sensorId, readTime, co, temp, humid) VALUES (3, '2021-04-20 10:55:10', 1, 2, 3);
-- INSERT INTO Reading(sensorId, readTime, co, temp, humid) VALUES (3, '2021-04-20 11:00:00', 1, 2, 3);