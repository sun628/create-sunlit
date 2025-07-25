/**
 * @class DrivingService
 * @classdesc 用于创建驾车路线规划服务实例，提供根据坐标或关键词进行路线规划的功能。
 *
 * @param {DrivingOptions} drivingOptions - 驾车路线规划的选项。
 *      - {number} strategy 19，返回的结果会优先选择高速路，与高德地图的“高速优先”策略一致
 * @property {Driving} driving - 高德地图驾车服务实例。
 * @example
    const drivingService = new DrivingService({
      policy: 19,
      map: map.value,
    });
    drivingService.searchByLngLat(
      [116.397428, 39.90923],
      [116.397428, 39.90923],
      (status, result) => {
        console.log('搜索结果', status, result);
      },
    );
 **/
export class DrivingService {
  private driving: AMap.Driving | null = null;

  /**
   * 构造函数，初始化 Driving 实例
   * @param drivingOptions 驾车路线规划的选项
   */
  constructor(drivingOptions: AMap.DrivingOptions) {
    AMap.plugin(['AMap.Driving'], () => {
      this.driving = new AMap.Driving(drivingOptions);
    });
  }

  /**
   * 根据起点和终点坐标进行驾车路线规划
   * @param origin 起点经纬度
   * @param destination 终点经纬度
   * @param callback 回调函数（可选）
   */
  public searchByLngLat(
    origin: AMap.LngLatLike,
    destination: AMap.LngLatLike,
    callback?: AMap.DrivingCallback
  ): void {
    this.executeSearch([origin, destination], callback);
  }

  /**
   * 根据起点、终点和途经点名称进行驾车路线规划
   * @param points 起点、终点和途经点的数组,第一个元素和最后一个元素作为起点和终点，中间元素为途经点，最多支持传入16个途经点。
   * @param callback 回调函数（可选）
   */
  public searchByKeywords(points: AMap.waypoints, callback?: AMap.DrivingCallback): void {
    this.executeSearch(points, callback);
  }

  /**
   * 根据起点、终点和途经点经纬度进行驾车路线规划
   * @param origin 起点经纬度
   * @param destination 终点经纬度
   * @param options 途经点选项（可选）
   * @param callback 回调函数（可选）
   */
  public searchWithWaypoints(
    origin: AMap.LngLatLike,
    destination: AMap.LngLatLike,
    options: { waypoints?: AMap.waypoints },
    callback?: AMap.DrivingCallback
  ): void {
    const searchArgs: any[] = [origin, destination];
    if (options && options.waypoints) {
      searchArgs.push(options.waypoints);
    }
    this.executeSearch(searchArgs, callback);
  }

  /**
   * 执行驾车路线规划搜索
   * @param args 搜索参数
   * @param callback 回调函数（可选）
   */
  private executeSearch(args: any[], callback?: AMap.DrivingCallback): void {
    if (!this.driving) {
      throw new Error('Driving instance is not initialized.');
    }
    if (callback) {
      (this.driving.search as any)(...args, callback);
    } else {
      (this.driving.search as any)(...args);
    }
  }
}
