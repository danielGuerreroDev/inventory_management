const cors = require('cors');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

const productsController = require('../controllers/productsController');

router.get('/', productsController.baseRoute);
router.get('/getProducts', cors({
    origin: 'https://prod--im-danielguerrero.netlify.app',
    optionsSuccessStatus: 200,
    methods: ["GET"]
}), productsController.getProducts);
router.get('/getProduct/:id', cors({
    origin: 'https://prod--im-danielguerrero.netlify.app',
    optionsSuccessStatus: 200,
    methods: ["GET"]
}), productsController.getSingleProduct);
router.put('/product/:id/update', cors({
    origin: 'https://prod--im-danielguerrero.netlify.app',
    optionsSuccessStatus: 200,
    methods: ["POST", "PUT", "UPDATE", "OPTIONS"]
}), jsonParser, productsController.updateProduct);
router.delete('/product/delete/:id', productsController.deleteProduct);


module.exports = router;
