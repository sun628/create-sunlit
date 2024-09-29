import { ThemeConfig } from 'ant-design-vue/es/config-provider/context';

export type MapConfig = {
  MAP_KEY: string;
  CITY_CODE: number;
  SECURITY_JS_CODE: string;
  MAP_OPTIONS: AMap.MapOptions;
  MAP_PLUGINS: string[];
};

export const servers = [
  {
    name: 'base_server',
    url: import.meta.env.VITE_BASE_API as string,
  },
  {
    name: 'flow_server',
    url: import.meta.env.FLOW_SERVER as string,
  },
] as const;

export const mapConfig: MapConfig = {
  /** 高德地图key */
  MAP_KEY: '916919393f49e9132baa000648891c5f',

  /** 安全密钥 */
  SECURITY_JS_CODE: '5cbdba41718dc13ecccbd4cbdd5a493a',

  /** 高德地图城市代码 */
  CITY_CODE: 320000,

  /** 地图配置项 */
  MAP_OPTIONS: {
    center: [119.86533401075835, 32.3584429993217],
    animateEnable: true,
    zoomEnable: true,
    rotateEnable: true,
    zooms: [6, 20],
    zoom: 10,
    viewMode: '3D',
    mapStyle: 'amap://styles/9031513b011ff6a394e2078df5fcfcc9', //设置地图的显示样式
  },
  /** 地图插件 */
  MAP_PLUGINS: ['AMap.Driving', 'AMap.MarkerCluster'],
} as const;

export const antTheme: ThemeConfig = {
  token: {
    colorPrimary: '#00aeff', // 主题色
    colorTextPlaceholder: '#acacac', // 输入框提示文字颜色
    colorTextQuaternary: '#fff', // 第四级文本色是最浅的文本色，例如表单的输入提示文本、禁用色文本等。
  },
  components: {
    Spin: {
      colorBgContainer: '#000', // 背景色
    },
    Button: {
      colorTextLightSolid: '#000', // 按钮文字颜色
    },
    Form: {
      colorTextHeading: '#fff', // 表单标题颜色
    },
    DatePicker: {
      colorBgContainer: '#1c2a45', // 背景色
      colorBorder: '#527eac',
      colorTextDisabled: '#a8abb2',
    },
    Select: {
      colorBgContainer: '#1c2a45', // 背景色
      colorBgElevated: '#1c2a45', // dropdown 背景色
      controlItemBgActive: '#00aeff', // 选中背景色
      colorText: '#fff', // 文字颜色
      colorTextPlaceholder: '#a8abb2', // 占位符颜色
      colorBorder: '#527eac', // 边框颜色
    },
    Input: {
      colorBgContainer: '#1c2a45', // 背景色
      colorBorder: '#527eac', // 边框颜色
      colorText: '#fff', // 文字颜色
    },
    Pagination: {
      colorText: '#fff',
    },
  },
} as const;

export default Object.assign({}, servers, mapConfig, antTheme);
