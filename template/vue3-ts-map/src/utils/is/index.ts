import { isString } from 'radash';
/**
 * @function
 * @description  是否为经纬度LngLatLike数组
 * @returns {boolean}
 **/
export function isLngLatLike(arg: any): arg is [number, number] {
  return Array.isArray(arg) && arg.length === 2 && arg.every((item) => typeof item === 'number');
}

/**
 * @function
 * @description 校验是否为车牌号
 * @param val 车牌号
 * @returns {boolean}
 **/
export function isValidLicense(val: unknown): val is boolean {
  if (!isString(val)) return false;
  // 包括新能源车辆、军队车辆、武警车辆、警车和普通车辆的正则表达式
  const patterns = [
    /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼][A-Z][A-HJ-NP-Z0-9]{5}$/, // 普通车辆
    /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼][A-Z][DF][A-HJ-NP-Z0-9][0-9]{4}$/, // 新能源车辆
    /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼][A-Z]([0-9]{5}|[DF][A-HJ-NP-Z0-9][0-9]{4})$/, // 包括新能源车的普通车辆
    /^WJ[0-9]{5}[A-HJ-NP-Z]$/, // 军队车辆
    /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼]?警[A-Z][0-9]{4}$/, // 警车，假设“警”字后面是一个字母和四个数字
    /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼][A-Z][0-9]{4}警$/, // 可能的地方性警车车牌
    /^民航[A-Z][0-9]{5}$/, // 民航车辆
    // 更多的车牌格式
  ];

  // 验证车牌号是否匹配以上任一正则表达式
  return patterns.some((pattern) => pattern.test(val));
}
