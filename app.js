const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const routes = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('./public'));
app.use('/api', routes);

app.get('*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.use((err, req, res, next) => {
  res.status(500).send(err);
});

db.sync()
  .then(() => app.listen(3000));
