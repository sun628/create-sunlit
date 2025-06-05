import { ServersName } from '@/config';
import type { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

// 基础配置类型
interface BaseConfig {
  loading?: boolean;
  server?: ServersName;
}

// 扩展 Axios 配置
export interface CustomRequestConfig extends BaseConfig, AxiosRequestConfig {}
export interface CustomInternalConfig extends BaseConfig, InternalAxiosRequestConfig {}

export interface ResultData<T = any> {
  data: T;
  code: string | number;
  message: string;
}

/**
 * @description：请求配置
 */
export enum ResultEnum {
  SUCCESS = 200,
  ERROR = 500,
  OVERDUE = 401,
  TIMEOUT = 60 * 1000, // 超时时间1分钟
  TYPE = 'success'
}

/**
 * @description：请求方法
 */
export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

/**
 * @description：常用的 contentTyp 类型
 */
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // text
  TEXT = 'text/plain;charset=UTF-8',
  // form-data 一般配合qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data 上传
  FORM_DATA = 'multipart/form-data;charset=UTF-8'
}
