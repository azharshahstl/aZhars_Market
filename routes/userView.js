const { schedulingPolicy } = require('cluster');
const express = require('express');
const path = require('path');
const productsController = require('../controllers/products');
// const rootDir = require('../helpers/path');
// const adminData = require('./admin')

const router = express.Router();

router.get('/', productsController.getProductsPage)


module.exports = router