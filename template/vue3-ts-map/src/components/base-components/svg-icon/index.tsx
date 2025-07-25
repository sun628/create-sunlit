import SvgIcon from './SvgIcon.vue';

export default SvgIcon;

/**
 * @function
 * @description 渲染图标
 * @param  icon - 图标名称
 * @returns  图标组件
 **/
export const renderIcon = (icon: string | undefined) => {
  if (icon) {
    return <SvgIcon name={icon} />;
  }
  return null;
};
