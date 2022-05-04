import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'src/index.ts',
    output: {
      name: 'react-connect-4',
      file: 'dist/index.js',
      format: 'esm',
      exports: 'auto',
    },
    external: ['react', /@babel\/runtime/],
    plugins: [
      babel({
        exclude: 'node_modules/**',
        plugins: ['@babel/transform-runtime'],
        babelHelpers: 'runtime',
      }),
      typescript(),
      postcss(),
      terser(),
    ],
  },
];
