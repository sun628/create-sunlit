import AMapLoader from '@amap/amap-jsapi-loader';
import { mapConfig } from '@/config';
import { onBeforeUnmount } from 'vue';

const { MAP_KEY, MAP_PLUGINS, SECURITY_JS_CODE } = mapConfig;

window._AMapSecurityConfig = {
  securityJsCode: SECURITY_JS_CODE,
};
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
 * @todo 构造折线对象，支持 lineString 和 MultiLineString
 * @see  https://lbs.amap.com/api/javascript-api-v2/documentation#polyline
 * @param {AMap.PolylineOptions} opts 折线配置项
 * @param callback
 * @returns {AMap.Polyline} 折线对象
 */
export const addPolyline = <ExtraData>(
  opts: AMap.PolylineOptions,
  callback?: (event: AMap.PolylineEvent<ExtraData>, extData: ExtraData) => void,
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
      callback(e, e.target.getExtData() as ExtraData),
    );
  return polyline;
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

export const usePolyline = () => {
  let map: AMap.Map | null | undefined = null;
  const polylineList: AMap.Polyline[] = [];

  /**
   * @function
   * @todo 绘制折线Polyline
   * @param Map
   * @param { Array<ExtraData> } dataList 数据列表
   * @param { AMap.PolylineOptions | (e: AMap.PolylineEvent<ExtraData>, extData: ExtraData) => void } arg3 点标记点击事件 或者 点标记配置项
   * @param { (e: AMap.PolylineEvent<ExtraData>, extData: ExtraData) => void } arg4 点标记点击事件
   * @returns { AMap.Polyline<ExtraData>[] } markerList 点标记列表
   **/
  const drawPolyline = <ExtraData extends { path: AMap.Line | AMap.Line[]; strokeColor?: string }>(
    Map: AMap.Map | null | undefined,
    dataList: Array<ExtraData>,
    arg3?: AMap.PolylineOptions | ((e: AMap.PolylineEvent<ExtraData>, extData: ExtraData) => void),
    arg4?: (e: AMap.PolylineEvent<ExtraData>, extData: ExtraData) => void,
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

/**
 * @class DrivingService
 * @classdesc 用于创建驾车路线规划服务实例，提供根据坐标或关键词进行路线规划的功能。
 *
 * @param {DrivingOptions} drivingOptions - 驾车路线规划的选项。
 *      - {number} strategy 19，返回的结果会优先选择高速路，与高德地图的“高速优先”策略一致
 * @property {Driving} driving - 高德地图驾车服务实例。
 * @example
    const drivingService = new DrivingService({
      policy: 19,
      map: map.value,
    });
    drivingService.searchByLngLat(
      [116.397428, 39.90923],
      [116.397428, 39.90923],
      (status, result) => {
        console.log('搜索结果', status, result);
      },
    );
 **/
export class DrivingService {
  private driving: AMap.Driving | null = null;

  /**
   * 构造函数，初始化 Driving 实例
   * @param drivingOptions 驾车路线规划的选项
   */
  constructor(drivingOptions: AMap.DrivingOptions) {
    AMap.plugin(['AMap.Driving'], () => {
      this.driving = new AMap.Driving(drivingOptions);
    });
  }

  /**
   * 根据起点和终点坐标进行驾车路线规划
   * @param origin 起点经纬度
   * @param destination 终点经纬度
   * @param callback 回调函数（可选）
   */
  public searchByLngLat(
    origin: AMap.LngLatLike,
    destination: AMap.LngLatLike,
    callback?: AMap.DrivingCallback,
  ): void {
    this.executeSearch([origin, destination], callback);
  }

  /**
   * 根据起点、终点和途经点名称进行驾车路线规划
   * @param points 起点、终点和途经点的数组,第一个元素和最后一个元素作为起点和终点，中间元素为途经点，最多支持传入16个途经点。
   * @param callback 回调函数（可选）
   */
  public searchByKeywords(points: AMap.waypoints, callback?: AMap.DrivingCallback): void {
    this.executeSearch(points, callback);
  }

  /**
   * 根据起点、终点和途经点经纬度进行驾车路线规划
   * @param origin 起点经纬度
   * @param destination 终点经纬度
   * @param options 途经点选项（可选）
   * @param callback 回调函数（可选）
   */
  public searchWithWaypoints(
    origin: AMap.LngLatLike,
    destination: AMap.LngLatLike,
    options: { waypoints?: AMap.waypoints },
    callback?: AMap.DrivingCallback,
  ): void {
    const searchArgs: any[] = [origin, destination];
    if (options && options.waypoints) {
      searchArgs.push(options.waypoints);
    }
    this.executeSearch(searchArgs, callback);
  }

  /**
   * 执行驾车路线规划搜索
   * @param args 搜索参数
   * @param callback 回调函数（可选）
   */
  private executeSearch(args: any[], callback?: AMap.DrivingCallback): void {
    if (!this.driving) {
      throw new Error('Driving instance is not initialized.');
    }
    if (callback) {
      (this.driving.search as any)(...args, callback);
    } else {
      (this.driving.search as any)(...args);
    }
  }
}

let borderPolygon: AMap.Polygon | null = null;

/**
 * @description 加载地图UI组件
 * @param {AMap.Map} map 地图实例
 * @param cityCodes
 * @returns { ConcatArray<number>} cityCodes 城市编码
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
