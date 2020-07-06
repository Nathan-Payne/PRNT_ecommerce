//saving files to disc drive not used in prosuction, slow, cannot run 2 instances etc.
//constructors cannot be async, therefore use Synchronus versions of functs from fs (don't usually use due to program pause)
const fs = require('fs');
const crypto = require('crypto');
const util = require('util');
const Repository = require('./repository');

const scrypt = util.promisify(crypto.scrypt);

class UsersRepository extends Repository {
	async create(attrs) {
		// attrs === {email: '', password: ''}
		attrs.id = this.randomId(); //attaches id to attrs object

		const salt = crypto.randomBytes(8).toString('hex'); //random numbers/letters to add to raw password string
		const buf = await scrypt(attrs.password, salt, 64); //hashed pass+salt wrapped in promise, returned as buffer (data array)

		//get most recent user records, add attrs obj to user array (replacing hashpass.salt), write the update to users.json storage file
		const records = await this.getAll();
		const record = {
			...attrs,
			password: `${buf.toString('hex')}.${salt}`
		};
		records.push(record);
		await this.writeAll(records);
		return record; //for generating cookies from stored id
	}

	async comparePasswords(saved, supplied) {
		//saved === password saved in the database "hashed.salt"
		//supplied === password given by user signing in
		const [ hashed, salt ] = saved.split('.');
		const suppliedHashedBuffer = await scrypt(supplied, salt, 64);
		return hashed === suppliedHashedBuffer.toString('hex');
	}
}

module.exports = new UsersRepository('users.json');

//TESTING
// const test = async () => {
// 	const repo = new UsersRepository('users.json');

// 	// await repo.create({ email: 'test@test.com', pass: 'hello' });
// 	// await repo.create({ email: 'test2@test.com', pass: 'hello' });
// 	// await repo.create({ email: 'test3@test.com', pass: 'hello' });
// 	// await repo.update('b6903f02', { registered: 'true' });
// 	// const user = await repo.getOneBy({ email: 'test3@test.com', pass: 'boop' });
// 	console.log(user);
// };
// test();
