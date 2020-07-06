const express = require('express');

const { handleErrors } = require('./middlewares');
const usersRepo = require('../../repositories/users'); // "../" means move one dir up
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');
const {
	requireEmail,
	requirePassword,
	requirePasswordConfirmation,
	requireEmailExists,
	requireValidPasswordForUser
} = require('./validators');

const router = express.Router();

router.get('/signup', (req, res) => {
	res.send(signupTemplate({ req }));
});

router.post(
	'/signup',
	[ requireEmail, requirePassword, requirePasswordConfirmation ],
	handleErrors(signupTemplate),
	async (req, res) => {
		const { email, password } = req.body;
		//if email not in use and passwords match create new user
		const user = await usersRepo.create({ email, password });
		//store id of user inside users cookie, req.session obj added by cookie-session, add info to obj needed in cookies'
		req.session.userId = user.id;
		res.redirect('/admin/products');
	}
);

router.get('/signout', (req, res) => {
	req.session = null; //clears cookie
	res.send('Logged out');
});

router.get('/signin', (req, res) => {
	res.send(signinTemplate({})); //obj is empty errors obj
});

router.post(
	'/signin',
	[ requireEmailExists, requireValidPasswordForUser ],
	handleErrors(signinTemplate),
	async (req, res) => {
		const { email } = req.body;
		const user = await usersRepo.getOneBy({ email });

		req.session.userId = user.id; //user now signed in using cookie validation
		res.redirect('/admin/products');
	}
);

module.exports = router;
