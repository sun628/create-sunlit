import { AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * @function
 * @todo loading 拦截
 **/
export function loadingInterceptor() {
  const { showLoading, hideLoading } = useLoading();
  /**
   * @function
   * @todo 请求拦截
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
   * @todo 响应拦截
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
