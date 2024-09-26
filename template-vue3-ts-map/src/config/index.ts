export * from './default';
export * from './custom';
// 默认配置
import defaultConfig from './default';
// 自定义配置
import customConfig from './custom';

export default Object.assign({}, defaultConfig, customConfig);
