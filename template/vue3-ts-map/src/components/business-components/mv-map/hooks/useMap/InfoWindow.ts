/**
 * @function createInfoWindow
 * @description 信息窗体，地图仅可同时展示一个信息窗体，推荐为信息窗体通过样式显示设置尺寸。[自定义窗体示例](https://lbs.amap.com/api/jsapi-v2/example/infowindow/default-style-infowindow)
 * @param {string | AMap.InfoWindowOptions} opts 信息窗体参数
 * @param {boolean} [opts.isCustom=false] 是否自定义窗体
 * @example
 * const infoWindow = createInfoWindow({ content: '这是一个自定义的信息窗体' });
 * infoWindow.open(map, map.getCenter());
 */
export const createInfoWindow = (opts: string | AMap.InfoWindowOptions): AMap.InfoWindow => {
  if (typeof opts === 'string') {
    return new AMap.InfoWindow({
      isCustom: true, // 使用自定义窗体
      content: opts, // 信息窗体的内容可以是任意 html 片段
      offset: new AMap.Pixel(16, -45)
    });
  } else {
    return new AMap.InfoWindow(opts);
  }
};
