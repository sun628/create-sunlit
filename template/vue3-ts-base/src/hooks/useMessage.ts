/**
 * @description: 消息提示钩子函数，解决重复提示问题
 * @author: wangyang
 * @date: 2025-07-21
 */

import { message } from 'ant-design-vue';
import type { NoticeType } from 'ant-design-vue/es/message';

// 存储当前显示的消息
interface MessageItem {
  content: string;
  key: string;
}

// 存储当前显示的消息列表
const messageList: MessageItem[] = [];

// 默认消息显示时长(s)
const DEFAULT_DURATION = 3;

/**
 * @function
 * @description 生成消息唯一key
 * @param {string} content 消息内容
 * @param {string} type 消息类型
 * @returns {string} 唯一key
 */
const generateKey = (content: string, type: string): string => {
  return `${type}_${content}`;
};

/**
 * @function
 * @description 检查消息是否重复
 * @param {string} content 消息内容
 * @param {string} type 消息类型
 * @returns {boolean} 是否重复
 */
const isDuplicateMessage = (content: string, type: string): boolean => {
  const key = generateKey(content, type);
  return messageList.some((item) => item.key === key);
};

/**
 * @function
 * @description 添加消息到列表
 * @param {string} content 消息内容
 * @param {string} type 消息类型
 * @returns {string} 消息key
 */
const addMessage = (content: string, type: string): string => {
  const key = generateKey(content, type);

  // 如果不存在相同消息，则添加到列表
  if (!messageList.some((item) => item.key === key)) {
    messageList.push({
      content,
      key
    });
  }

  return key;
};

/**
 * @function
 * @description 从列表中移除消息
 * @param {string} key 消息key
 * @returns {void}
 */
const removeMessage = (key: string): void => {
  const index = messageList.findIndex((item) => item.key === key);
  if (index !== -1) {
    messageList.splice(index, 1);
  }
};

/**
 * @function
 * @description 创建消息实例
 * @param {NoticeType} type 消息类型
 * @returns {Function} 消息函数
 */
const createMessage = (type: NoticeType) => {
  return (content: string, duration?: number, onClose?: () => void): void => {
    if (isDuplicateMessage(content, type)) {
      return;
    }

    const key = addMessage(content, type);
    const actualDuration = duration ?? DEFAULT_DURATION;

    // 调用ant-design-vue的消息组件，利用其原生功能
    message[type]({
      content,
      duration: actualDuration,
      key,
      onClose: () => {
        // 消息关闭时从列表中移除
        removeMessage(key);
        // 调用用户传入的onClose回调
        onClose?.();
      }
    });
  };
};

/**
 * @function
 * @description 消息提示钩子，用于解决消息重复提示问题
 * @returns {Object} 消息方法对象
 */
export function useMessage() {
  return {
    info: createMessage('info'),
    success: createMessage('success'),
    warning: createMessage('warning'),
    error: createMessage('error'),
    loading: createMessage('loading'),
    // 原始message对象，用于需要完整功能时使用
    originMessage: message
  };
}

export default useMessage;
