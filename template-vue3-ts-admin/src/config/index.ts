import * as defaultConfig from './default-config.js';
import * as customConfig from './custom-config.js';

export * from './default-config';
export * from './custom-config';

const config = Object.assign({}, defaultConfig, customConfig);

export default config;
