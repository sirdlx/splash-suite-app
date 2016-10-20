'use strict'
// @remove-on-eject-begin
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
// @remove-on-eject-end

process.env.NODE_ENV = 'development';

// Load environment variables from .env file. Suppress warnings using silent if
// this file is missing. dotenv will never modify any environment variables that
// have already been set. https://github.com/motdotla/dotenv
require('./node_modules/react-scripts/node_modules/dotenv').config({silent: true});
// react-scripts
var chalk = require('./node_modules/react-scripts/node_modules/chalk');
var webpack = require('./node_modules/react-scripts/node_modules/webpack');
var WebpackDevServer = require('./node_modules/react-scripts/node_modules/webpack-dev-server');
var historyApiFallback = require('./node_modules/react-scripts/node_modules/connect-history-api-fallback');
var httpProxyMiddleware = require('./node_modules/react-scripts/node_modules/http-proxy-middleware');
var detect = require('./node_modules/react-scripts/node_modules/detect-port');
var clearConsole = require('./node_modules/react-scripts/node_modules/react-dev-utils/clearConsole');
var checkRequiredFiles = require('./node_modules/react-scripts/node_modules/react-dev-utils/checkRequiredFiles');
var formatWebpackMessages = require('./node_modules/react-scripts/node_modules/react-dev-utils/formatWebpackMessages');
var openBrowser = require('./node_modules/react-scripts/node_modules/react-dev-utils/openBrowser');
var prompt = require('./node_modules/react-scripts/node_modules/react-dev-utils/prompt');
var config = require('./node_modules/react-scripts/config/webpack.config.dev');
var paths = require('./node_modules/react-scripts/config/paths');

const path = require('path');
const feathers = require('feathers');
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

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
    process.exit(1);
}

// Tools like Cloud9 rely on this. var DEFAULT_PORT = process.env.PORT || 3000;

var protocol = process.env.HTTPS === 'true'
    ? "https"
    : "http";
var host = process.env.HOST || 'localhost';
var port = process.env.PORT || 9900;


var compiler;
var handleCompile;

// You can safely remove this after ejecting. We only use this block for testing
// of Create React App itself:
var isSmokeTest = process
    .argv
    .some(arg => arg.indexOf('--smoke-test') > -1);
if (isSmokeTest) {
    handleCompile = function (err, stats) {
        if (err || stats.hasErrors() || stats.hasWarnings()) {
            process.exit(1);
        } else {
            process.exit(0);
        }
    };
}

function setupCompiler(host, port, protocol) {
    // "Compiler" is a low-level interface to Webpack. It lets us listen to some
    // events and provide our own custom messages.
    compiler = webpack(config, handleCompile);

    // "invalid" event fires when you have changed a file, and Webpack is
    // recompiling a bundle. WebpackDevServer takes care to pause serving the
    // bundle, so if you refresh, it'll wait instead of serving the old one.
    // "invalid" is short for "bundle invalidated", it doesn't imply any errors.
    compiler.plugin('invalid', function () {
        //clearConsole();
        console.log('Compiling...');
    });

    // "done" event fires when Webpack has finished recompiling the bundle. Whether
    // or not you have warnings or errors, you will get this event.
    compiler.plugin('done', function (stats) {
        // clearConsole(); We have switched off the default Webpack output in
        // WebpackDevServer options so we are going to "massage" the warnings and errors
        // and present them in a readable focused way.
        var messages = formatWebpackMessages(stats.toJson({}, true));
        if (!messages.errors.length && !messages.warnings.length) {
            console.log(chalk.green('Compiled successfully!'));
            console.log();
            console.log('The app is running at:');
            console.log();
            console.log('  ' + chalk.cyan(protocol + '://' + host + ':' + port + '/'));
            console.log();
            console.log('Note that the development build is not optimized.');
            console.log('To create a production build, use ' + chalk.cyan('npm run build') + '.');
            console.log();
        }

        // If errors exist, only show errors.
        if (messages.errors.length) {
            console.log(chalk.red('Failed to compile.'));
            console.log();
            messages
                .errors
                .forEach(message => {
                    console.log(message);
                    console.log();
                });
            return;
        }

        // Show warnings if no errors were found.
        if (messages.warnings.length) {
            console.log(chalk.yellow('Compiled with warnings.'));
            console.log();
            messages
                .warnings
                .forEach(message => {
                    //console.log(message); console.log();
                });
            // Teach some ESLint tricks. console.log('You may use special comments to
            // disable some warnings.'); console.log('Use ' + chalk.yellow('//
            // eslint-disable-next-line') + ' to ignore the next line.'); console.log('Use '
            // + chalk.yellow('/* eslint-disable */') + ' to ignore all warnings in a
            // file.');
        }
    });
}

