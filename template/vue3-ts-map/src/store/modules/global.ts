import { defineStore } from 'pinia';
import { GlobalState } from '@/store/interface';
import { getSectionPolyLinesApi } from '@/api/map';
import { pathChange } from '@/utils/gpsChange';
// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const useGlobalStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: 'GlobalState',
  // state: 返回对象的函数
  state: (): GlobalState => ({
    sectionMap: {},
  }),
  getters: {},

  actions: {
    /**
     * @function
     * @description 获取门架区间坐标串列表
     * @returns {}
     **/
    async getSectMap() {
      const { data } = await getSectionPolyLinesApi();
      data.forEach((item) => {
        const polyline = JSON.parse(item.polyline || '');
        this.sectionMap[item.gtrId] = markRaw(pathChange(polyline));
      });
    },
  },
  persist: true,
});
