import babel from '@rollup/plugin-babel'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import alias from '@rollup/plugin-alias'
import {terser} from "rollup-plugin-terser"
import path from 'path'

const inspector = {
	transform(code, id) {
		console.log(id);
		//console.log( code );
	}
}

export default {
	input: 'lib/index.js',
	plugins: [
		babel({babelHelpers: 'bundled'}),
		alias({
			entries: {
				"uuid": path.resolve("./node_modules/uuid/dist/esm-node/index.js"),
			}
		}),
		nodeResolve({
			preferBuiltins: true,
		}),
		commonjs({
			transformMixedEsModules: true,
			ignore: [
				'memcpy' // optional dep of bytebuffer
			]
		}),
		json(),
	],
	output: [
		{
			file: 'dist/oxmsg.js',
			format: 'umd',
			sourcemap: true,
			name: 'oxmsg'
		},
		{
			file: 'dist/oxmsg.min.js',
			format: 'umd',
			plugins: [terser()],
			sourcemap: true,
			name: 'oxmsg'
		}
	]
}
