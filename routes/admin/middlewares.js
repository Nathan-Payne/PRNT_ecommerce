const { validationResult } = require('express-validator');

module.exports = {
	handleErrors(templateFunc, dataCallback) {
		//takes template and optional external function which returns data
		return async (req, res, next) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				let data = {}; //declared outside of if statement scope to be accessible in rest of function
				if (dataCallback) {
					data = await dataCallback(req);
				}
				//use spread/rest operator to merge objects
				return res.send(templateFunc({ errors, ...data }));
			}

			next();
		};
	},
	requireAuth(req, res, next) {
		if (!req.session.userId) {
			return res.redirect('/signin');
		}
		next();
	}
};
