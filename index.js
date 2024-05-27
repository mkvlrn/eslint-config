import eslintTypescript from 'typescript-eslint';
import { createConfig } from './configs.js';

export default eslintTypescript.config(...createConfig('node'));
