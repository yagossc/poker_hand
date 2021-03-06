// Native modules
const assert = require('assert');
const http   = require('http');

// Express
const express = require('express');
const app     = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Middlewares
const error_middleware = require('../app/errors');

// Routes
const routes = require("./routes");

var server;

// init initializes a server with all its middlewares/routes
module.exports.init = function(){
    return new Promise((resolve, reject) => {

        if (server){
            console.warn("Trying to init server again.");
            reject('Server already initialized');
        }
        server = {};
        server.app = app;

        routes.setup(server.app);

        // Setup error middleware
        server.app.use(error_middleware.handler);

        resolve();

    });
}

// get returns the active server instance
module.exports.get = function() {
    assert.ok(server, "Server not initialized, please call init().");
    return server;
}

// run creates the server connection by listening
module.exports.run = function(port) {
    assert.ok(server, "Server not initialized, please call init().");
    server.conn = http.createServer(server.app);
    return new Promise((resolve, reject) => {
        server.conn.on('listening', () => {
            resolve();
        })
        server.conn.on('error', err => {
            reject(err);
        })
        server.conn.listen(port);
    })
}
