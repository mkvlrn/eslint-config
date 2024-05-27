# @mkvlrn/eslint-config

probably requires esm, I don't even know at this point
ALL dependencies are installed with the package, it's a flat config, so it's fancy that way

```bash
yarn add @mkvlrn/eslint-config -D
```

```js
// eslint.config.js

// base node and nestjs projects
export { default } from '@mkvlrn/eslint-config';

// vite react projects
export { default } from '@mkvlrn/eslint-config/vite';

// nextjs projects
export { default } from '@mkvlrn/eslint-config/next';
```
