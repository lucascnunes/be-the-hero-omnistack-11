const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');

const app = express();

app.use(cors({
    // origin: "",
    exposedHeaders: ['Access-Control-Allow-Origin', 'X-Total-Count']
}));
app.use(express.json());
app.use(routes);
app.use(errors());

app.listen(3333);
