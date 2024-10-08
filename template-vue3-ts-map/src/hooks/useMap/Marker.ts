/**
 * @function
 * @todo 添加点标记
 * @see https://lbs.amap.com/api/javascript-api-v2/documentation#marker
 * @param {AMap.MarkerOptions} opts 点标记参数
 *      - {AMap.LngLatLike } position 点标记位置
 *      - {string | AMap.Icon } icon 点标记图标
 *      - { AMap.PixelLike } offset 点标记显示位置偏移量，默认值为 [0,0]。若需使marker指定位置对准在position处，需根据marker的尺寸设置一定的偏移量。
 *      - {((e: AMap.MarkerEvent<ExtraData>, extData: ExtraData) => void) | undefined } callback 点标记点击事件
 *      - {AMap.MarkerEvent<ExtraData>,ExtraData} e 点标记对象 此对象用于表示地图、覆盖物、叠加层上的各种鼠标事件返回,extraData 自定义数据
 * @param callback
 * @returns {AMap.Marker} 点标记对象
 */
export const addMarker = <ExtraData = any>(
  opts: AMap.MarkerOptions<ExtraData> & { exData?: ExtraData },
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

/**
 * @function
 * @todo 使用marker
 * @example
 * const {drawMarker}=useMarker()
 **/
export const useMarker = () => {
  const markerList: AMap.Marker[] = [];
  let map: AMap.Map | null | undefined = null;

  /**
   * @function
   * @description 绘制点标记marker
   * @todo
   * @param Map
   * @param { Array<ExtraData> } dataList 数据列表
   * @param {  AMap.MarkerOptions | ((e: AMap.MarkerEvent<ExtraData>, extData: ExtraData) => void} arg3 点标记点击事件 或者 点标记配置项
   * @param {(e: AMap.MarkerEvent<ExtraData>, extData: ExtraData) => void } arg4 点标记点击事件
   * @returns { AMap.Marker<ExtraData>[] } markerList 点标记列表
   **/
  const drawMarker = <ExtraData extends { lon: number; lat: number; icon?: AMap.Icon | string }>(
    Map: AMap.Map | null | undefined,
    dataList: Array<ExtraData>,
    arg3?: AMap.MarkerOptions | ((e: AMap.MarkerEvent<ExtraData>, extData: ExtraData) => void),
    arg4?: (e: AMap.MarkerEvent<ExtraData>, extData: ExtraData) => void,
  ) => {
    clearMarker();
    map = Map;

    let options: AMap.MarkerOptions | undefined;
    let callback: ((e: AMap.MarkerEvent<ExtraData>, extData: ExtraData) => void) | undefined;

    if (typeof arg3 === 'function') {
      callback = arg3;
    } else if (typeof arg3 === 'object') {
      options = arg3;
      if (typeof arg4 === 'function') {
        callback = arg4;
      }
    }

    dataList.forEach((item) => {
      const defaultOptions: AMap.MarkerOptions = {
        position: [item.lon, item.lat],
        icon: item.icon,
        offset: new AMap.Pixel(-13, -35), //以 icon 的 [center bottom] 为原点
        extData: item,
      };
      const mergedOptions = { ...defaultOptions, ...options };
      const marker = addMarker<ExtraData>(mergedOptions, callback);
      markerList.push(marker);
    });
    if (map) {
      !!map && map.add(markerList);
    }
    return markerList;
  };
  /**
   * @function
   * @todo 清除点标记
   **/
  const clearMarker = () => {
    if (map && markerList.length) {
      map.remove(markerList);
      markerList.length = 0;
    }
  };
  onBeforeUnmount(() => {
    clearMarker();
    map = null;
  });
  return {
    addMarker,
    drawMarker,
    clearMarker,
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
