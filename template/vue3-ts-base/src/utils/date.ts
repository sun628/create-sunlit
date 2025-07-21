/**
 * @description 日期工具类方法
 **/

import dayjs, { Dayjs } from 'dayjs';

/**
 * @description 获取当前日期的前n天的日期范围
 * @param daysAgo 往前天数 默认0 当天
 * @param format 格式 默认'YYYY-MM-DD HH:mm:ss'
 * @returns {[string,string]|[Dayjs,Dayjs]} 返回日期范围
 * @example
 * getDayRange(0); // 返回当天的日期范围
 * getDayRange(1); // 返回昨天的日期范围
 **/
export function getDayRange(
  daysAgo = 0,
  format = 'YYYY-MM-DD HH:mm:ss'
): [string, string] | [Dayjs, Dayjs] {
  const start = dayjs().subtract(daysAgo, 'day').startOf('day').format(format);
  const end =
    daysAgo > 0
      ? dayjs().subtract(daysAgo, 'day').endOf('day').format(format)
      : dayjs().format(format);
  return [start, end];
}

/**
 * @description 禁用日期
 * @param current 当前日期
 * @param daysAgo 往前天数 默认0 当天
 * @returns {boolean} 返回是否禁用
 */
export const disabledDate = (current: Dayjs, daysAgo: number = 0): boolean => {
  if (daysAgo === 0) {
    return current && current > dayjs().endOf('day');
  } else {
    return current && current > dayjs().subtract(1, 'day').endOf('day');
  }
};
/**
 * @description 秒转换成时分秒
 * @param {number} totalSeconds 秒
 * @returns {string} 10小时5分钟3秒
 */
export const convertSeconds = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600); // 计算小时数
  const minutes = Math.floor((totalSeconds % 3600) / 60); // 计算分钟数
  const seconds = totalSeconds % 60; // 剩余的秒数
  return (
    (hours > 0 ? hours + '小时 ' : '') + (minutes > 0 ? minutes + '分钟 ' : '') + seconds + '秒'
  );
};

/**
 * @function
 * @description 时间字符串转秒数 -- 00:00:00 => 秒数
 * @param time 时间字符串
 * @returns 秒数
 */
export function timeToSeconds(time: string) {
  const timeParts = time.split(':');
  const hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);
  const seconds = parseInt(timeParts[2], 10);
  return hours * 3600 + minutes * 60 + seconds;
}

/**
 * @function
 * @description 获取时间戳
 * @param {string} time
 * @returns {number} 时间戳
 **/
export function getTimeStamp(time: string): number {
  return new Date(time).getTime();
}

/**
 * @function
 * @description 日期格式化
 * @param {string | number | Date} time 时间
 * @param {string | undefined }pattern 时间格式
 * @example
 * parseTime(new Date(), "{y}-{m}-{d}"); // 返回当前日期，格式为 "2022-12-31"
 * parseTime(1640995200, "{y}-{m}-{d} {h}:{i}:{s}"); // 返回 "2022-01-01 00:00:00"
 * parseTime("2022/01/01", "{y}年{m}月{d}日 星期{a}"); // 返回 "2022年01月01日 星期六"
 **/
export function parseTime(time: string | number | Date, pattern: string | undefined): string {
  if (arguments.length === 0 || !time) {
    return '';
  }
  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}';
  let date: Date;
  if (typeof time === 'object') {
    date = new Date(time);
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time);
    } else if (typeof time === 'string') {
      time = time.replace(new RegExp(/-/gm), '/');
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }

  const FormatDate = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  } as const;

  return format.replace(
    /{(y|m|d|h|i|s|a)+}/g,
    (_, key: 'y' | 'm' | 'd' | 'h' | 'i' | 's' | 'a') => {
      const num = FormatDate[key];
      let value = num.toString();
      if (key === 'a') {
        value = ['日', '一', '二', '三', '四', '五', '六'][num];
      } else {
        if (value.length === 1) {
          value = '0' + value;
        }
      }
      return value;
    }
  );
}
