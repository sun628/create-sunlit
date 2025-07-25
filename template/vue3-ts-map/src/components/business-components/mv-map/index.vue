<template>
  <div :id="props.id" class="w-full h-full relative">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { onMounted, shallowRef } from 'vue';
import { propTypes } from '@/utils/helper/propTypes';
import { useMapEventBus, initMap, createProvince } from './hooks';

defineOptions({
  name: 'MvMap'
});

const map = shallowRef<AMap.Map | null>(null);
const { setMapInstance } = useMapEventBus();
const emit = defineEmits<{
  'map-load': [map: AMap.Map];
}>();

const props = defineProps({
  id: propTypes.string.def('mv-map'),
  mapOptions: propTypes.object.def(() => ({
    zoom: 8,
    center: [119.659629, 33.006072]
  }))
});

/**
 * @description 获取地图实例
 * @returns {Object} map 地图实例
 */
const getMap = () => map.value;

onMounted(async () => {
  try {
    map.value = await initMap(props.id, props.mapOptions);
    createProvince(map.value, [320000]);
    setMapInstance(map.value);
    emit('map-load', map.value);
  } catch (e) {
    console.error(e);
  }
});

onBeforeUnmount(() => {
  map.value?.destroy();
  map.value = null;
});

defineExpose({
  getMap,
  map
});
</script>

<style scoped lang="less"></style>
