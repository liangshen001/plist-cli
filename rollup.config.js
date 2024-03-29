// import resolve from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';
import typescript from '@rollup/plugin-typescript';

export default [
    // CommonJS (for Node) and ES module (for bundlers) build.
    // (We could have three entries in the configuration array
    // instead of two, but it's quicker to index multiple
    // builds from a single configuration where possible, using
    // an array for the `output` option, where we can specify
    // `file` and `format` for each target)
    {
        input: './src/plist.ts',
        plugins: [typescript({compilerOptions: {declaration: false}})],
        output: [
            {file: 'bin/plist.js', format: 'cjs', banner: '#!/usr/bin/env node'}
        ]
    },
    {
        input: './src/index.ts',
        plugins: [typescript()],
        output: [
            {file: pkg.main, format: 'cjs'},
            {file: pkg.module, format: 'es'}
        ]
    }
];