<!--
* @description: 事件总线对比示例
* @author: wangyang
* @date: 2024-10-24
-->

<template>
  <div class="event-bus-demo">
    <a-card title="事件总线对比示例" class="mb-4">
      <a-alert type="info" message="本示例展示了原生mitt和自定义useEventBus的区别" class="mb-4" />

      <a-divider orientation="left">操作区</a-divider>
      <div class="flex gap-4 mb-4">
        <a-button type="primary" @click="emitMittEvent">触发mitt事件</a-button>
        <a-button type="primary" @click="emitEventBusEvent">触发useEventBus事件</a-button>
        <a-button danger @click="unmountChild">卸载子组件</a-button>
        <a-button @click="mountChild">挂载子组件</a-button>
      </div>

      <a-divider orientation="left">日志区</a-divider>
      <a-card class="mb-4">
        <template #title>
          <div class="flex-between">
            <span>事件日志</span>
            <a-button size="small" @click="clearLogs">清空日志</a-button>
          </div>
        </template>
        <div class="log-container h-200px overflow-auto p-2 border rounded">
          <div v-for="(log, index) in logs" :key="index" class="log-item py-1 mb-10px">
            <a-tag :color="log.type === 'mitt' ? 'blue' : 'green'">{{ log.type }}</a-tag>
            <span>{{ log.message }}</span>
            <span class="text-gray-400 ml-2">{{ log.time }}</span>
          </div>
          <div v-if="!logs.length" class="text-gray-400 text-center py-4">暂无日志</div>
        </div>
      </a-card>

      <a-divider orientation="left">子组件区</a-divider>
      <div class="child-container p-4 border rounded">
        <template v-if="showChild">
          <MittChild />
          <EventBusChild :EVENT_KEY="EVENT_KEY" />
        </template>
        <template v-else>
          <div class="text-gray-400 text-center py-4">
            子组件已卸载
            <a-alert
              type="warning"
              message="即使子组件已卸载，mitt事件监听器仍然存在。点击'触发mitt事件'按钮，控制台仍会收到事件。"
              class="mt-4"
            />
          </div>
        </template>
      </div>
    </a-card>

    <a-card title="对比说明" class="mb-4">
      <a-typography>
        <a-typography-title :level="4">mitt 和 useEventBus 的主要区别：</a-typography-title>
        <a-typography-paragraph>
          <ul>
            <li>
              <strong>自动清理：</strong>
              useEventBus 会在组件卸载时自动清理事件监听器，而 mitt 需要手动清理
            </li>
            <li>
              <strong>类型安全：</strong>
              useEventBus 提供了完整的 TypeScript 类型定义
            </li>
            <li>
              <strong>额外功能：</strong>
              useEventBus 提供了 once 方法和 reset 方法
            </li>
            <li>
              <strong>Vue 集成：</strong>
              useEventBus 与 Vue 的生命周期更好地集成
            </li>
          </ul>
        </a-typography-paragraph>
        <a-typography-paragraph>
          <strong>测试方法：</strong>
          点击"卸载子组件"按钮，然后触发事件，可以看到 mitt 仍然会收到事件（内存泄漏，查看控制台），
          而 useEventBus 不会收到事件（自动清理）。
        </a-typography-paragraph>
      </a-typography>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import dayjs from 'dayjs';
import { useEventBus } from '@/hooks/useEventBus';
import { emitter } from './usMitt';
import MittChild from './MittChild.vue';
import EventBusChild from './EventBusChild.vue';
// 创建useEventBus实例的key
const EVENT_KEY = 'demo-event';

const bus = useEventBus(EVENT_KEY);

// 日志记录
interface Log {
  type: 'mitt' | 'eventbus';
  message: string;
  time: string;
}

const logs = ref<Log[]>([]);
const showChild = ref(true);

/**
 * @function
 * @description 添加日志
 * @param {string} type - 日志类型
 * @param {string} message - 日志内容
 */
const addLog = (type: 'mitt' | 'eventbus', message: string) => {
  logs.value.push({
    type,
    message,
    time: dayjs(new Date()).format('HH:mm:ss')
  });
};

/**
 * @function
 * @description 清空日志
 */
const clearLogs = () => {
  logs.value = [];
};

/**
 * @function
 * @description 触发mitt事件
 */
const emitMittEvent = () => {
  const payload = { id: Date.now() };
  emitter.emit('some-event', payload);
  addLog('mitt', `触发事件，payload: ${JSON.stringify(payload)}`);
};

/**
 * @function
 * @description 触发useEventBus事件
 */
const emitEventBusEvent = () => {
  const payload = { id: Date.now() };
  bus.emit('event', payload);
  addLog('eventbus', `触发事件，payload: ${JSON.stringify(payload)}`);
};

/**
 * @function
 * @description 卸载子组件
 */
const unmountChild = () => {
  showChild.value = false;
};

/**
 * @function
 * @description 挂载子组件
 */
const mountChild = () => {
  showChild.value = true;
};

onMounted(() => {
  addLog('mitt', 'mitt事件总线已初始化');
  addLog('eventbus', 'useEventBus事件总线已初始化');
});
</script>

<style scoped lang="less">
.event-bus-demo {
  .log-item {
    border-bottom: 1px dashed #f0f0f0;
    &:last-child {
      border-bottom: none;
    }
  }
}
</style>
