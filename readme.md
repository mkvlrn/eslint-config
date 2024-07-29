# @mkvlrn/eslint-config

probably requires esm, I don't even know at this point
ALL dependencies are installed with the package, it's a flat config, so it's fancy that way

```bash
yarn add eslint @mkvlrn/eslint-config -D
```

```js
// eslint.config.js or eslint.config.mjs if your project isn't using esm by default

// base node, nestjs, and vite/react (without next) projects
import { base } from "@mkvlrn/eslint-config";

export default base;

// nextjs projects
import { next } from "@mkvlrn/eslint-config";

export default next;
```
