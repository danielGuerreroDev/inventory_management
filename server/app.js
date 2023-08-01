const cors = require('cors');
const express = require('express');
const app = express();
const routes = require('./routes/productsRoutes');

app.options(['/product/:id', '/product/delete/:id'], cors({
  origin: "https://inventory-management-net.onrender.com",
  methods: "PUT,DELETE",
  preflightContinue: true,
  optionsSuccessStatus: 200
}));

app.use(routes);

module.exports = app;
