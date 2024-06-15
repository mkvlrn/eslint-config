import eslintTypescript from "typescript-eslint";
import { createConfig } from "./configs.js";

// eslint-disable-next-line no-restricted-syntax
export default eslintTypescript.config(...createConfig(`vite`));
