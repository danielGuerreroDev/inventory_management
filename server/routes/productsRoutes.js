const cors = require('cors');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

const productsController = require('../controllers/productsController');
const categoriesController = require('../controllers/categoriesController');

router.get('/', cors(), productsController.baseRoute);
router.get('/getProducts', cors(), productsController.getProducts);
router.get('/getCategories', cors(), categoriesController.getCategories);
router.get('/getProduct/:id', cors(), productsController.getSingleProduct);
router.put('/product/:id', cors(), jsonParser, productsController.updateProduct);
router.delete('/product/delete/:id', cors(), productsController.deleteProduct);

module.exports = router;
