<template>
  <ALayout>
    <!-- 地图组件 -->
    <MvMap @map-load="onMapLoad"></MvMap>
    <!-- <Transition name="fade" mode="out-in">
      <component :is="currentComponent" :key="$route.path"></component>
    </Transition> -->

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
/* 为组件切换添加简单的淡入淡出动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
