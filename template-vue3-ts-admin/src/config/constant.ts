import { ShallowRef, InjectionKey } from 'vue';

/**
 * @description provide/inject key
 */

/**
 * 自定义provide/inject key
 */

export const NameKey: InjectionKey<ShallowRef<string>> = Symbol('NameKey');
