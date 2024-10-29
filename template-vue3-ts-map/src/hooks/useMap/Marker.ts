import { onBeforeUnmount } from 'vue';
/**
 * @function
 * @todo 添加点标记
 * @see https://lbs.amap.com/api/javascript-api-v2/documentation#marker
 * @param {AMap.MarkerOptions} opts 点标记参数
 * @param {(e: AMap.MarkerEvent<ExtraData>, extData: ExtraData) => void} callback 点击回调
 * @returns {AMap.Marker} 点标记对象
 */
export const addMarker = <ExtraData>(
  opts: AMap.MarkerOptions<ExtraData>,
  callback?: (e: AMap.MarkerEvent<ExtraData>, extData: ExtraData) => void,
) => {
  const marker: AMap.Marker<ExtraData> = new AMap.Marker<ExtraData>({ ...opts, cursor: 'pointer' });
  if (callback) {
    marker.on('click', (e: AMap.MarkerEvent<ExtraData>) =>
      callback(e, e.target.getExtData() as ExtraData),
    );
  }
  return marker;
};

export type MarkerLayerOptions<ExtraData> = {
  LngLat?: [string, string]; // 自定义经纬度字段
  options?: AMap.MarkerOptions<ExtraData>; // Marker选项
};

/** 默认匹配字段 */
const DefaultLngLat = ['lon', 'lat'] as const;
let map: ComputedRef<AMap.Map | undefined>;
/**
 * @function
 * @todo 使用marker
 * @example
 * const { createMarkerLayer,clearMarkerLayer}=useMarker()
 **/
export const useMarker = (Map: MaybeRef<AMap.Map | undefined>) => {
  const markerArr: AMap.Marker[] = [];
  map = computed(() => unref(Map));
  /**
   * @function
   * @todo 绘制marker群组图层
   * @param { Array<ExtraData> } data 数据源
   **/
  const createMarkerLayer = <ExtraData extends { active?: boolean; [key: string]: any }>(
    data: Array<ExtraData>,
    markerLayerOptions?: MarkerLayerOptions<ExtraData>, // 使用封装的类型
    callback?: (e: AMap.MarkerEvent<ExtraData>, extData: ExtraData) => void,
  ) => {
    clearMarkerLayer();
    const { LngLat = DefaultLngLat, options } = markerLayerOptions || {};
    const [lon, lat] = LngLat;
    data.forEach((item) => {
      if (!item[lon] || !item[lat]) return;
      const position = [item[lon], item[lat]] as AMap.LngLatLike;
      const markerOptions = { position, extData: item, ...item, ...options };
      const marker = addMarker<ExtraData>(markerOptions, callback);
      markerArr.push(marker);
    });
    if (!options?.map) map.value?.add(markerArr);
    return markerArr;
  };

  /**
   * @function
   * @todo 清除点标记
   **/
  const clearMarkerLayer = () => {
    if (map.value && markerArr.length) {
      map.value.remove(markerArr);
      markerArr.length = 0;
    }
  };

  onBeforeUnmount(() => {
    clearMarkerLayer();
  });
  return {
    addMarker,
    createMarkerLayer,
    clearMarkerLayer,
  };
};

/**
 * @description 海量点类, [亲手试一试](https://lbs.amap.com/api/jsapi-v2/example/marker/massmarks)
 * @name MassMarks
 * @extends {AMap.Event}
 * @param {MassData[]} data 海量点数据参数
 * @param {LngLat} data.lnglat 经纬度
 * @param {number} data.style 样式索引值
 * @param {MassMarkersOptions[]} opts 海量点参数
 * @param callback
 * @param {number} opts.zIndex 图标 url
 * @param {number} opts.opacity 图标显示大小
 * @param {Vector2} opts.zooms 旋转角度
 * @param {string} opts.cursor 锚点位置
 * @param {MassMarkersStyleOptions | MassMarkersStyleOptions[]} opts.style 点展示优先级
 * @param {string} opts.style.url 图标 url
 * @param {Vector2 | Size} opts.style.size 图标显示大小
 * @param {number} opts.style.rotation 旋转角度
 * @param {pixel} opts.style.anchor 锚点位置
 * @param {number} opts.style.zIndex 点展示优先级，默认为使用样式的索引值。
 * @example
 * var massMarks = new AMap.MassMarks(data, {
 *     opacity: 0.8,
 *     zIndex: 111,
 *     cursor: 'help',
 *     style: style,
 * });
 * // 将海量点实例添加到地图上
 * map.add(massMarks);
 */
export const addMassMarkers = (
  data: AMap.MassMarkersDataOption[],
  opts: AMap.MassMarkersOptions,
  callback: (e: Event) => void,
) => {
  const massMarks = new AMap.MassMarks(data, opts);
  if (callback) massMarks.on('click', callback);
  return massMarks;
};
