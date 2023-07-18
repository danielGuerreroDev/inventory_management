const cors = require('cors');
const express = require('express');
const app = express();

const routes = require('./routes/productsRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');

app.use(routes, cors({
    origin: 'https://prod--im-danielguerrero.netlify.app',
    optionsSuccessStatus: 200,
    methods: ["GET", "PUT", "POST", "UPDATE", "DELETE", "OPTIONS"]
}));
app.use(categoriesRoutes);

module.exports = app;
