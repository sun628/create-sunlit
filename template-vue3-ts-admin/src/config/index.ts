export * from './default-config.js';
export * from './custom-config.js';
// 默认配置
import defaultConfig from './default-config.js';
// 自定义配置
import customConfig from './custom-config.js';

export default Object.assign({}, defaultConfig, customConfig);
