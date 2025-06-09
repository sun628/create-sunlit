import type { ProxyOptions } from 'vite';
import { createProxyConfig } from '../src/config';

/**
 * 创建Vite代理配置
 * @param serverConfig 服务器配置列表，key为服务名称，value为包含prefix和config的对象
 * @returns Vite代理配置对象
 */
export function createProxy(env: Record<string, string>) {
  const proxy: Record<string, ProxyOptions> = {};
  const serverConfig = createProxyConfig(env) as ProxyOptions;

  Object.values(serverConfig).forEach(({ prefix, config }) => {
    // 如果配置是字符串，转换为对象配置
    const proxyConfig = typeof config === 'string' ? { target: config } : config;

    proxy[prefix] = {
      target: proxyConfig.target,
      changeOrigin: proxyConfig.changeOrigin ?? true,
      secure: proxyConfig.secure ?? false,
      rewrite: proxyConfig.rewrite ?? ((path) => path.replace(prefix, '')),
      configure: (proxy, options) => {
        proxy.on('proxyRes', (proxyRes, req) => {
          proxyRes.headers['x-real-url'] =
            new URL(req.url || '', options.target as string)?.href || '';
        });
      }
    };
  });
  return proxy;
}
