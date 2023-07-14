const cors = require('cors');
const express = require('express');
const app = express();

const routes = require('./routes/productsRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');

app.use(routes, cors({
    methods: ['POST', 'PUT', 'UPDATE', 'OPTIONS']
}));
app.use(categoriesRoutes);

module.exports = app;
