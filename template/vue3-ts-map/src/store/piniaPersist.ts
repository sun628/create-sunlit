import { PersistenceOptions } from 'pinia-plugin-persistedstate';

/**
 * @description pinia 持久化参数配置
 * @param {String} key 存储到持久化的 name
 * @param {PersistenceOptions} options 配置项
 *        - storage 存储方式，默认 localStorage
 *        - paths 指定 state 中哪些数据需要被持久化。[] 表示不持久化任何状态，undefined 或 null 表示持久化整个 state。
 * @return persist
 * */
const piniaPersistConfig = (key: string, options: PersistenceOptions = {}) => {
  const persist: PersistenceOptions = {
    key,
    storage: localStorage,
    ...options,
  };
  return persist;
};

export default piniaPersistConfig;
