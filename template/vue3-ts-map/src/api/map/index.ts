import request from '@/utils/request';

import * as Map from './interface';
export type * from './interface';

/**
 * @function
 * @description 获取门架区间坐标串列表
 * @returns {}
 **/
export const getSectionPolyLinesApi = () => {
  return request.get<Array<Map.ResSectionPolyLines>>('/gantry/getSectionPolyLines', {
    loading: true,
  });
};

export default {
  getSectionPolyLinesApi,
};
