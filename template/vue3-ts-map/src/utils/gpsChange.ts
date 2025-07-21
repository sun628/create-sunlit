/* eslint-disable no-loss-of-precision */
import { isLngLatLike } from './is';

const PI: number = 3.1415926535897932384626;
const ee: number = 0.00669342162296594323;
const a = 6378245.0;

/**
 * @function
 * @description transformLngLat
 * @param {number|string} lng 经度
 * @param {number|string} lat 纬度
 * @returns { [number, number]} 经纬度转换后的坐标
 */
function transformLngLat(lng: number, lat: number): [number, number] {
  let dLat = transformLat(lng - 105.0, lat - 35.0);
  let dLng = transformLng(lng - 105.0, lat - 35.0);
  const radLat = (lat / 180.0) * PI;
  let magic = Math.sin(radLat);
  magic = 1 - ee * magic * magic;
  const sqrtMagic = Math.sqrt(magic);
  dLat = (dLat * 180.0) / (((a * (1 - ee)) / (magic * sqrtMagic)) * PI);
  dLng = (dLng * 180.0) / ((a / sqrtMagic) * Math.cos(radLat) * PI);
  const mgLat = lat + dLat;
  const mgLng = lng + dLng;
  return [mgLng, mgLat];
}

/**
 * @function
 * @description WGS84toCj02
 * @param {number|string} lng 经度
 * @param {number|string} lat 纬度
 * @returns { [number, number]} 经纬度转换后的坐标
 */
export function wgs84_to_gcj02(lng: number, lat: number): [number, number] {
  if (out_of_china(lng, lat)) {
    return [lng, lat];
  }
  return transformLngLat(lng, lat);
}

/**
 * @function
 * @description gcj02_to_wgs84
 * @param {number} lng 经度
 * @param {number} lat 纬度
 * @returns {[number, number]} 经纬度转换后的坐标
 */
export function gcj02_to_wgs84(lng: number, lat: number): [number, number] {
  if (out_of_china(lng, lat)) {
    return [lng, lat];
  }
  const [mgLng, mgLat] = transformLngLat(lng, lat);
  return [lng * 2 - mgLng, lat * 2 - mgLat];
}

function transformLat(lng: number, lat: number) {
  let ret =
    -100.0 +
    2.0 * lng +
    3.0 * lat +
    0.2 * lat * lat +
    0.1 * lng * lat +
    0.2 * Math.sqrt(Math.abs(lng));
  ret += ((20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0) / 3.0;
  ret += ((20.0 * Math.sin(lat * PI) + 40.0 * Math.sin((lat / 3.0) * PI)) * 2.0) / 3.0;
  ret += ((160.0 * Math.sin((lat / 12.0) * PI) + 320 * Math.sin((lat * PI) / 30.0)) * 2.0) / 3.0;
  return ret;
}

function transformLng(lng: number, lat: number) {
  let ret =
    300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
  ret += ((20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0) / 3.0;
  ret += ((20.0 * Math.sin(lng * PI) + 40.0 * Math.sin((lng / 3.0) * PI)) * 2.0) / 3.0;
  ret += ((150.0 * Math.sin((lng / 12.0) * PI) + 300.0 * Math.sin((lng / 30.0) * PI)) * 2.0) / 3.0;
  return ret;
}

function out_of_china(lng: number, lat: number) {
  return lng < 72.004 || lng > 137.8347 || lat < 0.8293 || lat > 55.8271 || false;
}

/**
 * @function
 * @description 坐标转换 wps84转gcj02
 * @param {number|string} lng 经度
 * @param {number|string} lat 纬度
 * @returns { [number, number]} 经纬度转换后的坐标
 */
export function gpsChange(lng: string | number, lat: string | number): [number, number] {
  return wgs84_to_gcj02(Number(lng), Number(lat));
}

/**
 * @function pathChange
 * @description 坐标转换
 * @param { Array<[number, number]>} path 多个坐标的数组
 * @returns {Array<Array<number>>}
 */
export function pathChange(
  path: Array<[number, number]> | [number, number]
): AMap.Line | AMap.Line[] | Array<[number, number]> {
  if (isLngLatLike(path)) {
    return [gpsChange(path[0], path[1])];
  } else {
    return path.map((lnglat) => wgs84_to_gcj02(lnglat[0], lnglat[1]));
  }
}
