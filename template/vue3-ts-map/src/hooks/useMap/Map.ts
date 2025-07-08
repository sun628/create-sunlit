import AMapLoader from '@amap/amap-jsapi-loader';
import { mapConfig } from '@/config';

const { MAP_KEY, MAP_PLUGINS, SECURITY_JS_CODE } = mapConfig;

window._AMapSecurityConfig = {
  securityJsCode: SECURITY_JS_CODE,
};

let borderPolygon: AMap.Polygon | null = null; // 边界多边形

/**
 * @description 初始化地图
 * @param {string} id 地图容器id
 * @param {Object} mapOptions 地图配置
 */
export const initMap = (
  id: string | HTMLDivElement,
  mapOptions: Partial<AMap.MapOptions> | undefined,
) => {
  return new Promise<AMap.Map>((resolve, reject) => {
    AMapLoader.load({
      key: MAP_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: MAP_PLUGINS, //插件列表
      AMapUI: {
        version: '1.1',
        plugins: ['geo/DistrictExplorer'],
      },
    })
      .then((AMap) => {
        const map: AMap.Map = new AMap.Map(id, mapOptions);
        resolve(map);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

/**
 * @description 加载地图UI组件
 * @param {AMap.Map} map 地图实例
 * @param {ConcatArray<number>} cityCodes 城市代码
 **/
export const loadMapUI = (map: AMap.Map, cityCodes: ConcatArray<number>) => {
  const countryCode = 100000; // 全国{
  const provCodes: string[] = [];
  // cityCodes = ['320700', '320900', '320600'];
  function getAllRings(feature) {
    const coords = feature.geometry.coordinates;
    const rings: Array<[number, number]>[] = [];
    for (let i = 0, len = coords.length; i < len; i++) {
      rings.push(coords[i][0]);
    }
    return rings;
  }
  function getLongestRing(feature) {
    const rings = getAllRings(feature);
    rings.sort(function (a, b) {
      return b.length - a.length;
    });
    return rings[0];
  }
  AMapUI.loadUI(['geo/DistrictExplorer'], (DistrictExplorer) => {
    const districtExplorer = new DistrictExplorer({
      map: map,
    });
    districtExplorer.loadMultiAreaNodes(
      // 只需加载全国和市，全国的节点包含省级
      [countryCode].concat(cityCodes),
      function (_error, areaNodes: string | any[]) {
        const countryNode = areaNodes[0];
        const cityNodes = areaNodes.slice(1);
        const path: Array<[number, number]>[] = [];
        // 首先放置背景区域，这里是大陆的边界
        path.push(getLongestRing(countryNode.getParentFeature()));
        for (let i = 0, len = provCodes.length; i < len; i++) {
          // 逐个放置需要镂空的省级区域
          // eslint-disable-next-line prefer-spread
          path.push.apply(path, getAllRings(countryNode.getSubFeatureByAdcode(provCodes[i])));
        }
        for (let i = 0, len = cityNodes.length; i < len; i++) {
          // 逐个放置需要镂空的市级区域
          // eslint-disable-next-line prefer-spread
          path.push.apply(path, getAllRings(cityNodes[i].getParentFeature()));
        }
        // 绘制带环多边形
        // https://lbs.amap.com/api/javascript-api/reference/overlay#Polygon
        if (borderPolygon) {
          map.remove(borderPolygon);
          borderPolygon = null;
        }
        borderPolygon = new AMap.Polygon({
          bubble: true,
          strokeColor: '#59A1BC', // 线颜色
          strokeOpacity: 0.8, // 线透明度
          strokeWeight: 2, // 线宽
          fillColor: '#000000', // 填充色
          fillOpacity: 0.35, // 填充透明度
          map: map,
          path: path,
        });
      },
    );
  });
};
