const mongoose = require('mongoose');
const Products = mongoose.model('products');
const ObjectId = require('mongodb').ObjectId;

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

exports.updateProduct = async (req, res) => {
    try {
        let updatedProductId = parseInt(req.params.id, 10);
        const selectedProduct = await Products.findOne({ id: updatedProductId });
        console.log('productId 333', selectedProduct._id);
        const updatedProduct  = await Products.findByIdAndUpdate(
            { _id: selectedProduct._id },
            { title: 'Fog Scent Xpressio Perfume Hola' },
            console.log('BODY', req.body.price)
            // { $set: req.body }
        );
        res.send(updatedProduct);
    } catch (err) {
        console.log(err);
    }
};
