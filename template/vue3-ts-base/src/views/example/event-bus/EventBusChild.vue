<!--
* @description: useEventBus事件总线子组件示例
* @author: wangyang
* @date: 2024-10-24
-->

<template>
  <a-card title="EventBus子组件" class="mb-4" :bordered="false">
    <a-alert
      type="success"
      message="此组件使用useEventBus监听事件，组件卸载时会自动清理监听器"
      class="mb-4"
    />
    <div class="flex flex-col gap-2">
      <div
        v-for="(event, index) in receivedEvents"
        :key="index"
        class="event-item p-2 border rounded"
      >
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
import { ref, onMounted, onUnmounted } from 'vue';
import dayjs from 'dayjs';
import { useEventBus } from '@/hooks/useEventBus';

interface EventData {
  id: number;
  time: string;
}

// 从父组件获取EVENT_KEY
const props = defineProps<{
  EVENT_KEY: string;
}>();

const receivedEvents = ref<EventData[]>([]);
const bus = useEventBus(props.EVENT_KEY);

/**
 * @function
 * @description 事件处理函数
 * @param {any} payload - 事件数据
 */
const handleEvent = (event: any, payload: any) => {
  console.log('EventBusChild接收到事件:', payload);
  receivedEvents.value.push({
    id: payload.id,
    time: dayjs(new Date()).format('HH:mm:ss')
  });
};

onMounted(() => {
  // 监听事件
  bus.on(handleEvent);
  console.log('EventBus子组件已挂载，事件监听器已创建');
});

onUnmounted(() => {
  // useEventBus会自动清理事件监听器，不需要手动清理
  console.log('EventBus子组件已卸载，事件监听器已自动清理');

  // 如果需要手动清理，可以这样做：
  // bus.off(handleEvent);
});
</script>

<style scoped lang="less">
.event-item {
  background-color: #f0f7ff;
}
</style>
