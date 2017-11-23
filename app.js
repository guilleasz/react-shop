const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const routes = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('./public'));

// Routing
function allowCrossDomain(req, res, next) {
  // intercept OPTIONS method
  if (req.method === 'OPTIONS') {
    res.set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Accept, Header, Content-Type, access-control-allow-origin',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    });
    return res.sendStatus(200);
  }
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'header, Origin, X-Requested-With, X-AUTHENTICATION, X-IP, Content-Type, Accept, Authorization,Content-Type,Accept,Origin,User-Agent,DNT,Cache-Control,X-Mx-ReqToken,Keep-Alive,X-Requested-With,If-Modified-Since',
    'Access-Control-Allow-Credentials': true,
  });
  return next();
}
app.use('/', allowCrossDomain);

app.use('/api', routes);

app.get('*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.use((err, req, res, next) => {
  res.status(500).send(err);
});

db.sync()
  .then(() => app.listen(3000));
