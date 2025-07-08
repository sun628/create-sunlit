import request from '@/interceptors';

import * as Map from './interface';
export type * from './interface';

/**
 * @function
 * @todo 获取门架区间坐标串列表
 * @returns {}
 **/
export const getSectionPolyLinesApi = () => {
  return request.get<Array<Map.ResSectionPolyLines>>('/gantry/getSectionPolyLines', {
    loading: true,
    server: 'flow_server',
    A: 2
  });
};

export default {
  getSectionPolyLinesApi
};