// We need to provide a custom onError function for httpProxyMiddleware. It
// allows us to log custom error messages on the console.
function onProxyError(proxy) {
    return function (err, req, res) {
        var host = req.headers && req.headers.host;
        console.log(chalk.red('Proxy error:') + ' Could not proxy request ' + chalk.cyan(req.url) + ' from ' + chalk.cyan(host) + ' to ' + chalk.cyan(proxy) + '.');
        console.log('See https://nodejs.org/api/errors.html#errors_common_system_errors for more info' +
                'rmation (' + chalk.cyan(err.code) + ').');
        console.log();

        // And immediately send the proper error response to the client. Otherwise, the
        // request will eventually timeout with ERR_EMPTY_RESPONSE on the client side.
        if (res.writeHead && !res.headersSent) {
            res.writeHead(500);
        }
        res.end('Proxy error: Could not proxy request ' + req.url + ' from ' + host + ' to ' + proxy + ' (' + err.code + ').');
    }
}

function addMiddleware(devServer) {
    // `proxy` lets you to specify a fallback server during development. Every
    // unrecognized request will be forwarded to it.
    var proxy = require(paths.appPackageJson).proxy;
    devServer.use(historyApiFallback({
        // Paths with dots should still use the history fallback. See
        // https://github.com/facebookincubator/create-react-app/issues/387.
        disableDotRule: true,
        // For single page apps, we generally want to fallback to /index.html. However
        // we also want to respect `proxy` for API calls. So if `proxy` is specified, we
        // need to decide which fallback to use. We use a heuristic: if request
        // `accept`s text/html, we pick /index.html. Modern browsers include text/html
        // into `accept` header when navigating. However API calls like `fetch()` won’t
        // generally accept text/html. If this heuristic doesn’t work well for you,
        // don’t use `proxy`.
        htmlAcceptHeaders: proxy
            ? ['text/html']
            : ['text/html', '*/*']
    }));
    if (proxy) {
        if (typeof proxy !== 'string') {
            console.log(chalk.red('When specified, "proxy" in package.json must be a string.'));
            console.log(chalk.red('Instead, the type of "proxy" was "' + typeof proxy + '".'));
            console.log(chalk.red('Either remove "proxy" from package.json, or make it a string.'));
            process.exit(1);
        }

        // Otherwise, if proxy is specified, we will let it handle any request. There
        // are a few exceptions which we won't send to the proxy:
        // - /index.html (served as HTML5 history API fallback)
        // - /*.hot-update.json (WebpackDevServer uses this too for hot reloading)
        // - /sockjs-node/* (WebpackDevServer uses this for hot reloading) Tip: use
        // https://jex.im/regulex/ to visualize the regex
        var mayProxy = /^(?!\/(index\.html$|.*\.hot-update\.json$|sockjs-node\/)).*$/;
        devServer.use(mayProxy,
        // Pass the scope regex both to Express and to the middleware for proxying of
        // both HTTP and WebSockets to work without false positives.
        httpProxyMiddleware(pathname => mayProxy.test(pathname), {
            target: proxy,
            logLevel: 'silent',
            onError: onProxyError(proxy),
            secure: false,
            changeOrigin: true
        }));
    }
    // Finally, by now we have certainly resolved the URL. It may be /index.html, so
    // let the dev server try serving it again.
    devServer.use(devServer.middleware);
}

