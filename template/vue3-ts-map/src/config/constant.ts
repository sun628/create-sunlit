import { ShallowRef } from 'vue';

/**
 * @description provide/inject key
 */

/**
 * 地图实例 key
 */
export const MapKey: InjectionKey<ShallowRef<AMap.Map | undefined>> = Symbol('MapKey');
