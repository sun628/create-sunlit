declare let AMapUI: any;

let borderPolygon: AMap.Polygon | null = null; // 边界多边形

const countryCode = 100000; //全国
/**
 * @function
 * @description 获取多边形
 * @param feature 多边形
 * @returns {AMap.LngLat[]} 多边形
 **/
function getAllRings(feature) {
  const coords = feature.geometry.coordinates;
  const rings: AMap.LngLat[] = [];
  for (let i = 0, len = coords.length; i < len; i++) {
    rings.push(coords[i][0]);
  }
  return rings;
}

/**
 * @description 绘制
 * @param {AMap.Map} map 地图实例
 * @param {ConcatArray<number>} cityCodes 城市代码
 **/
export const createProvince = (map: AMap.Map, provCodes: number[], cityCodes: number[] = []) => {
  AMapUI.loadUI(['geo/DistrictExplorer'], (DistrictExplorer: any) => {
    //创建一个实例
    const districtExplorer = new DistrictExplorer({
      map: map
    });

    const districtCodes = Array.isArray(cityCodes) ? cityCodes : [cityCodes];
    const PROVICE_OUTER = [
      new AMap.LngLat(-360, 90, true),
      new AMap.LngLat(-360, -90, true),
      new AMap.LngLat(360, -90, true),
      new AMap.LngLat(360, 90, true)
    ];

    districtExplorer.loadMultiAreaNodes(
      //只需加载全国和市，全国的节点包含省级
      [countryCode].concat(districtCodes),
      (error: any, areaNodes: any[]) => {
        const countryNode = areaNodes[0],
          cityNodes = areaNodes.slice(1);

        const path: AMap.LngLat[] = [];

        path.push(PROVICE_OUTER as unknown as AMap.LngLat);
        //首先放置背景区域，这里是大陆的边界
        // path.push(getLongestRing(countryNode.getParentFeature()));

        for (let i = 0, len = provCodes.length; i < len; i++) {
          //逐个放置需要镂空的省级区域
          path.push(...getAllRings(countryNode.getSubFeatureByAdcode(provCodes[i])));
        }

        for (let i = 0, len = cityNodes.length; i < len; i++) {
          //逐个放置需要镂空的市级区域
          path.push(...getAllRings(cityNodes[i].getParentFeature()));
        }

        // 绘制带环多边形;
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
          path: path
        });
      }
    );
  });
};
