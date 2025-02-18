import { defineStore } from 'pinia';
import { GlobalState } from '@/store/interface';
// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const useGlobalStore = defineStore('GlobalState', {
  // state: 返回对象的函数
  state: (): GlobalState => ({}),
  getters: {},
  actions: {},
  persist: true,
});