function runDevServer(host, port, protocol) {
    var devServer = new WebpackDevServer(compiler, {
        // Silence WebpackDevServer's own logs since they're generally not useful. It
        // will still show compile warnings and errors with this setting.
        clientLogLevel: 'none',
        // By default WebpackDevServer serves physical files from current directory in
        // addition to all the virtual build products that it serves from memory. This
        // is confusing because those files won’t automatically be available in
        // production build folder unless we copy them. However, copying the whole
        // project directory is dangerous because we may expose sensitive files.
        // Instead, we establish a convention that only files in `public` directory get
        // served. Our build script will copy `public` into the `build` folder. In
        // `index.html`, you can get URL of `public` folder with %PUBLIC_PATH%: <link
        // rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico"> In JavaScript code, you
        // can access it with `process.env.PUBLIC_URL`. Note that we only recommend to
        // use `public` folder as an escape hatch for files like `favicon.ico`,
        // `manifest.json`, and libraries that are for some reason broken when imported
        // through Webpack. If you just want to use an image, put it in `src` and
        // `import` it from JavaScript instead.
        contentBase: paths.appPublic,
        // Enable hot reloading server. It will provide /sockjs-node/ endpoint for the
        // WebpackDevServer client so it can learn when the files were updated. The
        // WebpackDevServer client is included as an entry point in the Webpack
        // development configuration. Note that only changes to CSS are currently hot
        // reloaded. JS changes will refresh the browser.
        hot: true,
        // It is important to tell WebpackDevServer to use the same "root" path as we
        // specified in the config. In development, we always serve from /.
        publicPath: config.output.publicPath,
        // WebpackDevServer is noisy by default so we emit custom message instead by
        // listening to the compiler events with `compiler.plugin` calls above.
        quiet: true,
        // Reportedly, this avoids CPU overload on some systems.
        // https://github.com/facebookincubator/create-react-app/issues/293
        watchOptions: {
            ignored: /node_modules/
        },
        // Enable HTTPS if the HTTPS environment variable is set to 'true'
        https: protocol === "https",
        host: host

    });

    // Our custom middleware proxies requests to /index.html or a remote API.
    addMiddleware(devServer);

    // Launch WebpackDevServer.
    var server = devServer.listen(port, (err, result) => {
        if (err) {
            return console.log(err);
        }

        clearConsole();
        console.log(chalk.cyan('Starting the development server...'));
        console.log(protocol + '://' + host + ':' + port + '/')
        // console.log(chalk.cyan(process.versions));
        // console.log(chalk.cyan(process.argv.join(', ')));
        // console.log(devServer.app);
        // openBrowser(protocol + '://' + host + ':' + port + '/');
        // console.log(devServer)

    });

   
}

function run(port) {
    setupCompiler(host, port, protocol);
    runDevServer(host, port, protocol);
    startElectron(host, port, protocol);
}

const DEFAULT_PORT = port;
detect(DEFAULT_PORT).then(port => {
    if (port === DEFAULT_PORT) {
        run(port);
        return;
    }
    // clearConsole();
    var question = chalk.yellow('Something is already running on port ' + DEFAULT_PORT + '.') + '\n\nWould you like to run the app on another port instead?';
    prompt(question, true).then(shouldChangePort => {
        if (shouldChangePort) {
            run(port);
        }
    });
});
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function startElectron(host, port) {

    // electron
    const electron = require('electron');
    const BrowserWindow = electron.BrowserWindow;
    const app = electron.app;
    const path = require('path');
    var client = require('electron-connect').client;
    var exec = require('child_process').exec;

    // This method will be called when Electron has finished initialization and is
    // ready to create browser windows. Some APIs can only be used after this event
    // occurs.

    app.on('ready', createWindow(host, port));

    // Quit when all windows are closed.
    app.on('window-all-closed', function () {
        // On OS X it is common for applications and their menu bar to stay active until
        // the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })

    app.on('activate', function () {
        // On OS X it's common to re-create a window in the app when the dock icon is
        // clicked and there are no other windows open.
        if (mainWindow === null) {
            createWindow()
        }
    })

    function createWindow(host, port) {
        // Create the browser window.
        mainWindow = new BrowserWindow({width: 800, height: 600, show: false}).once('ready-to-show', () => {
            mainWindow.show();
        });

        mainWindow.setMenu(null);

        // and load the index.html of the app.
        mainWindow.loadURL(protocol + '://' + host + ':' + port);
        // BrowserWindow.addDevToolsExtension("C:\\Users\\10gold\\AppData\\Local\\Google
        // \\Chrome\\User
        // Data\\Default\\Extensions\\fmkadmapgofadopljbjfkapdkoienihi\\");
        // mainWindow.loadURL(path.join(__dirname, '/index.html')); Open the DevTools.
        if (process.env.NODE_ENV === 'development') {
            mainWindow
                .webContents
                .openDevTools();
        }

        // Emitted when the window is closed.
        mainWindow
            .on('closed', function () {
                // Dereference the window object, usually you would store windows in an array if
                // your app supports multi windows, this is the time when you should delete the
                // corresponding element.
                mainWindow = null
            });

    }

}
