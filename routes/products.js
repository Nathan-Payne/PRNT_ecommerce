const express = require('express');
const productsRepo = require('../repositories/products');
const productsIndexTemplate = require('../views/products/index');
const landingIndexTemplate = require('../views/products/landing');
const productDetailTemplate = require('../views/products/detail');

const router = express.Router();

router.get('/', async (req, res) => {
	res.send(landingIndexTemplate());
});

router.get('/products', async (req, res) => {
	const products = await productsRepo.getAll();
	res.send(productsIndexTemplate({ products }));
});

router.get('/products/:id', async (req, res) => {
	const product = await productsRepo.getOne(req.params.id);
	res.send(productDetailTemplate({ product }));
});

module.exports = router;
