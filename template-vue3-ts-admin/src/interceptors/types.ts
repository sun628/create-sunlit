export interface ResultData<T = any> {
  data: T;
  code: string | number;
  message: string;
}
