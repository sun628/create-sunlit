<!--
* @description: mitt事件总线子组件示例
* @author: wangyang
* @date: 2024-10-24
-->

<template>
  <a-card title="Mitt子组件" class="mb-4" :bordered="false">
    <a-alert
      type="info"
      message="此组件使用mitt监听事件，组件卸载时会自动清理监听器"
      class="mb-4"
    />
    <div class="flex flex-col gap-2">
      <div v-for="event in receivedEvents" :key="event.id" class="event-item p-2 border rounded">
        <div class="flex justify-between">
          <span class="font-bold">事件ID: {{ event.id }}</span>
          <span class="text-gray-400 text-xs">{{ event.time }}</span>
        </div>
      </div>
      <div v-if="!receivedEvents.length" class="text-gray-400 text-center py-4">暂未收到事件</div>
    </div>
  </a-card>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { emitter } from './usMitt';

interface EventData {
  id: number;
  time: string;
}

const receivedEvents = ref<EventData[]>([]);

let count = 0;
/**
 * @function
 * @description 事件处理函数
 * @param {any} payload - 事件数据
 */
const handleEvent = (payload: any) => {
  console.log('MittChild接收到事件:', payload);
  count++;
  const newEvent = {
    id: payload.id,
    time: dayjs(new Date()).format('HH:mm:ss')
  };
  console.log('🚀 ~ handleEvent ~ count:', count);
  receivedEvents.value.push(newEvent);
};

onMounted(() => {
  console.log('Mitt子组件已挂载，事件监听器已创建');
  // 监听事件
  emitter.on('some-event', handleEvent);
});

onUnmounted(() => {
  // 清理监听器，防止内存泄漏
  console.log('Mitt子组件已卸载，事件监听器未清理');
  emitter.off('some-event', handleEvent);
});
</script>

<style scoped lang="less">
.event-item {
  background-color: #f9f9f9;
}
</style>
