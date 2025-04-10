const network = {
  /**
   * 操作正常code，支持String、Array、int多种类型
   * 暂时按公司后端2.0框架：200表示请求成功 | 201请求成功，并创建新的资源 | 204请求成功，并删除资源
   */
  successCode: [200, 201, 204, '200', 0, '0'],
  routerWhiteList: ['/403', '/404', '/500', '/layout', '/login'],
};

const setting = {
  // 开发以及部署时的URL
  // hash模式时在不确定二级目录名称的情况下建议使用""代表相对路径或者"/二级目录/"
  // history模式默认使用"/"或者"/二级目录/"
  publicPath: './',
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: 'static',
  // 开发环境每次保存时是否输出为eslint编译警告
  lintOnSave: true,
  // 开发环境端口号
  devPort: '9999',
  // 路由模式，可选值为 history 或 hash
  routerMode: 'hash',
  // 标题分隔符
  titleSeparator: ' | ',
  // 标题是否反转 如果为false:"page - title"，如果为ture:"title - page"
  titleReverse: true,
} as const;

const theme = {
  pxtorem: {
    rootValue: 100,
    propList: ['*'], // 是一个存储哪些将被转换的属性列表，这里设置为['*']全部，假设需要仅对边框进行设置，可以写['*', '!border*']
    unitPrecision: 5, // 保留rem小数点多少位
    minPixelValue: 0, // 设置要替换的最小像素值 px小于x的不会被转换
    selectorBlackList: ['.norem'], // 过滤掉.norem开头的class，不进行rem转换
    exclude: /node_modules/i, // 这里表示不处理node_modules文件下的css
    mediaQuery: false, // 是否在媒体查询的css代码中也进行转换
  },
  layoutType: 'horizontal', // 布局模式 inline上下布局、horizontal左右布局
  tagShow: false, // 是否需要显示面包屑
  fixHeader: true, // 是否需要固定头部
  theme: 'mixins', // 浅色主题white，深色主题dark，混合主题mixins
};

export default Object.assign({}, network, setting, theme);
