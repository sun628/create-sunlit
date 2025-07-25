export const loadEnv = () => JSON.parse(JSON.stringify(import.meta.env));

const env = loadEnv();
const baseSize = Number(env.VITE_PX_REM_ROOT_VALUE);

/**
 * @function
 * @description 将 px 转换为 rem
 * @param {number} px - 需要转换的 px 值
 * @returns {string} - 转换后的 rem 值
 **/
export function toRem(px: number): string {
  // 参数验证
  if (typeof px !== 'number' || isNaN(px)) {
    console.warn('toRem: 输入参数必须是数字类型');
    return '0rem';
  }

  // 计算 rem 值并保留三位小数
  const remValue = (px / baseSize).toFixed(3);

  // 添加单位并返回
  return `${remValue}rem`;
}
