const fs = require('fs');
const crypto = require('crypto');

module.exports = class Repository {
	constructor(filename) {
		if (!filename) {
			throw new Error('Creating a repository requires a filename');
		}

		this.filename = filename; //instance variable, check file exists + accessible
		try {
			fs.accessSync(this.filename);
		} catch (err) {
			fs.writeFileSync(this.filename, '[]');
		}
	}

	async create(attrs) {
		attrs.id = this.randomId();

		const records = await this.getAll();
		records.push(attrs);
		await this.writeAll(records);
		return attrs; //returns created obj
	}

	async getAll() {
		//open file called this.filename, read and parse contents of file, return parsed data
		return JSON.parse(await fs.promises.readFile(this.filename, { encoding: 'utf8' }));
	}

	async writeAll(records) {
		await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2)); //null/2 formats JSON to be pretty
	}

	randomId() {
		return crypto.randomBytes(4).toString('hex');
	}

	async getOne(id) {
		const records = await this.getAll();
		return records.find((record) => record.id === id);
	}

	async delete(id) {
		const records = await this.getAll();
		let filteredRecords = records.filter((record) => record.id !== id); //filter creates new array with all elements which passed the test
		await this.writeAll(filteredRecords);
	}

	async update(id, attrs) {
		const records = await this.getAll();
		const record = records.find((record) => record.id === id);
		if (!record) {
			throw new Error(`Record with id: ${id}, not found`);
		}
		//record === {email: 'test@test.com}, attrs === {pass: 'password123'} - Object.assign combined them into one obj
		Object.assign(record, attrs);
		await this.writeAll(records);
	}

	async getOneBy(filters) {
		const records = await this.getAll();
		for (let record of records) {
			//iterating over array of user objects - use for of loop
			let found = true;

			for (let key in filters) {
				//iterating over user object - use for in loop
				if (record[key] !== filters[key]) {
					found = false;
				}
			}

			if (found) {
				return record;
				//returns only first record found where key/val in filters object matches equivalent key/val in User record
			}
		}
	}
};
