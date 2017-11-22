// Dependencies
const express = require('express');
const app = express();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cons = require('consolidate');
const path = require('path');
const fs = require('fs');
const nconf = require('nconf');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// const UniqueTokenStrategy = require('passport-unique-token').Strategy;


nconf.file(
  {file: './config/config.json'});

const port = process.env.PORT || 80;
server.listen(port);
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;
// Database configuration with mongoose
mongoose.createConnection(process.env.MONGODB_URI || nconf.get('server:mongoURI'));
const db = mongoose.connection;

// Use morgan and body parser with our app
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

// Make public a static dir
app.use(express.static('./public'));
app.use(express.static('./build'));


const whitelist = [
  'http://localhost:8080',
  'http://localhost',
  'http://localhost:3000',
  'http://localhost:3001'
];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else if(origin === undefined) {
      // Allow cross site requests
      callback(null, true);
    } else {
      console.error('CORS Violation at:', origin);
      callback(
        new Error('Not allowed by CORS')
      );
    }
  }
};

app.use(cors(corsOptions));

const routes = require('./server/routes');

//Iterate through the routes
for (let route in routes) {
  app.use(route, routes[route]);
}

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/index.html'));
});

// Show any mongoose errors
db.on('error', (error) => {
  console.log('Mongoose Error:', error);
});
db.once('open', () => {
  console.log('Mongoose connection successful.');
});

// Set template engine
app.engine('dust', cons.dust);
app.set('view engine', 'dust');
app.set('views', path.resolve(__dirname + '/server/views'));

cons.dust.render('notatemplate', {
  ext: app.get('view engine'),
  views: path.resolve(__dirname, app.get('views'))
}, () => console.log('Template Engine start'));

// console.log(`Attempting to listen on port ${port}`);
// app.listen(port, () => {
//   console.log(`App listening on port ${port}!`);
// });

require('./sockets')(server);


