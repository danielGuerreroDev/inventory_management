const mongoose = require('mongoose');
const Products = mongoose.model('products');
const cors = require('cors');

exports.baseRoute = async (req, res) => {
	res.send('Server Running');
};

exports.getProducts = async (req, res) => {
	try {
		const products = await Products.find({});
		res.send(products);
	} catch (err) {
		console.log(err);
	}
};

exports.getSingleProduct = async (req, res) => {
	try {
		let productId = parseInt(req.params.id, 10);
		const product = await Products.findOne({ id: productId });
		res.send(product);
	} catch (err) {
		console.log(err);
	}
};

exports.updateProduct = async (req, res, next) => {
		console.log('METHOD 333', req.method);
		res.setHeader('Access-Control-Allow-Origin', 'https://inventory-management-net.onrender.com');
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
		res.setHeader('Access-Control-Allow-Credentials', true);
		next();
	try {
		let updatedProductId = parseInt(req.params.id, 10);
		const selectedProduct = await Products.findOne({ id: updatedProductId });
		const updatedProduct = await Products.findByIdAndUpdate(
			{ _id: selectedProduct._id },
			{ $set: req.body }
		);
		res.send(updatedProduct);
	} catch (err) {
		console.log(err);
	}
};

exports.deleteProduct(cors(), function (req, res, next){
	try {
		let updatedProductId = parseInt(req.params.id, 10);
		const selectedProduct = Products.findOne({ id: updatedProductId });
		const deletedProduct = Products.deleteOne(
			{ _id: selectedProduct._id },
		);
		res.send(deletedProduct);
		res.json('This is CORS-enabled for all origins!');
	} catch (err) {
		console.log(err);
	}
})
