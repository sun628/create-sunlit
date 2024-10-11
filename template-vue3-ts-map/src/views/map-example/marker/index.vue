<template>
  <ALayout relative>
    <!-- 地图组件 -->
    <MvMap @map-load="onMapLoad"></MvMap>
    <ACard class="pos-absolute bottom-10px right-10px m-0 w-520px" title="点标记操作">
      <AButton type="primary" @click="addMarkerClick()">添加点标记</AButton>
      <AButton type="primary" @click="updateIcon()">更新图标</AButton>
      <AButton type="primary" @click="updateContent()">更新内容</AButton>
      <AButton type="primary" @click="clearMarker()">删除点标记</AButton>
    </ACard>
  </ALayout>
</template>

<script setup lang="ts">
import { addMarker } from '@/hooks/useMap';
const map = shallowRef<AMap.Map>(); // 地图实例

function onMapLoad(data: AMap.Map) {
  map.value = data;
}

let marker: AMap.Marker | null = null;
/**
 * @function
 * @todo 添加点标记点击事件
 **/
function addMarkerClick() {
  if (marker) return $message.warning('当前点标记已存在');
  marker = addMarker(
    {
      icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
      offset: new AMap.Pixel(-13, -30),
      position: [118.811836, 32.051376],
      title: 'Marker',
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
    `
   <div>
    <img src="//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png" />
    <span class='marker-content'>更新点标记内容</span>
   </div>
  `,
  );
}
</script>

<style scoped lang="less">
:global(.marker-content) {
  position: absolute;
  top: -20px;
  right: -118px;
  color: #fff;
  padding: 8px 10px;
  box-shadow: 1px 1px 1px rgba(10, 10, 10, 0.2);
  white-space: nowrap;
  font-size: 16px;
  background-color: #25a5f7;
  border-radius: 3px;
}
</style>
