export * from './default-config.ts';
export * from './custom-config.ts';
// 默认配置
import defaultConfig from './default-config.ts';
// 自定义配置
import customConfig from './custom-config.ts';

export default Object.assign({}, defaultConfig, customConfig);
