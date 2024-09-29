<template>
  <!-- 地图组件 -->
  <MvMap @map-load="onMapLoad" />
</template>

<script setup lang="ts">
import MvMap from '@/components/business-components/mv-map/index.vue';
const map = ref<AMap.Map>(); // 地图实例
/**
 * @function
 * @todo 地图加载完毕回调
 * @param {} data 地图实例
 **/
function onMapLoad(data: AMap.Map) {
  map.value = data;
  console.log('地图加载完毕', data);
  console.log('地图中心点', map.value.getCenter());
}
</script>

<style scoped lang="less"></style>
