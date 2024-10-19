<template>
  <ALayout relative>
    <!-- 地图组件 -->
    <MvMap @map-load="onMapLoad"></MvMap>
    <ACard class="pos-absolute top-10px left-10px m-0 w-180px" title="点标记">
      <AList :data-source="List">
        <template #renderItem="{ item }">
          <AListItemMeta
            pointer
            :title="item.title"
            :class="{ active: item.title === currentItem.title }"
            @click="itemClick(item)"
          />
        </template>
      </AList>
    </ACard>
    <component :is="currentItem.component" v-if="currentItem"></component>
  </ALayout>
</template>

<script setup lang="ts">
import { MapKey } from '@/config/constant';
import Marker from './Marker.vue';
interface Item {
  title: string;
  component: Component;
}
const List: Item[] = [
  {
    title: '默认点标记',
    component: markRaw(Marker),
  },
  {
    title: '海量标注 LabelMarker',
    component: markRaw(Marker),
  },
];

const currentItem = ref<Item>(List[0]);
function itemClick(item: Item) {
  console.log('🚀 ~ itemClick ~ item:', item);
  currentItem.value = item;
}

const map = shallowRef<AMap.Map>(); // 地图实例

provide(MapKey, map);

function onMapLoad(data: AMap.Map) {
  map.value = data;
}
</script>

<style scoped lang="less">
:deep(.marker-content) {
  position: absolute;
  top: -20px;
  right: -128px;
  color: #fff;
  padding: 8px 10px;
  box-shadow: 1px 1px 1px rgba(10, 10, 10, 0.2);
  white-space: nowrap;
  font-size: 16px;
  background-color: #25a5f7;
  border-radius: 3px;
}
:deep(.ant-btn) {
  margin-bottom: 10px;
}

.ant-list-item-meta {
  padding-left: 10px;
  &:hover,
  &.active {
    color: var(--el-color-primary);
  }
}

:deep(.ant-card-body) {
  padding: 0 14px 14px 14px;
}
</style>
