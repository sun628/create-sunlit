import { InternalAxiosRequestConfig } from 'axios';
import { type proxyName, createProxyConfig } from '@/config';
import { isString } from 'lodash-es';

const proxyConfig = createProxyConfig(import.meta.env);

const getBaseUrl = (serverName: proxyName) => {
  const { config } = proxyConfig[serverName];
  if (!config) throw new Error('The server name is not found in the configuration file!');
  return isString(config) ? config : config.target;
};

/**
 * @function
 * @description 创建服务配置
 **/
export const requestServer = (config: InternalAxiosRequestConfig) => {
  if (config.server) {
    config.baseURL = getBaseUrl(config.server);
    delete config.server;
  }
  return config;
};
