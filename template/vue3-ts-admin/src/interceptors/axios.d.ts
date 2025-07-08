import axios from 'axios';
import { type proxyName } from '@/config';

declare module 'axios' {
  export interface AxiosRequestConfig {
    loading?: boolean;
    server?: proxyName;
  }
  export interface InternalAxiosRequestConfig {
    loading?: boolean;
    server?: proxyName;
  }
}
