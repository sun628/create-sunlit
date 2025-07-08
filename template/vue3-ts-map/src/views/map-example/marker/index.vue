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
import DefaultMarker from './DefaultMarker.vue';
import LabelMarker from './LabelMarker.vue';

interface Item {
  title: string;
  component: Component;
}
const List: Item[] = [
  {
    title: '默认点标记 Marker',
    component: markRaw(DefaultMarker),
  },
  {
    title: '海量标注 LabelMarker',
    component: markRaw(LabelMarker),
  },
];

const currentItem = ref<Item>(List[0]);
function itemClick(item: Item) {
  currentItem.value = item;
}

const map = ref<AMap.Map>(); // 地图实例

provide(MapKey, map);

function onMapLoad(data: AMap.Map) {
  map.value = data;
}
</script>

<style scoped lang="less">
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

:deep(.custom-content-marker) {
  position: relative;
  width: 52px;
  height: 68px;
  .marker-content {
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
  img {
    width: 100%;
    height: 100%;
  }
  .close-btn {
    position: absolute;
    top: -6px;
    right: -8px;
    width: 15px;
    height: 15px;
    font-size: 12px;
    background: #ccc;
    border-radius: 50%;
    color: #fff;
    text-align: center;
    line-height: 15px;
    box-shadow: -1px 1px 1px rgba(10, 10, 10, 0.2);
  }
  .close-btn:hover {
    background: #666;
  }
}
</style>
