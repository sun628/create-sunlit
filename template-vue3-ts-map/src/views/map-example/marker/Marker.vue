<template>
  <ACard class="pos-absolute top-10px right-10px m-0 w-240px" title="点标记操作">
    <AButton type="primary" @click="add()">添加点标记</AButton>
    <AButton type="primary" @click="updateContent()">更新内容</AButton>
    <AButton type="primary" @click="updateIcon()">更新图标</AButton>
    <AButton type="primary" @click="clearMarker()">删除点标记</AButton>

    <AList :data-source="List" item-layout="vertical">
      <template #renderItem="{ item }">
        <AListItemMeta pointer :title="item.title"></AListItemMeta>
        <AListItem>
          <AList bordered :data-source="item.children" item-layout="vertical">
            <template #renderItem="{ item }">
              <AListItem @click="itemClick(item)">{{ item.title }}</AListItem>
              <AListItemMeta pointer :description="item.description"></AListItemMeta>
            </template>
          </AList>
        </AListItem>
      </template>
    </AList>
  </ACard>
</template>

<script setup lang="ts">
import { addMarker } from '@/hooks/useMap';
import { MapKey } from '@/config/constant.ts';
const map = inject(MapKey);

let marker: AMap.Marker | null = null;

interface Item {
  title: string;
  description?: string;
  children?: Item[];
}
const List: Item[] = [
  {
    title: '添加点标记',
    children: [
      {
        title: '自定义url图标',
        description: '`icon:{url:string,size:Size}`',
      },
      {
        title: '自定义本地图标',
        description: '`icon:{new AMap.Icon}`',
      },
    ],
  },
];

function itemClick(item: Item) {
  console.log('🚀 ~ itemClick ~ item:', item);
  $message.info(item.title);
}
function add() {
  if (marker) return $message.warning('当前点标记已存在');
  marker = addMarker(
    {
      icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
      offset: new AMap.Pixel(-13, -30),
      position: [118.811836, 32.051376],
      title: '点标记',
      map: map!.value, // 不加则需要map.add(marker)
      extData: { name: '点标记' },
    },
    (_, extData) => {
      $message.success(`点击了${extData.name}`);
    },
  );
}

function updateIcon() {
  if (!marker) return $message.warning('请先添加点标记');
  marker.setIcon('//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png');
}

function clearMarker() {
  if (!marker) return $message.warning('请先添加点标记');
  marker.setMap(null);
  marker = null;
}

function updateContent() {
  if (!marker) return $message.warning('请先添加点标记');
  marker.setContent(
    `<div>
      <img src="//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png" />
      <span class='marker-content'>更新点标记内容</span>
     </div>`,
  );
}
</script>

<style scoped lang="less">
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
</style>
