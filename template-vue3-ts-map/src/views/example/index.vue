<template>
  <ALayout>
    <!-- 地图组件 -->
    <MvMap @map-load="onMapLoad"></MvMap>
    <ASpace class="menu-list pos-absolute top-10px left-10px flex-column">
      <Button
        v-for="(item, index) in menuList"
        :key="index"
        :color="item.active ? '#FF5C93' : '#00aeff'"
        @click="item.onClick(item)"
      >
        {{ item.title }}
      </Button>
    </ASpace>
    <LngLatSearch v-if="currentKey === 'Driving'" />
  </ALayout>
</template>

<script setup lang="ts">
import Button from '~basic-components/button';
import MvMap from '~business-components/mv-map/index.vue';
import LngLatSearch from './components/LngLatSearch.vue';
import { MapKey } from '@/config/constant';

import { useMenuFn } from './useMenu';
const currentKey = ref('');

const { menuList } = useMenuFn((type: string) => {
  currentKey.value = type;
});
menuList.value[0].onClick(menuList.value[0]);
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

<style scoped lang="less"></style>
