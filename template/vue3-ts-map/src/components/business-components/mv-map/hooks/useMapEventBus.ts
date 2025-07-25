/**
 * @description: 基于EventBus实现地图实例共享
 * @author: wangyang
 * @date: 2025-07-25
 */
import { useEventBus } from '@vueuse/core';
import { shallowRef } from 'vue';

// 定义地图相关事件的常量
const MAP_EVENT_KEY = 'map:instance';

// 定义共享的地图实例引用
export const sharedMapRef = shallowRef<AMap.Map | null>(null);

// 创建事件总线实例
const eventBus = useEventBus<AMap.Map>(MAP_EVENT_KEY);

// 添加一次性的默认监听，确保地图实例被正确共享
eventBus.on((map) => {
  sharedMapRef.value = map;
});

/**
 * @function
 * @description 获取地图实例共享事件总线
 * @returns 地图事件总线相关方法
 */
export const useMapEventBus = () => {
  const { on, once, emit, off, reset } = eventBus;

  /**
   * @function
   * @description 设置并广播地图实例
   * @param mapInstance 地图实例
   */
  const setMapInstance = (mapInstance: AMap.Map) => {
    // 更新共享引用
    sharedMapRef.value = mapInstance;
    // 广播地图实例
    emit(mapInstance);
  };

  /**
   * @function
   * @description 监听地图实例事件
   * @param callback 回调函数
   * @returns 取消监听函数
   */
  const onMapReady = (callback: (map: AMap.Map) => void) => {
    // 如果已经有地图实例，直接调用回调
    if (sharedMapRef.value) {
      callback(sharedMapRef.value);
      return () => {};
    }

    // 否则注册监听
    return on((map) => {
      callback(map);
    });
  };

  /**
   * @function
   * @description 一次性监听地图实例事件
   * @param callback 回调函数
   * @returns 取消监听函数
   */
  const onceMapReady = (callback: (map: AMap.Map) => void) => {
    // 如果已经有地图实例，直接调用回调
    if (sharedMapRef.value) {
      callback(sharedMapRef.value);
      return () => {};
    }

    // 否则注册一次性监听
    return once((map) => {
      callback(map);
    });
  };

  /**
   * @function
   * @description 获取地图实例（当前值或等待加载）
   * @param callback 可选的回调函数，地图实例可用时调用
   * @returns 当前地图实例引用
   */
  const getMapInstance = (callback?: (map: AMap.Map) => void) => {
    if (callback) {
      onMapReady(callback);
    }
    return sharedMapRef;
  };

  return {
    setMapInstance,
    onMapReady,
    onceMapReady,
    offMapReady: off,
    resetMapEvents: reset,
    getMapInstance,
    mapRef: sharedMapRef
  };
};

// 创建并导出单例引用，方便直接使用
export const mapEventBus = useMapEventBus();
