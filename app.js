// Dependencies
const express = require('express');
const app = express();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
// const cons = require('consolidate');
const path = require('path');
// const fs = require('fs');
const nconf = require('nconf');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// const UniqueTokenStrategy = require('passport-unique-token').Strategy;


nconf.file(
  {file: './config/config.json'});

const port = process.env.PORT || 80;

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;
// Database configuration with mongoose
mongoose.connect(process.env.MONGODB_URI || nconf.get('server:mongoURI'), {
  useMongoClient: true
});
const db = mongoose.connection;
// Show any mongoose errors
db.on('error', error => console.log('Mongoose Error:', error));
db.once('open', () => console.log('Mongoose connection successful.'));
// Use morgan and body parser with our app
app.use(
  bodyParser.urlencoded({ extended: false })
);
app.use(cookieParser());


const whitelist = [
  // 'http://localhost:8080',
  // 'http://localhost',
  'http://localhost:3000',
  'https://michael-and-leigh.herokuapp.com',
  'https://staging-ml.herokuapp.com/',
  'https://michaelandleigh.com',
  'https://www.michaelandleigh.com'
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
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


const routes = require('./server/routes');

//Iterate through the routes
for (let route in routes) {
  app.use(route, routes[route]);
}

// Send the react dist to client
if (process.env.environment === 'PROD') {
  console.log('Info: Prod mode');
  app.use(logger('tiny'));
  app.use(express.static(path.join(__dirname, 'build')));
  
  app.get('*', function (req, res) {
    const directory = path.join(__dirname, 'build', 'index.html');
    res.sendFile(directory);
  });
} else {

  console.log('Info: Dev mode');
  app.use(cors(corsOptions));

  
  
  
  app.use(logger('dev'));
  app.use(express.static(path.join(__dirname, 'public')));

  app.get('*', function (req, res) {
    const directory = path.join(__dirname, 'public', 'index.html');
    res.sendFile(directory);
  });
}





// Set template engine
// app.engine('dust', cons.dust);
// app.set('view engine', 'dust');
// app.set('views', path.resolve(__dirname + '/server/views'));

// cons.dust.render('notatemplate', {
//   ext: app.get('view engine'),
//   views: path.resolve(__dirname, app.get('views'))
// }, () => console.log('Info: Dust templating active'));

// console.log(`Attempting to listen on port ${port}`);
// app.listen(port, () => {
//   console.log(`App listening on port ${port}!`);
// });

server.listen(port, () => console.log('Info: Listening on port ' + port));
require('./sockets')(server);


