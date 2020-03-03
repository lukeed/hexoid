import test from 'tape';
import hexoid from '../src';

test('exports', t => {
	t.is(typeof hexoid, 'function', 'exports function');
	t.end();
});


test('returns', t => {
	let output = hexoid();
	t.is(typeof output, 'function', 'returns a function');
	t.is(typeof output(), 'string', '~> returns a string');
	t.is(output().length, 16, '~> has 16 characters (default)');
	t.end();
});


test('length :: 8', t => {
	let gen = hexoid(8);
	let i=0, tmp, bool=true;

	for (; i < 1e3; i++) {
		tmp = gen();
		bool = bool && tmp.length === 8;
		if (!bool) {
			t.fail(`"${tmp}" is not 8 characters!`);
			break;
		}
	}

	t.true(bool, '~> produced 1000 IDs w/ 8 chars each');

	t.end();
});


test('length :: 24', t => {
	let gen = hexoid(24);
	let i=0, tmp, bool=true;

	for (; i < 1e3; i++) {
		tmp = gen();
		bool = bool && tmp.length === 24;
		if (!bool) {
			t.fail(`"${tmp}" is not 24 characters!`);
			break;
		}
	}

	t.true(bool, '~> produced 1000 IDs w/ 24 chars each');

	t.end();
});


test('length :: 48', t => {
	let gen = hexoid(48);
	let i=0, tmp, bool=true;

	for (; i < 1e3; i++) {
		tmp = gen();
		bool = bool && tmp.length === 48;
		if (!bool) {
			t.fail(`"${tmp}" is not 48 characters!`);
			break;
		}
	}

	t.true(bool, '~> produced 1000 IDs w/ 48 chars each');

	t.end();
});


test('unique', t => {
	let gen = hexoid();
	t.not(gen(), gen(), '~> single');

	let items = new Set();
	for (let i=5e6; i--;) items.add(gen());
	t.is(items.size, 5e6, '~> 5,000,000 uniques');

	t.end();
});
