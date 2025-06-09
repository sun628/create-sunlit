import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ResultData, ResultEnum, CustomRequestConfig, CustomInternalConfig } from './types';
import { type proxyName, createProxyConfig } from '@/config';
import { useLoading } from '@/hooks/useLoading';
import { checkStatus } from './checkStatus';
import { message } from 'ant-design-vue';
import { isString } from 'lodash-es';

const proxyConfig = createProxyConfig(import.meta.env);

const getBaseUrl = (serverName: proxyName) => {
  const { config } = proxyConfig[serverName];
  if (!config) throw new Error('The server name is not found in the configuration file!');
  return isString(config) ? config : config.target;
};

const { showLoading, hideLoading } = useLoading();
const config = {
  // 默认地址请求地址，可在 .env.** 文件中修改
  baseURL: import.meta.env.VITE_BASE_API as string,
  // 设置超时时间
  timeout: ResultEnum.TIMEOUT as number,
  // 跨域时候允许携带凭证
  withCredentials: true
};

class RequestHttp {
  service: AxiosInstance;
  public constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config);

    this.service.interceptors.request.use(
      (config: CustomInternalConfig) => {
        if (config.server) {
          config.baseURL = getBaseUrl(config.server);
        }
        config.loading && showLoading();
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    /**
     * @description 响应拦截器
     *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     */
    this.service.interceptors.response.use(
      ({ data }: AxiosResponse) => {
        const { code } = data;
        hideLoading();
        // 全局错误信息拦截（防止下载文件的时候返回数据流，没有 code 直接报错）
        if (code && parseInt(code) !== ResultEnum.SUCCESS) {
          message.error(data.message);
          return Promise.reject(data);
        }
        // 成功请求（在页面上除非特殊情况，否则不用处理失败逻辑）
        return data;
      },
      async (error: AxiosError<ResultData>) => {
        const { response } = error;

        hideLoading();
        // 根据服务器响应的错误状态码，做不同的处理
        if (error.message.indexOf('timeout') !== -1) {
          message.error('请求超时！请您稍后重试');
        } else if (error.message.indexOf('Network Error') !== -1) {
          message.error('网络错误！请您稍后重试');
        } else if (response) {
          checkStatus(response.status, response.data.message);
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * @description 常用请求方法封装
   */
  get<T>(url: string, params?: object, config: CustomRequestConfig = {}): Promise<ResultData<T>> {
    return this.service.get(url, { params, ...config });
  }
  post<T>(
    url: string,
    params?: object | string,
    config: CustomRequestConfig = {}
  ): Promise<ResultData<T>> {
    return this.service.post(url, params, config);
  }
  put<T>(url: string, params?: object, config: CustomRequestConfig = {}): Promise<ResultData<T>> {
    return this.service.put(url, params, config);
  }
  delete<T>(
    url: string,
    params?: object,
    config: CustomRequestConfig = {}
  ): Promise<ResultData<T>> {
    return this.service.delete(url, { params, ...config });
  }
  download(url: string, params?: object, config: CustomRequestConfig = {}): Promise<BlobPart> {
    return this.service.post(url, params, { ...config, responseType: 'blob' });
  }
  request<T>(config: CustomRequestConfig): Promise<T> {
    return this.service(config);
  }
}

export default new RequestHttp(config);
