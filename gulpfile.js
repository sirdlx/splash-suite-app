'use strict';

var gulp = require('gulp');
var electron = require('electron-connect')
  .server
  .create();

gulp.task('electron:dev', function () {

  // Start browser process
  electron.start();

  // // Add list of arguments electron.start(['Hoge', 'foo']); Restart browser
  // process
  gulp.watch([
    'main.js', 'gulpfile.js'
  ], electron.restart);

  // Reload renderer process
  gulp.watch(['src/**'], electron.reload);

});

gulp.task('reload:browser', function () {
  // Restart main process
  electron.restart();
});

gulp.task('reload:renderer', function () {
  // Reload renderer process
  electron.reload();
});

gulp.task('api:dev', function () {
  // Run featherjs server

const feathers = require('feathers');
const serveStatic = feathers.static;
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');

const configuration = require('feathers-configuration');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
const bodyParser = require('body-parser');
const socketio = require('feathers-socketio');
// const db = require('./services');
const dbService = require('feathers-nedb');
const NeDB = require('nedb');
const db = new NeDB({filename: 'db-data/data', autoload: true});

const host = process.env.HOST || "0.0.0.0"
const apiPort = process.env.API || "9901"

const api = feathers();

const whitelist = api.get('corsWhitelist');
const corsOptions = {
  origin(origin, callback) {
    const originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  }
};


api
    .use(compress())
    .options('*', cors(corsOptions))
    .use(cors(corsOptions))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: true}))
    .configure(hooks())
    .configure(rest())
    .configure(socketio())
    .use('items', dbService({
      Model: db,
      paginate: {
        default: 25,
        max: 100
      }
    }));

 api.listen(apiPort, host, function () {
    console.log('API started', host + ":" + apiPort);
  });

  gulp.watch(['./api/src/**', './public/**'], electron.reload);
});


// server


gulp.task('server', function () {
  // Run featherjs server
const path = require('path');
const feathers = require('feathers');
const serveStatic = feathers.static;
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');

const configuration = require('feathers-configuration');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
const bodyParser = require('body-parser');
const socketio = require('feathers-socketio');
const dbService = require('feathers-nedb');
const NeDB = require('nedb');
const db = new NeDB({filename: 'db-data/data', autoload: true});

const host = process.env.HOST || "0.0.0.0"
const apiPort = process.env.API || "9901"

const api = feathers();

const whitelist = api.get('corsWhitelist');
const corsOptions = {
  origin(origin, callback) {
    const originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  }
};

api.configure(configuration(path.join(__dirname, './')));
api
    .use(compress())
    // .options('*', cors(corsOptions))
    // .use(cors(corsOptions))
    .use('/', serveStatic(path.join( __dirname , 'build' )))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: true}))
    .configure(hooks())
    .configure(rest())
    .configure(socketio())
    .use('items', dbService({
      Model: db,
      paginate: {
        default: 50,
        max: 100
      }
    }));

 api.listen(apiPort, host, function () {
    console.log('API started', host + ":" + apiPort);
  });

  gulp.watch(['./api/src/**', './public/**'], electron.reload);
});

// deploy

gulp.task('deploy:fb', function () {
  // Run featherjs server
  var pkg = require('./package.json');

  var fs = require('fs');
  var obj;
  fs.readFile('file', 'utf8', function (err, data) {
    if (err) {
      console.log('No firebase.js file')
      createFB()
      return;
    };

    fbDat = JSON.parse(fbDat)
    deployFB(fbDat)

  });

  function createFB() {
    console.error(' Run "node ./node_modules/firebase-tools/bin/firebase login" ');
    console.error(' Run "node ./node_modules/firebase-tools/bin/firebase init" ');

  }

  // DEPLOYFFF
  function deployFB() {
    var client = require('firebase-tools');
    client
      .list()
      .then(function (data) {
        console.log(data);
      })
      .catch(function (err) { // handle
        error
      });
    client
      .deploy({project: 'myfirebase', token: process.env.FIREBASE_TOKEN, cwd: '/build'})
      .then(function () {
        console.log('Rules have been deployed!')
      })
      .catch(function (err) {
        // handle error
      });
  }

});






gulp.task('default', ['electron-dev']);
gulp.task('electron-dev', ['api:dev', 'electron:dev']);
gulp.task('web-dev', ['api:dev']);

