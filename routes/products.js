const express = require('express');
const productsRepo = require('../repositories/products');
const productsIndexTemplate = require('../views/products/index');
const landingIndexTemplate = require('../views/products/landing');

const router = express.Router();

router.get('/', async (req, res) => {
	const products = await productsRepo.getAll();
	res.send(landingIndexTemplate());
});

router.get('/products', async (req, res) => {
	const products = await productsRepo.getAll();
	res.send(productsIndexTemplate({ products }));
});

module.exports = router;
