import type { Dayjs } from 'dayjs';

// * 请求响应参数(包含data)
export interface ResultData<T = any> {
  data: T;
  code: string | number;
  message: string;
}

export type ReqDate = {
  startTime: Dayjs | string;
  endTime: Dayjs | string;
};

// * 分页响应参数
export interface ResPage<T> {
  list: T[];
  total: number;
  pageSize: number;
}

// * 分页请求参数
export interface ReqPage {
  pageNum: number;
  pageSize: number;
}

// * 文件上传模块
export interface Upload {
  fileUrl: string;
}
