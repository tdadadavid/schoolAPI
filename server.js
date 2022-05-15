const express = require('express');
const config = require('./config/config');
const router = require('./routes');

const server = express();
server.use(express.json());

server.use(router);

server.use((req, res, next) => {
    next(new Error(`Could not handle request to ${req.url}`));
});

server.use((err,req, res, next) => {
    res.status(400).json({
        status: 400,
        message: err.toString()
    });
});


server.listen(config.port , () => { console.log(`Server listening on ${config.port}`) });