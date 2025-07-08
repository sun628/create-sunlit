import axios, {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { message } from 'ant-design-vue';
import { ResultEnum } from '@/enums/httpEnum';
import { checkStatus } from '@/api/helper/checkStatus';
import { ResultData } from '@/api/interface';
import { useLoading } from '@/hooks/useLoading';
import { servers } from '@/config';

export type ServerProp = (typeof servers)[number]['name'];

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  loading?: boolean;
  server?: ServerProp;
}
export interface CustomRequestConfig extends AxiosRequestConfig {
  loading?: boolean;
  server?: ServerProp;
}

const getBaseUrl = (serverName: string) => {
  const serverItem = servers.find((item) => item.name === serverName);
  if (!serverItem) throw new Error('The server name is not found in the configuration file!');
  return serverItem.url;
};

const { showLoading, hideLoading } = useLoading();
const config = {
  // 默认地址请求地址，可在 .env.** 文件中修改
  baseURL: import.meta.env.VITE_BASE_API as string,
  // 设置超时时间
  timeout: ResultEnum.TIMEOUT as number,
  // 跨域时候允许携带凭证
  withCredentials: true,
};

class RequestHttp {
  service: AxiosInstance;
  public constructor(config: AxiosRequestConfig) {
    // instantiation
    this.service = axios.create(config);

    /**
     * @description 请求拦截器
     * 客户端发送请求 -> [请求拦截器] -> 服务器
     * token校验(JWT) : 接受服务器返回的 token,存储到 vuex/pinia/本地储存当中
     */
    this.service.interceptors.request.use(
      (config: CustomAxiosRequestConfig) => {
        const { server, loading } = config;
        if (server) {
          config.baseURL = getBaseUrl(server);
        }
        loading && showLoading();
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      },
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
        if (error.message.indexOf('timeout') !== -1)
          // 请求超时 && 网络错误单独判断，没有 response
          message.error('请求超时！请您稍后重试');
        if (error.message.indexOf('Network Error') !== -1) message.error('网络错误！请您稍后重试');
        // 根据服务器响应的错误状态码，做不同的处理
        if (response?.status == 504) return;

        if (response) checkStatus(response.status, response.data.message);

        return Promise.reject(error);
      },
    );
  }

  /**
   * @description 常用请求方法封装
   */
  get<T>(url: string, params?: object, _config: CustomRequestConfig = {}): Promise<ResultData<T>> {
    return this.service.get(url, { params, ..._config });
  }
  post<T>(
    url: string,
    params?: object | string,
    _config: CustomRequestConfig = {},
  ): Promise<ResultData<T>> {
    return this.service.post(url, params, _config);
  }
  put<T>(url: string, params?: object, _config: CustomRequestConfig = {}): Promise<ResultData<T>> {
    return this.service.put(url, params, _config);
  }
  delete<T>(
    url: string,
    params?: object,
    _config: CustomRequestConfig = {},
  ): Promise<ResultData<T>> {
    return this.service.delete(url, { params, ..._config });
  }
  download(url: string, params?: object, _config: CustomRequestConfig = {}): Promise<BlobPart> {
    return this.service.post(url, params, { ..._config, responseType: 'blob' });
  }
  request<T>(config: CustomRequestConfig): Promise<T> {
    return this.service(config);
  }
}

export default new RequestHttp(config);
