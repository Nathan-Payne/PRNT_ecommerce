const { check } = require('express-validator');
const usersRepo = require('../../repositories/users');

//check() takes name property from html input form
module.exports = {
	requireTitle: check('title')
		.trim()
		.isLength({ min: 5, max: 40 })
		.withMessage('Must be between 5 and 40 characters'),
	requirePrice: check('price').trim().toFloat().isFloat({ min: 1 }).withMessage('Must be a number greater than 1'),
	requireCategory: check('category')
		.trim()
		.isLength({ min: 4, max: 20 })
		.withMessage('Try to use a word between 4 and 20 characters'),
	requireEmail: check('email')
		.trim()
		.normalizeEmail()
		.isEmail()
		.withMessage('Must be valid email')
		.custom(async (email) => {
			const existingUser = await usersRepo.getOneBy({ email });
			if (existingUser) {
				throw new Error('Email in use');
			}
		}),
	requirePassword: check('password')
		.trim()
		.isLength({ min: 4, max: 20 })
		.withMessage('Must be between 4 and 20 characters'),
	requirePasswordConfirmation: check('passwordConfirmation')
		.trim()
		.isLength({ min: 4, max: 20 })
		.withMessage('Passwords must match')
		.custom((passwordConfirmation, { req }) => {
			if (req.body.password !== passwordConfirmation) {
				throw new Error('Passwords must match');
			}
			return true; //Indicates the success of this synchronous custom validator
		}),
	requireEmailExists: check('email')
		.trim()
		.normalizeEmail()
		.isEmail()
		.withMessage('Must provide valid email')
		.custom(async (email) => {
			const user = await usersRepo.getOneBy({ email: email });
			if (!user) {
				throw new Error('Email not found');
			}
		}),
	requireValidPasswordForUser: check('password').trim().custom(async (password, { req }) => {
		const user = await usersRepo.getOneBy({ email: req.body.email }); //finds email entered
		if (!user) {
			throw new Error('Invalid password'); //not email because erroring on password check
		}
		const validPassword = await usersRepo.comparePasswords(user.password, password);
		if (!validPassword) {
			throw new Error('Invalid password');
		}
	})
};
