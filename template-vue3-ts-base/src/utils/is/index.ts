const toString = Object.prototype.toString;

/**
 * @function
 * @todo 判断值是否未某个类型
 */
export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}

/**
 * @function
 * @todo  是否为函数
 */
export function isFunction(val: unknown) {
  return is(val, 'Function');
}

/**
 * @function
 * @todo 是否已定义
 */
export const isDef = <T = unknown>(val?: T): val is T => {
  return typeof val !== 'undefined';
};

export const isUnDef = <T = unknown>(val?: T): val is T => {
  return !isDef(val);
};

/**
 * @function
 * @todo 是否为对象
 */
export const isObject = (val: unknown): val is Record<any, any> => {
  return val !== null && is(val, 'Object');
};

/**
 * @function
 * @todo  是否为时间
 */
export function isDate(val: unknown): val is Date {
  return is(val, 'Date');
}

/**
 * @function
 * @todo  是否为数值
 */
export function isNumber(val: unknown): val is number {
  return is(val, 'Number');
}

/**
 * @function
 * @todo  是否为AsyncFunction
 */
export function isAsyncFunction<T = any>(val: unknown): val is Promise<T> {
  return is(val, 'AsyncFunction');
}

/**
 * @function
 * @todo  是否为promise
 */
export function isPromise<T>(val: unknown): val is Promise<T> {
  return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch);
}

/**
 * @function:  是否为字符串
 */
export function isString(val: unknown): val is string {
  return is(val, 'String');
}

/**
 * @function:  是否为boolean类型
 */
export function isBoolean(val: unknown): val is boolean {
  return is(val, 'Boolean');
}

/**
 * @function
 * @todo  是否为数组
 */
export function isArray<T>(val: unknown): val is Array<T> {
  return Array.isArray(val);
}

/**
 * @function
 * @todo 是否为浏览器
 */
export const isWindow = (val: unknown): val is Window => {
  return typeof window !== 'undefined' && is(val, 'Window');
};

/**
 * @function
 * @todo  是否为Element节点
 **/
export const isElement = (val: unknown): val is Element => {
  return isObject(val) && !!val.tagName;
};

/**
 * @function
 * @todo  是否为null
 **/
export function isNull(val: unknown): val is null {
  return val === null;
}
/**
 * @function
 * @todo  是否为undefined
 **/
export function isUndefined(val: unknown): val is undefined {
  return typeof val === 'undefined';
}

/**
 * @function
 * @todo 判断是否为空
 * @param value
 * @returns {boolean}
 */
export function isEmpty(value: unknown): value is null | undefined {
  return (
    value == null ||
    (typeof value === 'string' && value.trim() === '') ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === 'object' && value.constructor === Object && Object.keys(value).length === 0)
  );
}

/**
 * @function
 * @todo  是否为null或者undefined
 * @param val
 * @returns {boolean}
 **/
export function isNullAndUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) && isNull(val);
}

/**
 * @function
 * @todo  是否为null或者undefined或者""
 * @param val
 * @returns {boolean}
 **/
export function isNullOrUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) || isNull(val);
}

/**
 * @function
 * @todo 是否为正数
 * @param val
 * @returns {boolean}
 **/
export function isPositiveNum(val: unknown): val is number {
  return isNumber(val) && val > 0;
}

/**
 * @function
 * @todo  是否为经纬度LngLatLike数组
 * @returns {boolean}
 **/
export function isLngLatLike(arg: any): arg is [number, number] {
  return Array.isArray(arg) && arg.length === 2 && arg.every((item) => typeof item === 'number');
}

/**
 * @function
 * @todo 校验是否为车牌号
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
