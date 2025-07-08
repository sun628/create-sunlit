import { shallowRef, onMounted, onUnmounted } from 'vue';

// 定义回调函数
interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

// 定义心跳配置接口
interface HeartbeatConfig {
  message?: string;
  interval?: number;
  pongTimeout?: number;
}

// 定义重连配置接口
interface ReconnectConfig {
  retries?: number;
  delay?: number;
  onFailed?: () => void;
}

interface IOptions {
  url: string;
  token?: string;
  // 修改配置类型
  autoReconnect?: boolean | ReconnectConfig;
  heartbeat?: boolean | HeartbeatConfig;
  onmessage: Fn<any, any>;
  onerror?: Fn<any, any>;
  onopen?: Fn<any, any>;
  onclose?: Fn<any, any>;
}

const defaultReconnectConfig: Readonly<Required<ReconnectConfig>> = {
  retries: Infinity,
  delay: 1000,
  onFailed: () => {},
};

const defaultHeartbeatConfig: Readonly<Required<HeartbeatConfig>> = {
  message: 'type:ping',
  interval: 1000,
  pongTimeout: 1000,
};

export function useWebsocket(options: IOptions) {
  const ws = shallowRef<WebSocket>();
  const baseUrl = import.meta.env.VITE_WS_BASE_API || '';
  const url = baseUrl + options.url;
  let retryCount = 0;
  let isLock = false;
  let heart_timer: NodeJS.Timeout;
  let check_timer: NodeJS.Timeout;
  let lock_timer: NodeJS.Timeout;

  // 获取心跳配置
  const getHeartbeatConfig = () => {
    const { heartbeat } = options;
    if (!heartbeat) return null;
    if (typeof options.heartbeat === 'boolean') {
      return defaultHeartbeatConfig;
    } else {
      return { ...defaultHeartbeatConfig, ...options.heartbeat };
    }
  };

  // 获取重连配置
  const getReconnectConfig = () => {
    if (!options.autoReconnect) return null;
    if (typeof options.autoReconnect === 'boolean') {
      return defaultReconnectConfig;
    } else {
      return { ...defaultReconnectConfig, ...options.autoReconnect };
    }
  };

  // 修改心跳检测
  const heartCheck = () => {
    const config = getHeartbeatConfig();
    if (!config) return;
    clearTimer();
    // 使用 setInterval 定期发送心跳包
    heart_timer = setInterval(() => {
      ws.value?.send(config.message);
      // 检查服务器响应
      check_timer = setTimeout(() => {
        if (ws.value?.readyState !== 1) {
          close(); // 超时未收到响应，关闭连接
        }
      }, config.pongTimeout);
    }, config.interval);
  };

  // 修改重连逻辑
  const reconnect = () => {
    const config = getReconnectConfig();
    if (!config) return;

    if (!ws.value || ws.value.readyState === WebSocket.CLOSED) {
      close();
      return;
    }
    if (isLock) return;

    if (retryCount >= config.retries) {
      config.onFailed?.();
      return;
    }

    isLock = true;
    lock_timer && clearTimeout(lock_timer);
    lock_timer = setTimeout(() => {
      try {
        retryCount++;
        init();
      } finally {
        isLock = false;
      }
    }, config.delay);
  };

  // 修改初始化连接
  const init = () => {
    if (!url) return;
    const socket = new WebSocket(url);

    socket.onopen = (e) => {
      retryCount = 0; // 连接成功重置重试次数
      heartCheck();
      options.onopen?.(e);
    };

    socket.onclose = (e) => {
      reconnect();
      options.onclose?.(e);
    };

    socket.onerror = (e) => {
      reconnect();
      options.onerror?.(e);
    };

    socket.onmessage = (e) => {
      options.onmessage(e.data);
    };

    ws.value = socket;
  };

  // 关闭连接
  const close = () => {
    ws.value?.close();
    clearTimer();
  };

  // 发送消息
  const send = (data: string | ArrayBufferLike | Blob | ArrayBufferView) => {
    ws.value?.send(data);
  };

  const clearTimer = () => {
    heart_timer && clearTimeout(heart_timer);
    check_timer && clearTimeout(check_timer);
    lock_timer && clearTimeout(lock_timer);
  };

  onMounted(() => {
    init();
  });

  onUnmounted(() => {
    close();
  });

  return {
    ws,
    send,
    close,
  };
}
