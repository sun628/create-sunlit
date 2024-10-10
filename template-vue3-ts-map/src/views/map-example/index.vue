<template>
  <ALayout relative>
    <!-- 地图组件 -->
    <MvMap @map-load="onMapLoad"></MvMap>
    <router-view v-slot="{ Component, route }">
      <Transition appear :name="route.meta.transitionName || ''" mode="out-in">
        <KeepAlive :include="cacheRouter">
          <component :is="Component" :key="route.path" />
        </KeepAlive>
      </Transition>
    </router-view>
  </ALayout>
</template>

<script setup lang="ts">
import MvMap from '~business-components/mv-map/index.vue';
import cacheRouter from '@/router/helper/cacheRouter';
import { MapKey } from '@/config/constant';

const map = shallowRef<AMap.Map | null>(null); // 地图实例

provide(MapKey, map);

/**
 * @function
 * @todo 地图加载完毕回调
 * @param {} data 地图实例
 **/
function onMapLoad(data: AMap.Map) {
  console.log('地图加载完毕', data);
  map.value = data;
}
</script>

<style scoped lang="less">
:deep(.ant-card) {
  .ant-card-body {
    padding: 0 0 20px 0;
  }
}
</style>
