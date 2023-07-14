const cors = require('cors');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json();

const productsController = require('../controllers/productsController');

router.get('/', productsController.baseRoute);
router.get('/getProducts',cors() , productsController.getProducts);
router.get('/getProduct/:id',cors() , productsController.getSingleProduct);
router.put('/product/:id/update',cors({
    origin: ['https://prod--im-danielguerrero.netlify.app'],
    methods: ['POST', 'PUT', 'UPDATE', 'OPTIONS']
}) , productsController.updateProduct);
router.delete('/product/delete/:id',cors() , productsController.deleteProduct);


module.exports = router;
