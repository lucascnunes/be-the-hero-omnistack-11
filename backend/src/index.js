const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors({
    // origin: "",
    exposedHeaders: ['Access-Control-Allow-Origin', 'X-Total-Count']
}));
app.use(express.json());
app.use(routes);

app.listen(3333);
