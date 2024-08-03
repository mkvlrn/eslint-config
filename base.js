// @ts-check

import eslint from "@eslint/js";
// @ts-expect-error, no types for this plugin
import configPrettier from "eslint-config-prettier";
// @ts-expect-error, no types for this plugin
import pluginImport from "eslint-plugin-import";
// @ts-expect-error, no types for this plugin
import pluginReact from "eslint-plugin-react";
// @ts-expect-error, no types for this plugin
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginUnicorn from "eslint-plugin-unicorn";
import pluginVitest from "eslint-plugin-vitest";
import eslintTypescript, { parser } from "typescript-eslint";

/** @type {import('typescript-eslint').ConfigWithExtends[]} */
export const base = [
  {
    name: "eslint recommended",
    ...eslint.configs.recommended,
  },

  ...eslintTypescript.configs.strictTypeChecked,
  ...eslintTypescript.configs.stylisticTypeChecked,

  {
    name: "typescript parser",
    languageOptions: {
      parserOptions: { parser, ecmaVersion: "latest", project: true },
    },
  },

  {
    /**
     * temporarily disable while most npm packages
     * still export unsafe types all over the place
     * so I'm guessing until 2034 or something
     */
    name: "disable unsafe temporarily",
    rules: {
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-return": "off",
    },
  },

  {
    // backticks only in templates
    name: "backticks only in templates",
    rules: {
      quotes: ["warn", "double", { avoidEscape: true }],
      "no-template-curly-in-string": "error",
    },
  },

  {
    // reminds you to remove scattered console statements
    name: "console warn",
    rules: { "no-console": "warn" },
  },

  {
    // forces type-safe equality checks
    name: "strict equality checks",
    rules: { eqeqeq: "error" },
  },

  {
    // default exports are bad
    name: "no default exports",
    rules: {
      "no-restricted-syntax": [
        "error",
        { selector: "ExportDefaultDeclaration", message: "Prefer named exports" },
      ],
    },
  },

  {
    /**
     * allows default exports for nextjs's page components (app router)
     * some config files also need to export a default object, so yeah
     */
    name: "no default exports exceptions",
    files: [
      "**/src/app/**/{page,layout,template,not-found,loading,error,route}.tsx",
      "*.config.{ts,js}",
      "**/*.config.{ts,js}",
      "*.d.ts",
      "**/*.d.ts",
    ],
    rules: {
      "no-restricted-syntax": ["off", { selector: "ExportDefaultDeclaration" }],
    },
  },

  {
    name: "eslint plugin import",
    plugins: { import: pluginImport },
    settings: { "import/resolver": { typescript: {} } },
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
    name: "eslint plugin unicorn",
    plugins: { unicorn: pluginUnicorn },
    rules: {
      ...pluginUnicorn.configs["flat/recommended"].rules,
      // null is fine
      "unicorn/no-null": "off",
      // some names come from external sources, gotta allow those
      "unicorn/prevent-abbreviations": [
        "error",
        {
          allowList: { ProcessEnv: true, ImportMetaEnv: true },
          ignore: ["next-env", "vite-env"],
        },
      ],
    },
  },

  {
    name: "eslint plugin react and react hooks",
    files: ["*.tsx"],
    plugins: { react: pluginReact, "react-hooks": pluginReactHooks },
    rules: {
      ...pluginReact.configs["jsx-runtime"].rules,
      ...pluginReactHooks.configs.recommended.rules,
    },
  },

  {
    name: "eslint plugin vitest",
    files: ["*.test.ts", "*.spec.ts", "*.test.tsx", "*.spec.tsx"],
    plugins: { vitest: pluginVitest },
    rules: { ...pluginVitest.configs.recommended.rules },
  },

  {
    name: "disable prettier",
    ...configPrettier,
  },
];
