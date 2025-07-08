// 定义定时器
type TimeoutHandle = ReturnType<typeof setTimeout>;

// 定义回调函数
interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

// 定义参数
interface IOptions {
  // 链接
  url: string;
  // token
  token?: string;
  // 发送心跳间隔时间
  heart_time?: number;
  //检查链接状态时间
  check_time?: number;
  //断线后重连间隔时间
  lock_time?: number;
  // 成功回调
  onmessage: Fn<any, any>;
  // 失败回调
  onerror?: Fn<any, any>;
  // 打开回调
  onopen?: Fn<any, any>;
  // 关闭回调
  onclose?: Fn<any, any>;
}

// 当前 WebSocket 的链接状态，只读
enum EReadState {
  // 正在链接中
  CONNECTING = 0,
  // 已经链接并且可以通讯
  OPEN = 1,
  // 连接正在关闭
  CLOSING = 2,
  // 连接已关闭或者没有链接成功
  CLOSED = 3,
}

/**
 * @description websocket
 * @param {IOptions} options
 * @param {string} options.url 链接
 * @param {string} options.token token
 * @param {number} options.heart_time 发送心跳间隔时间
 * @param {number} options.check_time 检查链接状态时间
 * @param {number} options.lock_time 断线后重连间隔时间
 * @param {Fn<any, any>} options.onmessage 成功回调
 * @param {Fn<any, any>} options.onerror 失败回调
 * @param {Fn<any, any>} options.onopen 打开回调
 * @param {Fn<any, any>} options.onclose 关闭回调
 * @example
 * // 使用示例
 * const ws = websocket({
 *   url: '/ws',
 *  onmessage: (e) => {
 *   console.log(e);
 * })
 * // 关闭socket
 * ws.close();
 * @returns {Ws} 返回Ws实例 通过实例调用close方法关闭socket
 **/
const websocket = (options: IOptions) => {
  class Ws {
    // socket实例
    public ws: WebSocket | undefined;
    // 默认基础地址
    private readonly baseUrl: string = import.meta.env.VITE_WS_BASE_API as string;
    // socket 地址
    private readonly url: string | undefined;
    // socket请求成功数据返回回调函数
    private readonly onmessage: Fn<any, any>;
    // socket请求失败返回回调函数
    private readonly onerror?: Fn<any, any>;
    // socket打开回调
    private readonly onopen?: Fn<any, any>;
    // socket关闭回调
    private readonly onclose?: Fn<any, any>;
    // 心跳时间
    private readonly heart_time: number = 3000;
    // 检查连接状态时间
    private readonly check_time: number = 3000;
    // 重连时间
    private readonly lock_time: number = 4000;
    // 心跳定时器
    private h_timer: TimeoutHandle | undefined;
    // 检查连接状态定时器
    private c_timer: TimeoutHandle | undefined;
    // 重连定时器
    private l_timer: TimeoutHandle | undefined;
    // 重连锁
    private isLock: boolean = false;

    constructor(options: IOptions) {
      const { url, heart_time, check_time, lock_time } = options;
      const { onmessage, onerror, onopen, onclose } = options;
      if (!url || !onmessage) {
        const message = !url ? '链接url' : '回调函数onmessage';
        throw new Error(`socket${message}不能为空`);
      }

      // 链接url
      this.url = this.baseUrl + url;
      // 数据返回回调函数
      this.onmessage = onmessage;
      // 失败回调
      if (onerror) {
        this.onerror = onerror;
      }
      // 打开回调
      if (onopen) {
        this.onopen = onopen;
      }
      // 关闭回调
      if (onclose) {
        this.onclose = onclose;
      }

      // 心跳时间
      this.heart_time = heart_time || 3000;
      // 检查连接状态时间
      this.check_time = check_time || 3000;
      // 重连时间
      this.lock_time = lock_time || 4000;

      // 初始化
      this.wsInit();
    }

    // 初始化socket
    public wsInit(): void {
      if (!this.url) return;
      const ws = new WebSocket(this.url);
      // 打开处理
      ws.onopen = (e) => {
        // 心跳
        this.heartCheck();
        // 打开回调
        if (this.onopen) {
          this.onopen(e);
        }
      };

      // 关闭处理
      ws.onclose = (e) => {
        this.reconnect(); // 重连

        this.onclose && this.onclose(e); // 关闭回调
      };

      // 错误处理
      ws.onerror = (e) => {
        this.reconnect(); // 重连
        this.onerror && this.onerror(e); // 回调
      };

      // 消息接收
      ws.onmessage = (e) => {
        this.heartCheck(); // 心跳
        this.onmessage(e); // 回调
      };

      this.ws = ws; // 赋值
    }

    // 心跳
    private heartCheck(): void {
      // 清除心跳、检查连接接定时器
      this.clearTimeout();
      // 心跳定时器
      this.h_timer = setTimeout(() => {
        // 发送ping
        (this.ws as WebSocket).send('type:ping');
        // 检查连接状态定时器，确认连接状态
        this.c_timer = setTimeout(() => {
          // 连接失败，进行关闭
          if ((this.ws as WebSocket).readyState !== 1) {
            this.close();
          }
        }, this.check_time);
      }, this.heart_time);
    }

    // 重连
    private reconnect(): void {
      // 连接已关闭或者没有链接成功
      const readyState: number = (this.ws as WebSocket).readyState;
      if (readyState === EReadState.CLOSED) {
        this.close();
        return;
      }

      // 重连锁
      if (this.isLock) {
        return;
      }

      this.isLock = true;
      this.l_timer && clearTimeout(this.l_timer);
      // 重连定时器
      this.l_timer = setTimeout(() => {
        try {
          this.wsInit(); // 重新初始化
        } finally {
          this.isLock = false;
        }
      }, this.lock_time);
    }

    // 清除心跳、检查连接状态定时器
    private clearTimeout(): void {
      this.h_timer && clearTimeout(this.h_timer);
      this.c_timer && clearTimeout(this.c_timer);
      this.l_timer && clearTimeout(this.l_timer);
    }

    // 销毁关闭
    public close(): void {
      // 关闭WebSocket
      (this.ws as WebSocket).close();
      // 清除心跳、检查连接接定时器
      this.clearTimeout();
    }
  }

  return new Ws(options);
};
export default websocket;
