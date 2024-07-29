import pluginNext from "@next/eslint-plugin-next";
import { base } from "./base.js";

/** @type {import('typescript-eslint').ConfigWithExtends[]} */
export const next = [
  ...base,

  {
    name: "eslint plugin next",
    files: ["*.tsx"],
    plugins: { "@next/next": pluginNext },
    rules: {
      ...pluginNext.configs["core-web-vitals"].rules,
    },
  },
];
