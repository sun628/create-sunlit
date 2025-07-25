/** 高德地图key */
export const MAP_KEY = '46f7b3ccdefa967beb1f1a632863e396';

export const cityCodes = 320000;

/** 安全密钥 */
export const SECURITY_JS_CODE = 'bb0d8cb4e090ffc683036af3b43269eb';

/** 地图配置项 */
export const MAP_OPTIONS: AMap.MapOptions = {
  center: [119.86533401075835, 32.3584429993217],
  animateEnable: true,
  zoomEnable: true,
  rotateEnable: true,
  zooms: [6, 20],
  zoom: 10,
  viewMode: '3D',
  // mapStyle: 'amap://styles/9031513b011ff6a394e2078df5fcfcc9', //设置地图的显示样式
  mapStyle: 'amap://styles/8ccb8763b2852ab3dcbb2913c0890d77' //设置地图的显示样式
} as const;

/** 地图插件 */
export const MAP_PLUGINS = ['AMap.Driving', 'AMap.MarkerCluster'];
