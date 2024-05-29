import eslint from '@eslint/js';
import tslint from 'typescript-eslint';

export default [
  eslint.configs.recommended,
  ...tslint.configs.recommended,
  {
    ignores: ['node_modules', 'dist'],
  },
];
