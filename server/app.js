const cors = require('cors');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Products = mongoose.model('products');

const routes = require('./routes/productsRoutes');
// const categoriesRoutes = require('./routes/categoriesRoutes');

app.use(routes);

app.options('/product/delete/:id', cors({
    origin: "https://inventory-management-net.onrender.com",
    methods: "OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: true,
    optionsSuccessStatus: 200
}));
app.delete('/product/delete/:id', cors(), async (req, res, next) => {
    try {
		let updatedProductId = parseInt(req.params.id, 10);
		const selectedProduct = await Products.findOne({ id: updatedProductId });
		// res.json({selectedProduct : selectedProduct});
		const deletedProduct = Products.deleteOne(
			{ _id: selectedProduct._id },
		);
		res.send(deletedProduct);
	} catch (err) {
		console.log(err);
	}
  })
// let requestCntr = 0;
// app.use(routes,(req, res, next) => {
//     let thisRequest = requestCntr++;
//     console.log(`${thisRequest}: ${req.method}, ${req.originalUrl}, `, req.headers);
//     // watch for end of theresponse
//     res.on('close', () => {
//         console.log(`${thisRequest}: close response, res.statusCode = ${res.statusCode}, outbound headers: `, res.getHeaders());
//     });
//     next();
// });
// app.use(categoriesRoutes);

// Set middleware of CORS 
// app.use(routes, (req, res, next) => {
//   req.header(
//     "Access-Control-Allow-Origin",
//     ["https://inventory-management-gu28.onrender.com/","https://inventory-management-net.onrender.com"]
//   );
//   req.header(
//     "Access-Control-Allow-Methods",
//     "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
//   );
//   req.header(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
//   );
//   req.header("Access-Control-Allow-Credentials", true);
//   req.header("Access-Control-Allow-Private-Network", true);
//   //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
//   req.header("Access-Control-Max-Age", 7200);

//   next();
// });

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
