import typescript from 'rollup-plugin-typescript2';
import scss from 'rollup-plugin-scss';
import pkg from './package.json';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const input = 'src/index.ts';

const plugins = [
  typescript({
    typescript: require('typescript'),
  }),
  scss({
    output: pkg.main.replace('.js', '.css'),
  }),
];

export default [
  {
    input,
    output: {
      file: pkg.main,
      name: 'EmailsInput',
      format: 'umd',
      sourcemap: true,
    },
    plugins,
  },
];
