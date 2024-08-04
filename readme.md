# @mkvlrn/eslint-config

probably requires esm, I don't even know at this point
ALL dependencies are installed with the package, it's a flat config, so it's fancy that way

```bash
yarn add eslint @mkvlrn/eslint-config -D
```

on your `eslint.config.js` or `eslint.config.mjs` file

base project without custom rules

```js
// @ts-check

// you can just auto export the base config as default
export { base as default } from "@mkvlrn/eslint-config";
```

base project with custom rules

```js
// @ts-check

import { base } from "@mkvlrn/eslint-config";

export default {
  ...base,
  rules: {
    // add your custom rules here
  },
};
```

next project without custom rules

```js
// @ts-check

// you can just auto export the next config as default
export { next as default } from "@mkvlrn/eslint-config";
```

next project with custom rules

```js
// @ts-check

import { next } from "@mkvlrn/eslint-config";

export default {
  ...next,
  rules: {
    // add your custom rules here
```
