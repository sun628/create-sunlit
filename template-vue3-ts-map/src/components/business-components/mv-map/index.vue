<template>
  <div :id="props.id" class="w-full h-full relative">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { onMounted, shallowRef } from 'vue';
import { initMap, loadMapUI } from '@/hooks/useMap';
import { MapKey } from '@/config/constant';

defineOptions({
  name: 'MvMap',
});

type MapProps = {
  id?: string;
  mapOptions?: AMap.MapOptions;
};

const map = shallowRef<AMap.Map>();

provide(MapKey, map);

const emit = defineEmits<{
  'map-load': [map: AMap.Map];
}>();

const props = withDefaults(defineProps<MapProps>(), {
  id: 'mv-map',
  mapOptions: () => ({}),
});

/**
 * @description 获取地图实例
 * @returns {Object} map 地图实例
 */
const getMap = () => {
  return map.value as AMap.Map;
};

onMounted(async () => {
  try {
    const mapOptions = Object.assign({}, $config.MAP_OPTIONS, props.mapOptions);
    map.value = await initMap(props.id, mapOptions);
    loadMapUI(map.value, [320100]);
    emit('map-load', map.value as AMap.Map);
  } catch (e) {
    console.error(e);
  }
});
onBeforeUnmount(() => {
  map.value?.destroy();
});

defineExpose({
  getMap,
  map,
});
</script>

<style scoped lang="less"></style>
