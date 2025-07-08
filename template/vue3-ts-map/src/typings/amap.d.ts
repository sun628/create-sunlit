// 将声明文件通过 include/import/typeRoots 等方式引入
import 'amap-jsapi-v2-types';

declare global {
  // ts namespace/interface 会合并声明
  namespace AMap {
    // 目前大多数类型声明，出于避免严格考虑，采用 type 而不是 interface
    export interface Line extends Array<AMap.LngLatLike> {}

    export type MarkerEvent<ExtraData = any> = {
      /**
       * 发生事件时光标所在处的经纬度坐标。
       * */
      lnglat: AMap.LngLat;
      /**
       * 发生事件的目标对象，不同类型返回target不同。例如，事件对象是Marker，则target表示目标对象为Marker，事件对象是其他，则随之改变。
       */
      target: AMap.Marker<ExtraData>;
      /**
       * 发生事件时光标所在处的像素坐标。
       */
      pixel: AMap.Pixel;
      /**
       * 事件类型
       */
      type: string;
    };

    export type PolylineEvent<ExtraData = any> = {
      target: AMap.Polyline<ExtraData>;
      lnglat: AMap.LngLat;
      /**
       * 发生事件时光标所在处的像素坐标。
       */
      pixel: AMap.Pixel;
      /**
       * 事件类型
       */
      type: string;
    };
    export type DrivingOptions = {
      /** AMap.Map对象, 展现结果的地图实例。当指定此参数后，搜索结果的标注、线路等均会自动添加到此地图上。可选 */
      map?: Map;

      /** 驾车路线规划策略 */
      policy?: number;

      /** 返回基本地址信息或详细信息。默认值：'base'，返回基本地址信息。当取值为all'，返回DriveStep基本信息+DriveStep详细信息 */
      extensions?: 'base' | 'all';

      /** 是否可以使用轮渡，0 表示可以，1 表示不可以。默认值：0 */
      ferry?: number;

      /** 结果列表的HTML容器id或容器元素，提供此参数后，结果列表将在此容器中进行展示。可选 */
      panel?: string | HTMLElement;

      /** 设置隐藏路径规划的起始点图标。设置为true：隐藏图标；设置为false：显示图标。默认值：false */
      hideMarkers?: boolean;

      /** 设置是否显示实时路况信息，默认设置为true。显示绿色代表畅通，黄色代表轻微拥堵，红色代表比较拥堵，灰色表示无路况信息 */
      showTraffic?: boolean;

      /** 车牌省份的汉字缩写，用于判断是否限行，与number属性组合使用。可选。例如：京 */
      province?: string;

      /** 除省份之外车牌的字母和数字，用于判断限行相关，与province属性组合使用。可选。例如: NH1N11 */
      number?: string;

      /** 使用map属性时，绘制的规划线路是否显示描边。缺省为true */
      isOutline?: boolean;

      /** 使用map属性时，绘制的规划线路的描边颜色。缺省为white' */
      outlineColor?: string;

      /** 用于控制在路径规划结束后，是否自动调整地图视野使绘制的路线处于视口的可见范围 */
      autoFitView?: boolean;
    };

    /**	途径点,最多支持16个 */
    export type waypoints = Array<AMap.LngLatLike | Array<{ keyword: string; city: string }>>;

    export type DrivingCallback = (
      status: 'complete' | 'error' | 'no_data',
      result: DrivingResult,
    ) => void;

    export type DrivingResult = {
      /** 成功状态说明 */
      info: string;

      /** 驾车规划起点坐标 */
      origin: LngLat;

      /** 驾车规划终点坐标 */
      destination: LngLat;

      /** 驾车规划起点 */
      start: Poi;

      /** 驾车规划终点 */
      end: Poi;

      /** 驾车规划途经点 */
      waypoints: Poi[];

      /** 打车费用，仅extensions为“all”时返回. 单位: 元 */
      taxi_cost?: number;

      /** 驾车规划路线列表 */
      routes: DriveRoute[];
    };

    export type DriveRoute = {
      /** 起点到终点的驾车距离，单位：米 */
      distance: number;

      /** 时间预计，单位：秒 */
      time: number;

      /** 驾车规划策略 */
      policy: string;

      /** 此驾车路线收费金额，单位：元 */
      tolls: number;

      /** 收费路段长度，单位：米 */
      tolls_distance: number;

      /** 限行结果, 0 代表限行已规避或未限行，即该路线没有限行路段, 1 代表限行无法规避，即该线路有限行路段 */
      restriction: number;
      steps: Array<DriveStepBasic>;
    };

    /** 子路段DriveStep集合 */
    export type DriveStepBasic = {
      /** 此路段起点 */
      start_location: LngLat;

      /** 此路段终点 */
      end_location: LngLat;

      /** 此路段说明，如“沿北京南站路行驶565米右转” */
      instruction: string;

      /** 本驾车子路段完成后动作 */
      action: string;

      /** 驾车子路段完成后辅助动作，一般为到达某个目的地时返回 */
      assist_action: string;

      /** 驾车方向 */
      orientation: string;

      /** 驾车方向 */
      road: string;

      /** 此路段距离，单位：米 */
      distance: number;

      /** 此段收费，单位：元 */
      tolls: number;

      /** 收费路段长度，单位：米 */
      tolls_distance: number;

      /** 主要收费道路 */
      toll_road: string;

      /** 此路段预计使用时间，单位：秒 */
      time: number;

      /** 此路段坐标集合 */
      path: LngLat[];

      /**途径城市列表 */
      cities: Array<DriveStepDetail>;
    };

    // noinspection SpellCheckingInspection
    /** 途径城市详情 */
    export type DriveStepDetail = {
      /** 区域编码 */
      adcode: string;

      /** 城市编码 */
      citycode: string;

      /** 途径名称 */
      name: string;

      /** 途径行政区列表 */
      districts: Array<{
        /** 区域编码 */
        adcode: string;

        /** 城市编码 */
        citycode: string;
      }>;
    };

    // noinspection Annotator
    export declare class Driving {
      constructor(opts: AMap.DrivingOptions);
      /**
       * 根据起点、终点和途经点（可选）坐标或名称，实现驾车路线规划，途经点通过opts设定
       * @param origin 起点经纬度
       * @param destination 终点经纬度
       * @param opts 途经点参数，最多支持传入16个途经点
       * @param callback 回调函数
       */
      search(
        origin: AMap.LngLatLike,
        destination: AMap.LngLatLike,
        opts: waypoints | { waypoints: waypoints },
        callback?: DrivingCallback,
      ): void;

      /**
       * 根据起点、终点和途经点（可选）坐标或名称，实现驾车路线规划，途经点通过opts设定
       * @param origin 起点经纬度
       * @param destination 终点经纬度
       * @param callback 回调函数
       */
      search(
        origin: AMap.LngLatLike,
        destination: AMap.LngLatLike,
        callback?: DrivingCallback,
      ): void;

      /**
       * 根据起点、终点和途经点（可选）坐标或名称，实现驾车路线规划，途经点通过opts设定
       * @param points 起点、终点和途经点的数组
       * @param callback 回调函数
       */
      search(points: waypoints, callback?: DrivingCallback): void;
    }

    export interface ExtendMarkerClusterOptions extends AMap.MarkerClusterOptions {
      renderMarker?(opts: { marker: AMap.Marker<ExtraData>; data: Array<ExtraData> }): any;
    }

    // noinspection Annotator
    export declare class MarkerCluster extends MarkerCluster {
      constructor(
        map?: Map,
        dataOptions?: MarkerClusterDataOption[],
        opts?: ExtendMarkerClusterOptions, // 使用扩展后的选项接口
      ) {
        super(map, dataOptions, opts);
      }
      // 你可以在这里添加新的方法或重写现有的方法
    }

    export type MarkerClusterEvent<ExtraData = any> = {
      /**点击的聚合点对象 */
      cluster: AMap.DataCluster;
      /** 点聚合插件对象 */
      target: AMap.MarkerCluster;
      clusterData: Array<ExtraData>;
      lnglat: AMap.LngLat;
      /** 点击的聚合点所包含的点对象 */
      marker: AMap.Marker<ExtraData>;
    };
  }

  // 对 amap type 做扩展
  namespace AMapUI {
    export type SimpleMarkerOptions = Omit<AMap.MarkerOptions, 'content'> & {
      iconTheme?: string;
      iconStyle?: string | object;
      iconLabel?: string | object;
      showPositionPoint?: boolean | object;
      containerClassNames?: string;
    };
  }
}
