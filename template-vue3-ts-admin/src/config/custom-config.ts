import { ThemeConfig } from 'ant-design-vue/es/config-provider/context';
import styles from '@/assets/styles/variables/index.module.less';

export const servers = [
  {
    name: 'base_server',
    url: import.meta.env.VITE_BASE_API as string
  },
  {
    name: 'flow_server',
    url: import.meta.env.FLOW_SERVER as string
  }
] as const;

export const antTheme: ThemeConfig = {
  token: {
    colorText: styles.colorBlack,
    colorPrimary: styles.colorPrimary, // 主题色
    colorTextDescription: styles.colorTextDescription // 描述色
  },
  components: {
    List: {},
    Spin: {
      colorBgContainer: '#000' // 背景色
    },
    Form: {
      colorTextHeading: '#fff' // 表单标题颜色
    },
    DatePicker: {
      colorBgContainer: '#1c2a45', // 背景色
      colorBorder: '#527eac',
      colorTextDisabled: '#a8abb2'
    },
    Select: {
      colorBgContainer: '#1c2a45', // 背景色
      colorBgElevated: '#1c2a45', // dropdown 背景色
      controlItemBgActive: '#00aeff', // 选中背景色
      colorText: '#fff', // 文字颜色
      colorTextPlaceholder: '#a8abb2', // 占位符颜色
      colorBorder: '#527eac' // 边框颜色
    },
    Input: {
      colorBorder: '#527eac', // 边框颜色
      colorText: '#fff' // 文字颜色
    },
    Pagination: {
      colorText: '#fff'
    }
  }
} as const;

export default Object.assign({}, servers, antTheme);
