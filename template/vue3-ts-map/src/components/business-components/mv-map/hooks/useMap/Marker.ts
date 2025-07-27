/**
 * @description: 地图标记点相关Hook
 * @author: wangyang
 * @date: 2023-01-01
 */
import { onBeforeUnmount } from 'vue';
import { isLngLatLike } from '@/utils/is';
import { sharedMapRef } from '../useMapEventBus';

/** 默认经纬度字段名 */
const DEFAULT_LNG_LAT = ['lon', 'lat'] as const;

/** 标记图层配置选项类型 */
export interface MarkerLayerOptions<ExtraData> {
  /** 自定义经纬度字段名 [经度字段, 纬度字段] */
  lngLatFields?: [string, string];
  /** Marker配置选项 */
  markerOptions?: AMap.MarkerOptions<ExtraData>;
}

/** 标记点Hook返回值类型 */
export interface MarkerHookResult<ExtraData> {
  /** 添加单个标记点 */
  addMarker: (
    options: AMap.MarkerOptions<ExtraData>,
    clickCallback?: (e: AMap.MarkerEvent<ExtraData>, extData: ExtraData) => void
  ) => AMap.Marker<ExtraData>;

  /** 移除标记点 */
  removeMarker: (marker: AMap.Marker) => void;

  /** 创建标记点图层 */
  createMarkerLayer: (
    dataSource: Array<ExtraData & { active?: boolean }>,
    options?: MarkerLayerOptions<ExtraData>,
    clickCallback?: (e: AMap.MarkerEvent<ExtraData>, extData: ExtraData) => void
  ) => AMap.Marker[];

  /** 清除标记点图层 */
  removeMarkerLayer: (markers?: AMap.Marker | AMap.Marker[]) => void;
}

/**
 * @function
 * @description 添加点标记
 * @see https://lbs.amap.com/api/javascript-api-v2/documentation#marker
 * @template ExtraData 自定义数据类型
 * @param options 创建标记的配置选项
 * @param clickCallback 点击回调函数
 */
export const addMarker = <ExtraData>(
  options: AMap.MarkerOptions<ExtraData>,
  clickCallback?: (e: AMap.MarkerEvent<ExtraData>, extData: ExtraData) => void
): AMap.Marker<ExtraData> => {
  const marker: AMap.Marker<ExtraData> = new AMap.Marker<ExtraData>({
    ...options,
    cursor: 'pointer'
  });

  if (clickCallback) {
    marker.on('click', (e: AMap.MarkerEvent<ExtraData>) =>
      clickCallback(e, e.target.getExtData() as ExtraData)
    );
  }

  return marker;
};

/**
 * @function
 * @description 移除标记点
 * @param marker 标记点
 */
export const removeMarker = (marker: AMap.Marker): void => {
  marker.setMap(null);
};

/**
 * @function
 * @description 使用标记点相关功能
 * @template ExtraData 自定义数据类型
 * @param mapInstance 地图实例(可选，如果不传则通过EventBus共享获取)
 * @example
 * // 方式1: 直接传入地图实例
 * const { createMarkerLayer, removeMarkerLayer } = useMarker(map);
 *
 * // 方式2: 直接使用单例
 * const { createMarkerLayer, removeMarkerLayer } = useMarker();
 */
export const useMarker = <ExtraData extends Record<string, any>>(
  mapInstance?: MaybeRef<AMap.Map | undefined>
) => {
  // 所有标记点数组
  const allMarkers: AMap.Marker[] = [];

  // 尝试从不同来源获取地图实例
  const map = computed(() => {
    // 1. 优先使用传入的实例
    if (mapInstance) return unref(mapInstance);

    // 2. 否则使用共享的地图实例
    return sharedMapRef.value;
  });

  /**
   * @function
   * @description 创建点标记图层
   * @param dataSource 数据源
   * @param options 配置选项
   * @param clickCallback 点击回调
   */
  const createMarkerLayer = (
    dataSource: Array<ExtraData>,
    options?: MarkerLayerOptions<ExtraData>,
    clickCallback?: (e: AMap.MarkerEvent<ExtraData>, extData: ExtraData) => void
  ): AMap.Marker[] => {
    const { lngLatFields = DEFAULT_LNG_LAT, markerOptions } = options || {};
    const [lonField, latField] = lngLatFields;

    const layerMarkers: AMap.Marker[] = [];

    dataSource.forEach((item) => {
      // 检查经纬度数据有效性
      if (!isLngLatLike([item[lonField], item[latField]])) return console.warn('经纬度数据无效');

      const position = [item[lonField], item[latField]] as AMap.LngLatLike;

      const currentMarkerOptions = {
        position,
        extData: item,
        ...item,
        ...markerOptions
      };

      const marker = addMarker<ExtraData>(currentMarkerOptions, clickCallback);
      layerMarkers.push(marker);
      allMarkers.push(marker);
    });

    // 如果未在marker选项中指定map，则添加到当前map
    if (!markerOptions?.map && map.value) {
      map.value.add(layerMarkers);
    }

    return layerMarkers;
  };

  /**
   * @function
   * @description 清除标记点图层
   * @param markers 要清除的标记点或标记点数组，不传则清除所有标记点
   */
  const removeMarkerLayer = (markers?: AMap.Marker | AMap.Marker[]): void => {
    if (!map.value) return;

    if (markers) {
      // 将单个标记点转换为数组
      const markersArray = Array.isArray(markers) ? markers : [markers];

      if (markersArray.length) {
        map.value.remove(markersArray);

        const removeIds = markersArray.map((marker) => (marker as any)._amap_id);

        const remainingMarkers = allMarkers.filter(
          (marker) => !removeIds.includes((marker as any)._amap_id)
        );
        allMarkers.splice(0, allMarkers.length, ...remainingMarkers);
      }
    } else {
      // 清除所有标记点
      if (allMarkers.length) {
        map.value.remove(allMarkers);
        allMarkers.length = 0;
      }
    }
  };

  // 组件卸载时自动清除所有标记
  onUnmounted(() => {
    removeMarkerLayer();
  });

  return {
    addMarker,
    removeMarker,
    createMarkerLayer,
    removeMarkerLayer
  };
};

/**
 * @function
 * @description 创建海量点图层
 * @see https://lbs.amap.com/api/jsapi-v2/example/marker/massmarks
 * @param dataSource 数据源
 * @param options 配置选项
 * @param clickCallback 点击回调函数
 * @example
 * const massMarks = createMassMarkers(pointData, {
 *   opacity: 0.8,
 *   zIndex: 111,
 *   cursor: 'pointer',
 *   style: pointStyle
 * });
 * map.add(massMarks);
 */
export const createMassMarkers = (
  dataSource: AMap.MassMarkersDataOption[],
  options: AMap.MassMarkersOptions,
  clickCallback?: (e: Event) => void
): AMap.MassMarks => {
  const massMarks = new AMap.MassMarks(dataSource, options);

  if (clickCallback) {
    massMarks.on('click', clickCallback);
  }

  return massMarks;
};
