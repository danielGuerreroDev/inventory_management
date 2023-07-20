// const cors = require('cors');
const express = require('express');
const app = express();

const routes = require('./routes/productsRoutes');
// const categoriesRoutes = require('./routes/categoriesRoutes');

// app.use(routes, cors({
//     origin: 'https://prod--im-danielguerrero.netlify.app',
//     optionsSuccessStatus: 200,
//     methods: ["GET", "PUT", "POST", "UPDATE", "DELETE", "OPTIONS"]
// }));
// app.use(categoriesRoutes);

// Set middleware of CORS 
app.use(routes, (req, res, next) => {
  req.setHeader(
    "Access-Control-Allow-Origin",
    ["https://inventory-management-gu28.onrender.com/","https://inventory-management-net.onrender.com"]
  );
  req.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  req.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  req.setHeader("Access-Control-Allow-Credentials", true);
  req.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  req.setHeader("Access-Control-Max-Age", 7200);

  next();
});

// app.use(routes,function(req, res, next) {
//     // res.header("Access-Control-Allow-Origin", "*");
//     const allowedOrigins = ['https://inventory-management-net.onrender.com'];
//     const origin = req.headers.origin;
//     if (allowedOrigins.includes(origin)) {
//          res.setHeader('Access-Control-Allow-Origin', origin);
//     }
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     res.header("Access-Control-Allow-credentials", true);
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE, OPTIONS");
//     next();
//   });

module.exports = app;
