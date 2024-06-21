// @ts-check

import eslint from '@eslint/js';
// @ts-expect-error, no types for this plugin
import pluginNext from '@next/eslint-plugin-next';
// @ts-expect-error, no types for this plugin
import configPrettier from 'eslint-config-prettier';
// @ts-expect-error, no types for this plugin
import pluginImport from 'eslint-plugin-import';
// @ts-expect-error, no types for this plugin
import pluginReact from 'eslint-plugin-react';
// @ts-expect-error, no types for this plugin
import pluginReactHooks from 'eslint-plugin-react-hooks';
// @ts-expect-error, no types for this plugin
import pluginUnicorn from 'eslint-plugin-unicorn';
import pluginVitest from 'eslint-plugin-vitest';
import eslintTypescript, { parser } from 'typescript-eslint';

/** @type {import('typescript-eslint').ConfigWithExtends[]} */
const configs = [
  {
    name: 'eslint recommended',
    rules: { ...eslint.configs.recommended.rules },
  },
  ...eslintTypescript.configs.strictTypeChecked,
  ...eslintTypescript.configs.stylisticTypeChecked,
  {
    name: 'typescript parser',
    languageOptions: {
      parserOptions: { parser, ecmaVersion: 'latest', project: true },
    },
  },
  {
    /**
     * temporarily disable while most npm packages
     * still export unsafe types all over the place
     * so I'm guessing until 2034 or something
     */
    name: 'disable unsafe temporarily',
    rules: {
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
    },
  },
  {
    // reminds you to remove scattered console statements
    name: 'console warn',
    rules: {
      'no-console': 'warn',
    },
  },
  {
    // absolutely* no default exports, please. code like a gentleman
    name: 'no default exports',
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ExportDefaultDeclaration',
          message: 'Prefer named exports',
        },
      ],
    },
  },
  {
    /**
     * allows default exports for nextjs's page components (app router)
     * some config files also need to export default, so yeah
     */
    name: 'no default exports exceptions',
    files: [
      'src/app/**/{page,layout,template}.tsx',
      '*.config.{ts,js}',
      '**/*.config.{ts,js}',
      '*.d.ts',
      '**/*.d.ts',
    ],
    rules: {
      'no-restricted-syntax': ['off', { selector: 'ExportDefaultDeclaration' }],
    },
  },
  {
    name: 'eslint plugin import',
    plugins: { import: pluginImport },
    settings: { 'import/resolver': { typescript: {} } },
    rules: {
      // TODO - revisit these rules
      /**
       * currently only used for the path aliases
       * plugin doesn't support new eslint flat config
       * and the maintainer is being a complete DICK about it
       */
      // ...pluginImport.configs.recommended.rules,
      // ...pluginImport.configs.typescript.rules,
      // ...pluginImport.configs.react.rules,
      // allows for the use of devDependencies in test files
      // "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
      // doesn't REQUIRE default exports, which is a silly idea to begin with
      // "import/prefer-default-export": "off",
    },
  },
  {
    name: 'eslint plugin unicorn',
    plugins: { unicorn: pluginUnicorn },
    rules: {
      ...pluginUnicorn.configs['flat/recommended'].rules,
      // null is fine
      'unicorn/no-null': 'off',
      // some names come from external sources, gotta adapt
      'unicorn/prevent-abbreviations': [
        'error',
        {
          allowList: { ProcessEnv: true, ImportMetaEnv: true },
          ignore: ['next-env', 'vite-env'],
        },
      ],
    },
  },
  {
    name: 'eslint plugin react and react hooks',
    files: ['*.tsx'],
    plugins: { react: pluginReact, 'react-hooks': pluginReactHooks },
    rules: {
      ...pluginReact.configs['jsx-runtime'].rules,
      ...pluginReactHooks.configs.recommended.rules,
    },
  },
  {
    name: 'eslint plugin vitest',
    files: ['*.test.ts', '*.spec.ts', '*.test.tsx', '*.spec.tsx'],
    plugins: { vitest: pluginVitest },
    rules: {
      ...pluginVitest.configs.recommended.rules,
    },
  },
  {
    name: 'disable prettier',
    ...configPrettier,
  },
  {
    // backticks only in templates
    name: 'backticks only in templates',
    rules: {
      quotes: ['warn', 'single'],
      'no-template-curly-in-string': 'error',
    },
  },
];

/**
 * @param {("base"|"next")} name
 * @returns {import('typescript-eslint').ConfigWithExtends[]}
 */
export function createConfig(name) {
  const config = [...configs];

  if (name === 'next') {
    config.push({
      name: 'eslint plugin next',
      files: ['*.tsx'],
      plugins: { '@next/next': pluginNext },
      rules: {
        ...pluginNext.configs['core-web-vitals'].rules,
      },
    });
  }

  const patchedConfig = config.map((config) => ({
    ...config,
    ignores: ['node_modules/**/*', 'dist/**/*'],
  }));

  return eslintTypescript.config(...patchedConfig);
}
