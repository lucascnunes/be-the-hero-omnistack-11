const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');

const app = express();

app.use(cors({
    // origin: ['http://localhost:3000'],
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    exposedHeaders: ['Access-Control-Allow-Origin', 'X-Total-Count'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(routes);
app.use(errors());

module.exports = app;