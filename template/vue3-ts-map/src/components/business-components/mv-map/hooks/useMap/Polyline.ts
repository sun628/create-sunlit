/**
 * @description: 地图折线相关Hook
 * @author: wangyang
 * @date: 2023-01-01
 */
import { onBeforeUnmount } from 'vue';
import { sharedMapRef } from '../useMapEventBus';

/** 折线图层配置选项类型 */
export interface PolylineLayerOptions<ExtraData> {
  /** Polyline配置选项 */
  polylineOptions?: AMap.PolylineOptions<ExtraData>;
}

/** 折线Hook返回值类型 */
export interface PolylineHookResult<ExtraData> {
  /** 添加单个折线 */
  addPolyline: (
    options: AMap.PolylineOptions<ExtraData>,
    clickCallback?: (event: AMap.PolylineEvent<ExtraData>, extData: ExtraData) => void
  ) => AMap.Polyline<ExtraData>;

  /** 绘制折线图层 */
  createLineLayer: <T extends AMap.PolylineOptions<ExtraData>>(
    dataSource: Array<T & ExtraData>,
    options?: PolylineLayerOptions<T & ExtraData>,
    clickCallback?: (e: AMap.PolylineEvent<T & ExtraData>, extData: T & ExtraData) => void
  ) => AMap.Polyline<T & ExtraData>[];

  /** 清除折线图层 */
  removeLineLayer: () => void;
}

/**
 * @function
 * @description 构造折线对象，支持 lineString 和 MultiLineString
 * @see  https://lbs.amap.com/api/javascript-api-v2/documentation#polyline
 * @template ExtraData 自定义数据类型
 * @param {AMap.PolylineOptions} options 折线配置项
 * @param clickCallback 点击回调函数
 * @returns {AMap.Polyline} 折线对象
 */
export const addPolyline = <ExtraData>(
  options: AMap.PolylineOptions<ExtraData>,
  clickCallback?: (event: AMap.PolylineEvent<ExtraData>, extData: ExtraData) => void
) => {
  const polyline: AMap.Polyline<ExtraData> = new AMap.Polyline({
    path: options.path,
    cursor: 'pointer', // 指定鼠标悬停时的鼠标样式，自定义cursor
    borderWeight: 3, // 描边的宽度，默认为1
    strokeWeight: 6, // 线条宽度，单位：像素
    strokeOpacity: 1, // 轮廓线透明度，取值范围[0,1]，0 表示完全透明，1表示不透明
    lineJoin: 'round', // 折线拐点的绘制样式，默认值为'miter'尖角，其他可选值：'round'圆角、'bevel'斜角
    lineCap: 'round', // 折线两端线帅的绘制样式，默认值为'butt'无头，其他可选值：'round'圆头、'square'方头
    ...options
  });

  if (clickCallback) {
    polyline.on('click', (e: AMap.PolylineEvent<ExtraData>) =>
      clickCallback(e, e.target.getExtData() as ExtraData)
    );
  }

  return polyline;
};

/**
 * @function
 * @description 使用折线相关功能
 * @template ExtraData 自定义数据类型
 * @param mapInstance 地图实例(可选，如果不传则通过EventBus共享获取)
 * @example
 * // 方式1: 直接传入地图实例
 * const { createLineLayer, removeLineLayer } = usePolyline(map);
 *
 * // 方式2: 直接使用单例
 * const { createLineLayer, removeLineLayer } = usePolyline();
 */
export const usePolyline = <ExtraData extends Record<string, any> = Record<string, any>>(
  mapInstance?: MaybeRef<AMap.Map | undefined>
): PolylineHookResult<ExtraData> => {
  // 所有折线数组
  const polylineList: AMap.Polyline[] = [];

  // 尝试从不同来源获取地图实例
  const map = computed(() => {
    // 1. 优先使用传入的实例
    if (mapInstance) return unref(mapInstance);

    // 2. 否则使用共享的地图实例
    return sharedMapRef.value;
  });

  /**
   * @function
   * @description 绘制折线图层
   * @template T 数据源类型，必须包含path属性
   * @param dataSource 数据列表
   * @param options 配置选项
   * @param clickCallback 点击回调函数
   * @returns 折线对象列表
   */
  const createLineLayer = <T extends AMap.PolylineOptions<ExtraData>>(
    dataSource: Array<T & ExtraData>,
    options?: PolylineLayerOptions<T & ExtraData>,
    clickCallback?: (e: AMap.PolylineEvent<T & ExtraData>, extData: T & ExtraData) => void
  ) => {
    removeLineLayer(); // 清除已有折线

    const layerPolylines: AMap.Polyline<T & ExtraData>[] = [];
    const { polylineOptions } = options || {};

    dataSource.forEach((item) => {
      const defaultOptions: AMap.PolylineOptions = {
        path: item.path,
        strokeColor: item?.strokeColor || '#3366FF', // 默认蓝色
        strokeOpacity: 1.0,
        strokeWeight: 5,
        extData: item
      };

      const mergedOptions = { ...defaultOptions, ...polylineOptions };
      const polyline = addPolyline<T & ExtraData>(mergedOptions, clickCallback);
      layerPolylines.push(polyline);
      polylineList.push(polyline);
    });

    // 如果地图实例存在，添加折线到地图
    if (map.value) {
      map.value.add(layerPolylines);
    }

    return layerPolylines;
  };

  /**
   * @function
   * @description 清除所有折线
   */
  const removeLineLayer = () => {
    if (map.value && polylineList.length) {
      map.value.remove(polylineList);
      polylineList.length = 0;
    }
  };

  // 组件卸载时自动清除所有折线
  onBeforeUnmount(() => {
    removeLineLayer();
  });

  return {
    addPolyline,
    createLineLayer,
    removeLineLayer
  };
};
