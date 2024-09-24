/**
 * @description 地图api相关接口
 **/

export interface ResSectionPolyLines {
  /**
   * 区间编号
   */
  gtrId: string;
  /**
   * 坐标串
   */
  polyline: string;
}

/**
 * 地图门架信息数据
 * */
export interface ResGantryInfo {
  /**
   * 门架编号
   */
  gantryCode: string;
  /**
   * 门架方向
   */
  gantryDir: string;
  /**
   * 门架名称
   */
  gantryName: string;
  /**
   * 插入时间
   */
  insertTime: string;
  /**
   * 纬度
   */
  lat: number;
  /**
   * 经度
   */
  lon: number;
  /**
   * 道路编号
   */
  roadCode: string;
  /**
   * 桩号
   */
  stakeNum: string;
  /**
   * 开始门架
   */
  startGantryName: string;
  /**
   * 结束门架
   */
  endGantryName: string;
}

/** 地图门架拥堵路线 */
export interface ResGantryJamInfo {
  /**
   * 日期
   */
  dayId: string;
  /**
   * 起始门架
   */
  fromGtCode: string;
  /**
   * 开始门架纬度
   */
  fromLat: string;
  /**
   * 开始门架经度
   */
  fromLon: string;
  /**
   * 区间id
   */
  gtrId: string;
  /**
   * 区间距离
   */
  gtrLen: number;
  id: string;
  /**
   * 插入时间
   */
  insertTime: string;
  /**
   * 5分钟
   */
  timeMm5: number;
  /**
   * 终点门架
   */
  toGtCode: string;
  /**
   * 结束门架纬度
   */
  toLat: string;
  /**
   * 结束门架经度
   */
  toLon: string;
  /**
   * 拥堵指数
   */
  tti: number;

  /**
   * 拥堵等级
   */
  ttiLevel: string;

  /**
   * 折线
   */
  polyline: string;
}

/**
 * @description 地图门架断面流量--请求参数
 * @param {string} gantryId 门架编号
 * @param {string}  endTime 查询截止时间（若该值不为空，则表示查询的流量数据为该时间之前的最新流量）
 */
export interface ReqGantryFlow {
  endTime?: string;
  gantryId: string;
}

/**
 * @description 地图门架断面流量数据
 */
export interface ResGantryFlow {
  /**
   * 日期
   */
  dayId: number;
  /**
   * 总流量
   */
  fluxAll: number;
  /**
   * 大车流量
   */
  fluxDc: number;
  /**
   * 小车流量
   */
  fluxXc: number;
  /**
   * 门架编号
   */
  gantryCode: string;
  /**
   * 门架方向
   */
  gantryDir: string;
  /**
   * 门架名称
   */
  gantryName: string;
  /**
   * 数据编号，ID 编号
   */
  id: string;
  /**
   * 插入时间
   */
  insertTime: string;
  /**
   * 插入时间（格式化后的字符串）
   */
  insertTimeStr: string;
  /**
   * 纬度
   */
  lat: string;
  /**
   * 经度
   */
  lon: string;
  /**
   * 道路编号
   */
  roadCode: string;
  /**
   * 桩号
   */
  stakeNum: string;
  timeMm5: string;
}

/**
 *  地图互联网拥堵路线
 */
export interface ResInternetJamRoute {
  /**
   * 拥堵距离
   */
  distance: string;
  /**
   * 拥堵时长
   */
  duration: string;
  /**
   * 起始桩号
   */
  fromStake: string;
  id: string;
  /**
   * 插入时间
   */
  insertTime: string;
  /**
   * 开始时间
   */
  startTime: string;
  /**
   * 更新时间
   */
  updateTime: string;
  /**
   * 拥堵路段
   */
  polyline: string;
  /**
   * 道路编号
   */
  roadCode: string;
  /**
   * 道路方向
   */
  roadDir: string;
  /**
   * 速度
   */
  speed: number;
  /**
   * 结束桩号
   */
  toStake: string;
  /**
   * 拥堵指数
   */
  tti: number;
  /**
   * 拥堵等级
   */
  ttiLevel: string;
}

/**
 * 地图视频列表信息
 */
export interface ResVideoInfo {
  /**
   * 摄像机编号
   */
  camCode: string;
  /**
   * 摄像机名称
   */
  camName: string;
  /**
   * 1：畅通；2：拥堵
   */
  congestionState: number;
  /**
   * 主键
   */
  id: string;
  /**
   * 插入时间
   */
  insertTime: string;
  /**
   * 纬度
   */
  lat: number;
  /**
   * 经度
   */
  lon: number;
  /**
   * 道路编号
   */
  roadCode: string;
  /**
   * 道路方向
   */
  roadDir: string;
  /**
   * 桩号
   */
  stakeNum: string;
}

export interface ReqFusJamRoute extends ReqDate {
  /**
   * 是否需要polyLine内容（0：不需要；1：需要）
   */
  needPolyLine: number;
}

/**
 * 融合拥堵路线
 */
export interface ResFusJamRoute {
  /**
   * id
   */
  id: string;
  /**
   * eventId
   */
  eventId: string;
  /**
   * 道路编号
   */
  roadCode: string;
  /**
   * 拥堵开始时间
   */
  startTime: string;
  /**
   * 拥堵更新时间
   */
  updateTime: string;
  /**
   * 拥堵起始里程
   */
  fromPoint: number;
  /**
   * 拥堵结束里程
   */
  toPoint: number;
  /**
   * 拥堵经纬度轨迹
   */
  polyline: string;
  /**
   * 拥堵距离
   */
  distance: string;
  /**
   * 拥堵时长
   */
  duration: string;
  /**
   * 速度
   */
  speed: number;
  /**
   * 拥堵指数
   */
  tti: number;
  /**
   * 拥堵等级
   */
  ttiLevel: string;
  /**
   * 插入时间
   */
  insertTime: string;
  /**
   * 列表展示内容
   */
  detail: string;
}

// noinspection SpellCheckingInspection
/**
 * 融合拥堵详情
 */
export interface ResFusJamDetail {
  /**
   * 融合拥堵路线
   * */
  fuseInfo: ResFusJamRoute;
  /**
   * 地图门架信息数据
   */
  gantrys: ResGantryInfo[];
  /**
   * 地图视频列表信息
   */
  videos: ResVideoInfo[];
  /**
   *  地图互联网拥堵路线
   */
  roadConditions: ResInternetJamRoute[];
}

export interface ResHistoryVideo {
  streamId: string;
  url: string;
}

/**
 * 视频拥堵路线
 */
export interface ResVideoJamRoutes {
  /**
   * 拥堵结束时间，格式  yyyy-MM-dd HH:mm:ss
   */
  endTime: string;
  /**
   * 拥堵事件编号
   */
  id: string;
  /**
   * 拥堵事件坐标
   */
  polyline: string;
  /**
   * 拥堵开始时间，格式  yyyy-MM-dd HH:mm:ss
   */
  startTime: string;
  /**
   * 拥堵等级
   */
  ttiLevel: string;
}

export interface ResVideoEventDetail {
  /**
   * 拥堵状态，枚举值（畅通、拥堵）
   */
  congestionState: string;
  /**
   * 方向，枚举值（上行、下行、上下行）
   */
  direction: string;
  /**
   * 相机所在路段桩号
   */
  mileage: string;
  /**
   * 相机所在路段
   */
  roadNum: string;
  /**
   * 更新时间，时间格式字符串（yyyy-MM-dd HH:mm:ss）
   */
  updateTime: string;
}
