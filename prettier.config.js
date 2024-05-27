/** @type {import('prettier').Config} */
export default {
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  endOfLine: 'lf',
  jsxSingleQuote: true,
  printWidth: 100,
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  importOrder: ['^node:(.*)', '<THIRD_PARTY_MODULES>', '^#(.*)/', '^[./]'],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy', 'importAssertions'],
};
