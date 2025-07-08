import { loadEnv } from '@/utils';

const env = loadEnv();
const baseSize = Number(env.VITE_PX_REM_ROOT_VALUE);

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
