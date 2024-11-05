import { onBeforeUnmount } from 'vue';
/**
 * @function
 * @todo 添加点标记
 * @see https://lbs.amap.com/api/javascript-api-v2/documentation#marker
 * @template ExtraData 自定义数据类型
 * @param {AMap.MarkerOptions<ExtraData>} opts - 创建标记的配置选项，包括基本设置和事件监听器，允许对标记的外观和行为进行广泛的自定义。
 * @param {(e: AMap.MarkerEvent<ExtraData>, extData: ExtraData) => void} callback - 点击回调函数，参数为点击事件对象和自定义数据。
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

export type MarkerClickHandler<ExtraData> = {
  (e: AMap.MarkerEvent<ExtraData>, extData: ExtraData): void;
};

export type MarkerLayerOptions<ExtraData> = {
  iconActive: AMap.Icon | string;
  LngLat?: [string, string]; // 自定义经纬度字段
  options?: AMap.MarkerOptions<ExtraData>; // Marker选项
};

/** 默认匹配字段 */
const DefaultLngLat = ['lon', 'lat'] as const;
// const map = shallowRef<AMap.Map>();
let map: ComputedRef<AMap.Map | undefined>;
/**
 * @function
 * @todo 使用marker
 * @example
 * const { createMarkerLayer,clearMarkerLayer}=useMarker()
 **/
export const useMarker = (Map: MaybeRef<AMap.Map | undefined>) => {
  const markerArr: AMap.Marker[] = [];
  map = computed(() => {
    return unref(Map);
  });
  /**
   * @function
   * @todo 绘制marker群组图层
   * @param { Array } data 数据源
   * @param markerLayerOptions
   * @param callback
   **/
  const createMarkerLayer = <ExtraData = any>(
    data: Array<ExtraData>,
    markerLayerOptions?: MarkerLayerOptions<ExtraData>, // 使用封装的类型
    callback?: MarkerClickHandler<ExtraData>,
  ) => {
    clearMarkerLayer();
    const { iconActive, LngLat = DefaultLngLat, options } = markerLayerOptions || {};
    const [lon, lat] = LngLat;
    const markerClickHandler: MarkerClickHandler<ExtraData> = (
      e: AMap.MarkerEvent<ExtraData>,
      extData: ExtraData,
    ) => {
      const target = e.target; // 获取当前点击的marker
      iconActive && target.setIcon(iconActive);
      callback && callback(e, extData);
    };
    data.forEach((item) => {
      if (!item[lon] || !item[lat]) return;
      const position = [item[lon], item[lat]] as AMap.LngLatLike;
      const markerOptions = { position, ...item, ...options };
      const marker = addMarker<ExtraData>(markerOptions, markerClickHandler);
      markerArr.push(marker);
    });
    console.log(map.value);
    map.value?.add(markerArr);
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
 * @name addMassMarkers
 * @param {Array<AMap.MassMarkersDataOption>} data 数据源
 * @param {AMap.MassMarkersOptions} opts 配置项
 * @param {(e: Event) => void} callback 回调函数
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
