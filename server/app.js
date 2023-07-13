const cors = require('cors');
const express = require('express');
const app = express();

const routes = require('./routes/productsRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');

app.use(routes, cors({
	headers: {
		"access-control-allow-origin": "*",
	},
}));
app.use(categoriesRoutes);

module.exports = app; //test
