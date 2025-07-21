import { AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * @function
 * @description loading 拦截
 **/
export function loadingInterceptor() {
  const { showLoading, hideLoading } = useLoading();
  /**
   * @function
   * @description 请求拦截
   **/
  const requestLoading = (config: AxiosRequestConfig) => {
    if (config.loading) {
      showLoading();
      delete config.loading;
    }
    return config;
  };
  /**
   * @function
   * @description 响应拦截
   **/
  const responseLoading = (response?: AxiosResponse) => {
    hideLoading();
    return response;
  };
  return {
    requestLoading,
    responseLoading
  };
}
