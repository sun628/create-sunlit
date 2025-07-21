/**
 * @function
 * @description 构造折线对象，支持 lineString 和 MultiLineString
 * @see  https://lbs.amap.com/api/javascript-api-v2/documentation#polyline
 * @param {AMap.PolylineOptions} opts 折线配置项
 * @param callback
 * @returns {AMap.Polyline} 折线对象
 */
export const addPolyline = <ExtraData>(
  opts: AMap.PolylineOptions,
  callback?: (event: AMap.PolylineEvent<ExtraData>, extData: ExtraData) => void
) => {
  const polyline: AMap.Polyline<ExtraData> = new AMap.Polyline({
    path: opts.path,
    cursor: 'pointer', // 指定鼠标悬停时的鼠标样式，自定义cursor
    borderWeight: 3, // 描边的宽度，默认为1
    strokeWeight: 6, // 线条宽度，单位：像素
    strokeOpacity: 1, // 轮廓线透明度，取值范围[0,1]，0 表示完全透明，1表示不透明
    lineJoin: 'round', // 折线拐点的绘制样式，默认值为'miter'尖角，其他可选值：'round'圆角、'bevel'斜角
    lineCap: 'round', // 折线两端线帽的绘制样式，默认值为'butt'无头，其他可选值：'round'圆头、'square'方头
    ...opts,
  });
  if (callback)
    polyline.on('click', (e: AMap.PolylineEvent<ExtraData>) =>
      callback(e, e.target.getExtData() as ExtraData)
    );
  return polyline;
};

export const usePolyline = () => {
  let map: AMap.Map | null | undefined = null;
  const polylineList: AMap.Polyline[] = [];

  /**
   * @function
   * @description 绘制折线Polyline
   * @param Map
   * @template ExtraData 数据源类型
   * @param { Array<ExtraData> } dataList 数据列表
   * @param { AMap.PolylineOptions | (e: AMap.PolylineEvent<ExtraData>, extData: ExtraData) => void } arg3 点标记点击事件 或者 点标记配置项
   * @param { (e: AMap.PolylineEvent<ExtraData>, extData: ExtraData) => void } arg4 点标记点击事件
   * @returns { AMap.Polyline<ExtraData>[] } markerList 点标记列表
   **/
  const drawPolyline = <ExtraData extends { path: AMap.Line | AMap.Line[]; strokeColor?: string }>(
    Map: AMap.Map | null | undefined,
    dataList: Array<ExtraData>,
    arg3?: AMap.PolylineOptions | ((e: AMap.PolylineEvent<ExtraData>, extData: ExtraData) => void),
    arg4?: (e: AMap.PolylineEvent<ExtraData>, extData: ExtraData) => void
  ) => {
    map = Map;
    clearPolyline(); // 这个函数需要实现，用来清除地图上已经画的所有折线

    let options: AMap.PolylineOptions | undefined;
    let callback: ((e: AMap.PolylineEvent<ExtraData>, extData: ExtraData) => void) | undefined;

    if (typeof arg3 === 'function') {
      callback = arg3;
    } else if (typeof arg3 === 'object') {
      options = arg3;
      if (typeof arg4 === 'function') {
        callback = arg4;
      }
    }

    dataList.forEach((item) => {
      const defaultOptions: AMap.PolylineOptions = {
        path: item.path,
        strokeColor: item?.strokeColor || '#3366FF', // 默认蓝色
        strokeOpacity: 1.0,
        strokeWeight: 5,
        extData: item,
      };

      const mergedOptions = { ...defaultOptions, ...options };
      const polyline = addPolyline<ExtraData>(mergedOptions, callback);
      polylineList.push(polyline);
    });

    map?.add(polylineList);
    return polylineList;
  };

  const clearPolyline = () => {
    if (map && polylineList.length) {
      map.remove(polylineList);
      polylineList.length = 0;
    }
  };

  onBeforeUnmount(() => {
    clearPolyline();
    map = null;
  });

  return {
    addPolyline,
    drawPolyline,
    clearPolyline,
  };
};
