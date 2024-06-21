import pluginNext from '@next/eslint-plugin-next';
import base from './index.js';

/** @type {import('typescript-eslint').ConfigWithExtends[]} */
const config = [
  ...base,
  {
    name: 'eslint plugin next',
    files: ['*.tsx'],
    plugins: { '@next/next': pluginNext },
    rules: {
      ...pluginNext.configs['core-web-vitals'].rules,
    },
  },
];

// eslint-disable-next-line no-restricted-syntax
export default config;
