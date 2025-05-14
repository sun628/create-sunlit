/**
 * 解析RGB或RGBA颜色字符串
 * @param color RGB或RGBA颜色字符串
 * @returns RGB颜色值数组
 */
function parseRgb(color: string): number[] {
  const match = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/);
  if (!match) throw new Error('Invalid RGB/RGBA color format');

  return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
}

/**
 * 颜色名称到十六进制值的映射
 */
const colorNameToHex: Record<string, string> = {
  red: '#FF0000',
  green: '#00FF00',
  blue: '#0000FF',
  white: '#FFFFFF',
  black: '#000000',
  yellow: '#FFFF00',
  purple: '#800080',
  orange: '#FFA500',
  pink: '#FFC0CB',
  gray: '#808080',
  grey: '#808080',
  brown: '#A52A2A',
  cyan: '#00FFFF',
  magenta: '#FF00FF',
  lime: '#00FF00',
  maroon: '#800000',
  navy: '#000080',
  olive: '#808000',
  teal: '#008080',
  silver: '#C0C0C0',
  aqua: '#00FFFF',
  fuchsia: '#FF00FF'
};

/**
 * 判断颜色格式
 * @param color 颜色值
 * @returns 颜色格式类型
 */
function getColorFormat(color: string): 'hex' | 'rgb' | 'rgba' | 'name' {
  if (color.startsWith('#')) return 'hex';
  if (color.startsWith('rgb(')) return 'rgb';
  if (color.startsWith('rgba(')) return 'rgba';
  if (colorNameToHex[color.toLowerCase()]) return 'name';
  throw new Error('Unsupported color format');
}

/**
 * 将十六进制颜色值转换为RGB
 * @param hex 十六进制颜色值
 * @returns RGB颜色值数组
 */
function hexToRgb(hex: string): number[] {
  // 移除#号
  hex = hex.replace('#', '');

  // 处理3位十六进制
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return [r, g, b];
}

/**
 * 将RGB颜色值转换为十六进制
 * @param r 红色值
 * @param g 绿色值
 * @param b 蓝色值
 * @returns 十六进制颜色值
 */
function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const hex = Math.round(n).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * 将颜色值变亮
 * @param color 颜色值（支持十六进制、RGB、RGBA格式和颜色名称）
 * @param amount 变亮程度（0-100）
 * @returns 变亮后的颜色值（保持原始格式）
 */
export function lightenColor(color: string, amount: number = 20): string {
  // 确保amount在0-100之间
  amount = Math.min(100, Math.max(0, amount));

  // 获取颜色格式
  const format = getColorFormat(color);

  // 如果是颜色名称，先转换为十六进制
  if (format === 'name') {
    color = colorNameToHex[color.toLowerCase()];
  }

  // 转换为RGB数组
  const rgb = format === 'hex' || format === 'name' ? hexToRgb(color) : parseRgb(color);

  // 计算变亮后的RGB值
  const lighten = (value: number) => {
    return value + (255 - value) * (amount / 100);
  };

  const newR = lighten(rgb[0]);
  const newG = lighten(rgb[1]);
  const newB = lighten(rgb[2]);

  // 根据原始格式返回结果
  if (format === 'hex') {
    return rgbToHex(newR, newG, newB);
  } else if (format === 'rgb') {
    return `rgb(${Math.round(newR)}, ${Math.round(newG)}, ${Math.round(newB)})`;
  } else {
    // 保持原始透明度
    const alpha = color.match(/rgba\(.*,\s*([\d.]+)\)/)?.[1] || '1';
    return `rgba(${Math.round(newR)}, ${Math.round(newG)}, ${Math.round(newB)}, ${alpha})`;
  }
}
