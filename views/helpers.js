module.exports = {
	getError(errors, prop) {
		//errors is array of err objs, retrieves specific error defined by the prop ('property') attr
		//.mapped() is specific to express-validator lib, turns errors array into an object
		//{ email: {"Invalid email"}, password: {msg: "pass too short"}, passwordConfirmation: {msg: "Pass dont match"} }
		try {
			return errors.mapped()[prop].msg;
		} catch (err) {
			return ''; //assume err msg doesn't exist
		}
	}
};
