import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { hexoid } from '../src/index.js';

test('exports', () => {
	assert.type(hexoid, 'function', 'exports function');
});


test('returns', () => {
	let output = hexoid();
	assert.type(output, 'function', 'returns a function');
	assert.type(output(), 'string', '~> returns a string');
	assert.is(output().length, 16, '~> has 16 characters (default)');
});


test('length :: 8', () => {
	let i=0, tmp;
	let gen = hexoid(8);
	for (; i < 1e3; i++) {
		tmp = gen();
		assert.is(tmp.length, 8, `"${tmp}" is not 8 characters!`);
	}
});


test('length :: 24', () => {
	let i=0, tmp;
	let gen = hexoid(24);
	for (; i < 1e3; i++) {
		tmp = gen();
		assert.is(tmp.length, 24, `"${tmp}" is not 24 characters!`);
	}
});


test('length :: 48', () => {
	let i=0, tmp;
	let gen = hexoid(48);
	for (; i < 1e3; i++) {
		tmp = gen();
		assert.is(tmp.length, 48, `"${tmp}" is not 48 characters!`);
	}
});


test('unique', () => {
	let gen = hexoid();
	assert.is.not(gen(), gen(), '~> single');

	let items = new Set();
	for (let i=5e6; i--;) items.add(gen());
	assert.is(items.size, 5e6, '~> 5,000,000 uniques');
});


test.run();
