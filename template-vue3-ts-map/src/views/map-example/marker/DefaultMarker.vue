<template>
  <ACard
    class="defualt-marker-container pos-absolute top-10px right-10px m-0 w-280px overflow-auto"
    title="点标记操作"
  >
    <AList :data-source="List" item-layout="vertical">
      <template #renderItem="{ item }">
        <AListItemMeta pointer>
          <template #title>
            <div flex items-center w-full m-r-5px>
              <ATag color="blue">{{ item.title }}</ATag>
              <component :is="item.render"></component>
            </div>
          </template>
        </AListItemMeta>

        <AListItem>
          <AList bordered :data-source="item.children" item-layout="vertical">
            <template #renderItem="{ item }">
              <AListItem pointer @click="itemClick(item)">
                {{ item.title }}
              </AListItem>
              <AListItemMeta :description="item.description"></AListItemMeta>
            </template>
          </AList>
        </AListItem>
      </template>
    </AList>
  </ACard>
</template>

<script setup lang="tsx">
import { MapKey } from '@/config/constant.ts';
import { defaultMarker } from './lib';
import { useMarker } from '@/hooks/useMap';
import { Rate } from 'ant-design-vue';
import gantryIcon from '@/assets/images/map/gantry.png';
const map = inject(MapKey);

interface Item {
  title: string;
  render?: () => VNode;
  description?: string;
  handler?: () => void;
  children?: Item[];
}
const { createMarkerLayer, clearMarkerLayer } = useMarker(map);

function itemClick(item: Item) {
  item.handler && item.handler();
}
const List: Item[] = [
  {
    title: '通过url方式',
    children: [
      {
        title: '添加url图标',
        description: '`icon:{url:string,size:AMap.Size}`',
        handler: () => defaultMarker.addByUrlIcon(map?.value),
      },
      {
        title: '更新url图标',
        description: '`marker.setIcon(icon)`',
        handler: () => defaultMarker.updateUrlIcon(),
      },
    ],
  },
  {
    title: '通过本地图片',
    children: [
      {
        title: '添加本地图标',
        description: '`icon:{new AMap.Icon}`',
        handler: () => defaultMarker.addByLocalIcon(map?.value),
      },
      {
        title: '更新图标尺寸',
        description: '`marker.setIcon(icon)`',
        handler: () => defaultMarker.updateIconSize(),
      },
    ],
  },
  {
    title: '通过自定义内容',
    children: [
      {
        title: '添加自定义内容',
        description: '`content:string`',
        handler: () => defaultMarker.addByContent(map?.value),
      },
      {
        title: '更新自定义内容',
        description: '`marker.setContent(content)`',
        handler: () => defaultMarker.updateContent(),
      },
    ],
  },
  {
    title: '清除点标记',
    children: [
      {
        title: '清除点标记1',
        description: '`通过marker.setMap(null)清除`',
        handler: () => defaultMarker.clearMarker(),
      },
      {
        title: '清除点标记2',
        description: '`通过map.remove(marker)清除`',
        handler: () => defaultMarker.removeMarker(),
      },
    ],
  },
  {
    title: '点标记组',
    render: () => {
      return <Rate value={1} disabled />;
    },
    children: [
      {
        title: '绘制多个点标记',
        description: '`通过map.add(marker)绘制`',
        handler: () => drawMarkerLayer(),
      },
      {
        title: '清除点标记组',
        description: '`通过map.clearMap()`',
        handler: () => clearMarkerLayer(),
      },
    ],
  },
];

const data: Array<{ lon: string; lat: string; icon: string | AMap.Icon }> = [
  {
    lon: ' 118.811836',
    lat: '32.051376',
    icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
  },
  {
    lon: '118.737887',
    lat: '31.956974',
    icon: gantryIcon,
  },
];

function drawMarkerLayer() {
  const icon = new AMap.Icon({
    image: gantryIcon,
    size: new AMap.Size(52, 68), // 图标尺寸
    imageSize: new AMap.Size(52, 68), // 根据所设置的大小拉伸或压缩图片
  });
  data[1].icon = icon;
  createMarkerLayer(data);
}
</script>

<style scoped lang="less">
.defualt-marker-container {
  height: calc(100vh - 20px);
}
.ant-list {
  .ant-list-item {
    padding: 8px;
    &:hover,
    &.active {
      color: var(--el-color-primary);
    }
  }
  .ant-list-item-meta {
    padding-left: 10px;
  }
}
:deep(.ant-rate-star-zero) {
  display: none;
}
:deep(.anticon),
:deep(.ant-rate) {
  display: flex;
}
</style>
