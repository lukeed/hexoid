// @ts-check
const fs = require('fs');
const path = require('path');
const terser = require('terser');
const { gzipSync } = require('zlib');
const pkg = require('../package.json');

/**
 * @param {string} file
 * @param {string} content
 */
function write(file, content) {
	let mini = terser.minify(content, {
		module: true,
		compress: true,
		mangle: true,
	});

	let abs = path.join(__dirname, '..', file);

	let dir = path.dirname(abs);
	fs.existsSync(dir) || fs.mkdirSync(dir);
	fs.writeFileSync(abs, mini.code);

	let num = gzipSync(mini.code).byteLength;
	let size = (num < 1024) ? (num + ' B') : `${(num/1024).toFixed(2)} kB`;

	console.log('~> "%s" (%s)', file, size);
}

/**
 * @param {string} input
 * @param {Record<string, string>} outputs
 */
function transform(input, outputs) {
	let file = path.resolve(input);
	let data = fs.readFileSync(file, 'utf8');

	// esm -> minify as is
	write(outputs.import, data);

	// esm -> cjs -> minify
	// data = data.replace('export function hexoid', 'exports.hexoid = function');
	data = data.replace('export default function', 'module.exports = function');
	write(outputs.require, data);

	if (outputs.types) {
		file = file.replace(/\.[mc]?[tj]sx?$/, '.d.ts');
		if (!fs.existsSync(file)) throw new Error(`Missing "${file}" file`);
		fs.copyFileSync(file, outputs.types);
		console.log('~> "%s"', outputs.types);
	}
}

transform('src/index.js', pkg.exports['.']);
