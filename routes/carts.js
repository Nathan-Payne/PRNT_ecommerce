const express = require('express');
const cartsRepo = require('../repositories/carts');
const productsRepo = require('../repositories/products');
const cartShowTemplate = require('../views/carts/show');

const router = express.Router();
//routes needed: POST to add product to cart, GET to show all products in cart, POST to delete product from cart
//using hidden <input> element in HTML to add product id to req.body, could also attach to url using :id and accessing params
router.post('/cart/products', async (req, res) => {
	//ROUTE LOGIC: does user have existing cart - if not make one and store cartId in cookie session,
	//if product in cart then increment amount - or add to items array
	let cart;
	if (!req.session.cartId) {
		cart = await cartsRepo.create({ items: [] });
		req.session.cartId = cart.id;
	} else {
		cart = await cartsRepo.getOne(req.session.cartId);
	}

	const existingItem = cart.items.find((item) => item.id === req.body.productId);
	if (existingItem) {
		existingItem.quantity = parseFloat(existingItem.quantity) + parseFloat(req.body.productQuantity);
	} else {
		cart.items.push({ id: req.body.productId, quantity: req.body.productQuantity || 1 });
	}
	await cartsRepo.update(cart.id, {
		items: cart.items
	});

	if (req.body.addCart) {
		res.redirect(`/products/`);
	}
	res.redirect(`/cart`);
});

router.get('/cart', async (req, res) => {
	//list of items in cart of current user
	if (!req.session.cartId) {
		return res.redirect('/');
	}
	//CART STRUCTURE === {
	//		id:987,
	//		items: [ {
	//					id: 29393,
	//					quantity: 1,
	//					product: {id: 727, title: 'shirt', price: 50, image: 'e87gd3187d...'}
	//		 		} ]
	//		}
	const cart = await cartsRepo.getOne(req.session.cartId);
	for (let item of cart.items) {
		const product = await productsRepo.getOne(item.id);
		item.product = product; //add retrieved product directly onto item obj inside items array, not saved to repo
	}
	res.send(cartShowTemplate({ items: cart.items }));
});

router.post('/cart/products/delete', async (req, res) => {
	const { itemId } = req.body;
	const cart = await cartsRepo.getOne(req.session.cartId);
	const items = cart.items.filter((item) => {
		return item.id !== itemId;
	});
	await cartsRepo.update(req.session.cartId, { items }); //update items property of cart
	res.redirect('/cart');
});

module.exports = router;
