<template>
  <!-- 地图组件 -->
  <MvMap @map-load="onMapLoad" />
</template>

<script setup lang="ts">
import MvMap from '@/components/business/mv-map/index.vue';
const map = ref(); // 地图实例
const onMapLoad = (data) => {
  map.value = data;
};
</script>

<style scoped lang="less"></style>
