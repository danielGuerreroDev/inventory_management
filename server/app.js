// const cors = require('cors');
const express = require('express');
const app = express();

const routes = require('./routes/productsRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');

// app.use(routes, cors({
//     origin: 'https://prod--im-danielguerrero.netlify.app',
//     optionsSuccessStatus: 200,
//     methods: ["GET", "PUT", "POST", "UPDATE", "DELETE", "OPTIONS"]
// }));
app.use(categoriesRoutes);

app.use(routes,function(req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*");
    const allowedOrigins = ['https://prod--im-danielguerrero.netlify.app'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
         res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE, OPTIONS");
    next();
  });

module.exports = app;
