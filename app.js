const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const routes = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', routes);

app.use((err, req, res, next) => {
  res.status(500).send(err);
});

db.sync()
  .then(() => app.listen(3000));