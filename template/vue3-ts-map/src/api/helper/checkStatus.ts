import { message } from 'ant-design-vue';

/**
 * @description: 校验网络请求状态码
 * @param {Number} status
 * @param msg
 * @return void
 */
export const checkStatus = (status: number, msg: string) => {
  switch (status) {
    case 400:
      message.error(msg || `请求参数错误`);
      break;
    case 401:
      message.error(msg || `授权未通过`);
      break;
    case 403:
      message.error(msg || '当前账号无权限访问！');
      break;
    case 404:
      message.error(msg || '你所访问的资源不存在！');
      break;
    case 405:
      message.error(msg || '请求方式错误！请您稍后重试');
      break;
    case 406:
      message.error(msg || `权限认证未通过`);
      break;
    case 500:
      message.error(msg || `服务器意外错误`);
      break;
    case 501:
      message.error(msg || `服务器不支持该请求功能`);
      break;
    case 502:
      message.error(msg || '网关错误！');
      break;
    case 503:
      message.error(msg || '服务不可用！');
      break;
    case 504:
      message.error(msg || '网关超时！');
      break;
    default:
      message.error(msg || `后端接口${status}异常`);
      break;
  }
};
