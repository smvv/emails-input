import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const input = 'src/index.ts';

const plugins = [
  typescript({
    typescript: require('typescript'),
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
