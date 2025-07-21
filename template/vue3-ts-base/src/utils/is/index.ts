import { isString } from 'lodash-es';

// 定义车牌号正则表达式
const LICENSE_PATTERNS = {
  // 普通车牌（含新能源）
  NORMAL:
    /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼][A-Z](?:[A-HJ-NP-Z0-9]{5}|[DF][A-HJ-NP-Z0-9][0-9]{4})$/,
  // 军队车牌
  MILITARY: /^WJ[0-9]{5}[A-HJ-NP-Z]$/,
  // 警车车牌（包含普通警车和地方性警车）
  POLICE:
    /^(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼]?警[A-Z][0-9]{4}|[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼][A-Z][0-9]{4}警)$/,
  // 民航车牌
  CIVIL_AVIATION: /^民航[A-Z][0-9]{5}$/
} as const;

/**
 * @function
 * @description 校验是否为合法的中国车牌号（支持普通车牌、新能源、军队、警车、民航等）
 * @param val 待校验的车牌号
 * @returns {boolean} 是否为合法车牌号
 */
export function isValidLicense(val: unknown): boolean {
  if (!isString(val)) return false;
  return Object.values(LICENSE_PATTERNS).some((pattern) => pattern.test(val));
}

/**
 * @function
 * @description 校验是否是空字符串、null或undefined
 * @param val 任意值
 * @returns {boolean}
 **/
export function isEmptyStr(val: unknown): boolean {
  if (val === null || typeof val === 'undefined') return true;
  return isString(val) && val.trim() === '';
}

/**
 * @function
 * @description  是否为经纬度LngLatLike数组
 * @returns {boolean}
 **/
export function isLngLatLike(arg: any): arg is [number, number] {
  return Array.isArray(arg) && arg.length === 2 && arg.every((item) => typeof item === 'number');
}
