const express = require('express');
const cors = require('cors');
const yaml = require('js-yaml');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const OpenApiValidator = require('express-openapi-validator');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const apiSpec = path.join(__dirname, '../api/openapi.yaml');

const apidoc = yaml.load(fs.readFileSync(apiSpec, 'utf8'));
app.use('/v0/api-docs', swaggerUi.serve, swaggerUi.setup(apidoc));

app.use(
  OpenApiValidator.middleware({
    apiSpec: apiSpec,
    validateRequests: true,
    validateResponses: true,
  }),
);

// Require statements for routes:
const dummy = require ('./dummy.js');
const sensor = require ('./sensor.js');
const reading = require ('./reading.js');

// Authenication Routes
app.get('/dummy', dummy.get);
app.get('/sensor', sensor.getSensors);
app.get('/sensor/:id', sensor.getSensorById);
app.post('/sensor', sensor.addSensor);
app.delete('/sensor/:id', sensor.deleteSensor);
app.get('/reading', reading.getReading);
app.get('/latestReading/', reading.getLatestReading);
app.get('/latestReading/:id', reading.getLatestReadingById);
app.post('/reading', reading.addReading);


app.use((err, req, res, next) => {
  res.status(err.status).json({
    message: err.message,
    errors: err.errors,
    status: err.status,
  });
});

module.exports = app;