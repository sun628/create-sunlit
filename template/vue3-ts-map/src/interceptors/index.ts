import axios, {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios';
import { ResultData, ResultEnum } from './types';
import { checkStatus } from './checkStatus';
import { message } from 'ant-design-vue';
import { requestService } from './service';
import { useLoading } from '@/hooks/useLoading';

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
      (config: InternalAxiosRequestConfig) => {
        requestService(config);
        if (config.loading) {
          showLoading();
          delete config.loading;
        }
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
        return data;
      },
      async (error: AxiosError<ResultData>) => {
        const { response } = error;
        hideLoading();
        response && checkStatus(response.status, response.data.message);
        return Promise.reject(error);
      }
    );
  }

  /**
   * @description 常用请求方法封装
   */
  get<T>(url: string, params?: object, config: AxiosRequestConfig = {}): Promise<ResultData<T>> {
    return this.service.get(url, { params, ...config });
  }
  post<T>(
    url: string,
    params?: object | string,
    config: AxiosRequestConfig = {}
  ): Promise<ResultData<T>> {
    return this.service.post(url, params, config);
  }
  put<T>(url: string, params?: object, config: AxiosRequestConfig = {}): Promise<ResultData<T>> {
    return this.service.put(url, params, config);
  }
  delete<T>(url: string, params?: object, config: AxiosRequestConfig = {}): Promise<ResultData<T>> {
    return this.service.delete(url, { params, ...config });
  }
  download(url: string, params?: object, config: AxiosRequestConfig = {}): Promise<BlobPart> {
    return this.service.post(url, params, { ...config, responseType: 'blob' });
  }
  request<T>(config: AxiosRequestConfig): Promise<T> {
    return this.service(config);
  }
}

export default new RequestHttp(config);
