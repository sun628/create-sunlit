/**
 * @function createInfoWindow
 * @todo 信息窗体，地图仅可同时展示一个信息窗体，推荐为信息窗体通过样式显示设置尺寸。[自定义窗体示例](https://lbs.amap.com/api/jsapi-v2/example/infowindow/default-style-infowindow)
 * @param {string | AMap.InfoWindowOptions} opts 信息窗体参数，包含以下属性：
 * @param {boolean} [opts.isCustom=false] 是否自定义窗体
 * @param {boolean} [opts.autoMove=false] 是否自动调整窗体到视野内
 * @param {number[]} [opts.avoid=[20, 20, 20, 20]] autoMove为true时的避让宽度
 * @param {boolean} [opts.closeWhenClickMap=false] 控制是否在鼠标点击地图后关闭信息窗体
 * @param {String|HTMLElement} opts.content 显示内容，可以是HTML要素字符串或者HTMLElement对象
 * @param {Size} [opts.size] 信息窗体尺寸（isCustom为true时，该属性无效）
 * @param {string} [opts.anchor='bottom-center'] 信息窗体锚点
 * @param {Vector|Pixel} [opts.offset=[0, 0]] 信息窗体显示位置偏移量
 * @param {Vector|LngLat} opts.position 信息窗体显示基点位置
 * @example
 * const infoWindow = createInfoWindow({ content: '这是一个自定义的信息窗体' });
 * infoWindow.open(map, map.getCenter());
 */
export const createInfoWindow = (opts: string | AMap.InfoWindowOptions): AMap.InfoWindow => {
  if (typeof opts === 'string') {
    return new AMap.InfoWindow({
      isCustom: true, // 使用自定义窗体
      content: opts, // 信息窗体的内容可以是任意 html 片段
      offset: new AMap.Pixel(16, -45),
    });
  } else {
    return new AMap.InfoWindow(opts);
  }
};
