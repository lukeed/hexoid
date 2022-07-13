// @ts-check
const uuid = require('uuid');
const assert = require('assert');
const { Suite } = require('benchmark');
const nanoid = require('nanoid/non-secure');
const Hash = require('hashids/cjs');
const hex2 = require('../jit');
const hex1 = require('../dist');
const uid = require('uid');

const size_16 = {
	'hashids/fixed': new Hash('', 16),
	'nanoid/non-secure': nanoid.bind(nanoid, 16),
	'uid': uid.bind(uid, 16),
	'hexoid': hex1.hexoid(16),
	'hexoid/jit': hex2.hexoid(16),
};

const size_25 = {
	'cuid': require('cuid'),
	'hashids/fixed': new Hash('', 25),
	'nanoid/non-secure': nanoid.bind(nanoid, 25),
	'uid': uid.bind(uid, 25),
	'hexoid': hex1.hexoid(25),
	'hexoid/jit': hex2.hexoid(25),
};

const size_36 = {
	'uuid/v1': uuid.v1,
	'uuid/v4': uuid.v4,
	'@lukeed/uuid': require('@lukeed/uuid'),
	'hashids/fixed': new Hash('', 36),
	'nanoid/non-secure': nanoid.bind(nanoid, 36),
	'uid': uid.bind(uid, 36),
	'hexoid': hex1.hexoid(36),
	'hexoid/jit': hex2.hexoid(36),
};

function pad(str) {
	return str + ' '.repeat(20 - str.length);
}

function runner(group, size) {
	let num = 0;

	console.log(`\nValidation (length = ${size}): `);
	Object.keys(group).forEach(name => {
		try {
			num = 0;
			const lib = group[name];
			const isHash = name.startsWith('hashids');
			const output = isHash ? lib.encode(num++) : lib();

			assert.deepStrictEqual(typeof output, 'string', 'returns string');
			assert.notDeepEqual(output, isHash ? lib.encode(num++) : lib(), 'unqiue strings');

			console.log('  ✔', pad(name), `(example: "${output}")`);
		} catch (err) {
			console.log('  ✘', pad(name), `(FAILED @ "${err.message}")`);
		}
	});

	console.log(`\nBenchmark (length = ${size}):`);
	const bench = new Suite().on('cycle', e => {
		console.log('  ' + e.target);
		num = 0; // hashids reset
	});

	Object.keys(group).forEach(name => {
		if (name.startsWith('hashids')) {
			num = 0;
			bench.add(pad(name), () => {
				group[name].encode(num++);
			});
		} else {
			bench.add(pad(name), () => {
				group[name]();
			});
		}
	});

	bench.run();
}

// ---

runner(size_16, 16);
runner(size_25, 25);
runner(size_36, 36);
