/**
 * @description: TSX辅助工具函数
 * @author: AI助手
 * @date: 当前日期
 */

import type { Slots } from 'vue';

/**
 * @function
 * @description 获取插槽内容
 * @param {Slots} slots - 组件插槽对象
 * @param {string} [slot='default'] - 插槽名称，默认为'default'
 * @param {Record<string, unknown>} [data={}] - 插槽props数据
 * @returns {unknown} 返回插槽渲染内容
 */
export function getSlot(slots: Slots, slot = 'default', data: Record<string, unknown> = {}) {
  if (!slots || !Reflect.has(slots, slot)) {
    return null;
  }

  const slotFn = slots[slot];
  if (!slotFn) {
    return null;
  }

  return slotFn(data);
}

/**
 * extends slots
 * @param slots
 * @param excludeKeys
 */
export function extendSlots(slots: Slots, excludeKeys: string[] = []) {
  const slotKeys = Object.keys(slots);
  const ret: any = {};
  slotKeys.map((key) => {
    if (excludeKeys.includes(key)) {
      return null;
    }
    ret[key] = () => getSlot(slots, key);
  });
  return ret;
}
