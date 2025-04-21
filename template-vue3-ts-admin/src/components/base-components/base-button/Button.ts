import type {
  ButtonProps as AButtonProps,
  ButtonType as AButtonType,
} from 'ant-design-vue/es/button/buttonTypes';
import { theme } from 'ant-design-vue';

const { defaultSeed } = theme;
export type { AButtonType };
export type ButtonType = AButtonType | 'warning' | 'success' | 'error' | 'reset';

export type ButtonProps = Omit<AButtonProps, 'type'> & {
  color?: string;
  type?: ButtonType;
};

/** 这里自定义颜色 */
export const buttonColorPrimary = {
  success: defaultSeed.colorSuccess,
  warning: defaultSeed.colorWarning,
  error: defaultSeed.colorError,
} as const;

export const aButtonTypes = ['default', 'primary', 'ghost', 'dashed', 'link', 'text'];
