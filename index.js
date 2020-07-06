const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');
const adminProductsRouter = require('./routes/admin/products');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');
const carts = require('./repositories/carts');

const port = 3000;
const app = express();

app.use(express.static('public'));
//BODY PARSER - globally applies body parser middleware to routes, does not allow working with multipart form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	cookieSession({
		keys: [ 'iseuyfbiubfwef' ]
	})
);
app.use(authRouter); //subrouter
app.use(adminProductsRouter);
app.use(productsRouter);
app.use(cartsRouter);

app.listen(port, () => {
	console.log(`Listening on ${port}`);
});
