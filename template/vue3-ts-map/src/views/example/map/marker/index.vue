<!--
 * @description: 地图标记点示例
 * @author: wangyang
 * @date: 2025-07-25
 -->

<template>
  <div class="map-marker-example wh-full">
    <MvMap @map-load="handleMapLoad">
      <div class="control-panel">
        <a-card title="标记点控制面板" :bordered="false">
          <a-space direction="vertical" style="width: 100%">
            <a-divider orientation="left">分组标记点</a-divider>
            <a-row :gutter="8">
              <a-col :span="12">
                <a-button type="primary" block @click="addRedMarkers">添加红色标记组</a-button>
              </a-col>
              <a-col :span="12">
                <a-button danger block @click="removeMarkerGroup('red')">清除红色标记组</a-button>
              </a-col>
            </a-row>
            <a-row :gutter="8">
              <a-col :span="12">
                <a-button type="primary" block @click="addBlueMarkers">添加蓝色标记组</a-button>
              </a-col>
              <a-col :span="12">
                <a-button danger block @click="removeMarkerGroup('blue')">清除蓝色标记组</a-button>
              </a-col>
            </a-row>
            <a-row :gutter="8">
              <a-col :span="12">
                <a-button type="primary" block @click="addRandomMarkers">添加随机标记</a-button>
              </a-col>
              <a-col :span="12">
                <a-button danger block @click="removeMarkerGroup('random')">清除随机标记</a-button>
              </a-col>
            </a-row>
            <a-button danger block @click="removeMarkerGroup()">清除所有标记点</a-button>

            <a-divider orientation="left">最近点击的标记点</a-divider>
            <div v-if="lastClickedMarker">
              <a-descriptions :column="1" size="small" bordered>
                <a-descriptions-item label="标题">
                  {{ lastClickedMarkerData.title }}
                </a-descriptions-item>
                <a-descriptions-item label="分组">
                  {{ lastClickedMarkerData.group }}
                </a-descriptions-item>
                <a-descriptions-item label="经度">
                  {{ lastClickedMarkerData.lon.toFixed(6) }}
                </a-descriptions-item>
                <a-descriptions-item label="纬度">
                  {{ lastClickedMarkerData.lat.toFixed(6) }}
                </a-descriptions-item>
              </a-descriptions>
              <div class="mt-2">
                <a-button danger block @click="removeSingleMarker">删除此标记点</a-button>
              </div>
            </div>
            <a-empty v-else description="点击地图上的标记点以选择" />

            <a-divider orientation="left">单个标记点</a-divider>
            <a-form layout="vertical">
              <a-form-item label="经度">
                <a-input-number
                  v-model:value="markerForm.lon"
                  :min="118"
                  :max="122"
                  style="width: 100%"
                />
              </a-form-item>
              <a-form-item label="纬度">
                <a-input-number
                  v-model:value="markerForm.lat"
                  :min="31"
                  :max="34"
                  style="width: 100%"
                />
              </a-form-item>
              <a-form-item label="标题">
                <a-input v-model:value="markerForm.title" placeholder="请输入标记点标题" />
              </a-form-item>
              <a-form-item label="图标颜色">
                <a-radio-group v-model:value="markerForm.color">
                  <a-radio value="blue">蓝色</a-radio>
                  <a-radio value="red">红色</a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item>
                <a-button type="primary" @click="addSingleMarker">添加单个标记点</a-button>
              </a-form-item>
            </a-form>
          </a-space>
        </a-card>
      </div>
    </MvMap>
  </div>
</template>

<script setup lang="ts">
import { useMarker } from '@business-components/mv-map/hooks/useMap';
import { message } from 'ant-design-vue';

// 地图相关
const mapInstance = shallowRef<AMap.Map>();

// 表单数据
const markerForm = reactive({
  lon: 119.865334,
  lat: 32.358443,
  title: '新标记点',
  color: 'blue'
});

// 标记点数据类型
interface MarkerData {
  id: string;
  lon: number;
  lat: number;
  title: string;
  color: string;
  group?: string;
}

// 不同分组的标记点数组
const markerGroups = reactive<Record<string, AMap.Marker[]>>({
  red: [],
  blue: [],
  random: [],
  custom: []
});

// 跟踪最近点击的标记点
const lastClickedMarker = shallowRef<AMap.Marker | null>(null);
const lastClickedMarkerData = reactive<MarkerData>({
  id: '',
  lon: 0,
  lat: 0,
  title: '',
  color: '',
  group: ''
});

// 使用标记点Hook
const { createMarkerLayer, addMarker, removeMarkerLayer } = useMarker<MarkerData>(mapInstance);

// 地图加载完成回调
const handleMapLoad = (map: AMap.Map) => {
  mapInstance.value = map;
  message.success('地图初始化成功');
};

// 点击标记点回调
const handleMarkerClick = (e: AMap.MarkerEvent<MarkerData>, extData: MarkerData) => {
  message.info(`点击了标记点: ${extData.title} (${extData.group}组)`);

  // 保存被点击的标记点和数据
  lastClickedMarker.value = e.target;
  Object.assign(lastClickedMarkerData, extData);
};

// 添加红色标记点组
const addRedMarkers = () => {
  const center = mapInstance.value?.getCenter();
  if (!center) return;

  // 生成5个红色标记点，围绕地图中心呈圆形分布
  const markers: MarkerData[] = Array.from({ length: 5 }, (_, i) => {
    const angle = (i / 5) * Math.PI * 2;
    return {
      id: `red-${Date.now()}-${i}`,
      lon: center.lng + 0.02 * Math.cos(angle),
      lat: center.lat + 0.02 * Math.sin(angle),
      title: `红色标记点${i + 1}`,
      color: 'red',
      group: 'red'
    };
  });

  const createdMarkers = createMarkerLayer(
    markers,
    {
      markerOptions: {
        anchor: 'bottom-center',
        icon: new AMap.Icon({
          size: new AMap.Size(32, 32),
          image: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png',
          imageSize: new AMap.Size(32, 32)
        })
      }
    },
    handleMarkerClick
  );

  // 保存创建的标记点到对应分组
  markerGroups.red.push(...createdMarkers);
  message.success(`成功添加5个红色标记点`);
};

// 添加蓝色标记点组
const addBlueMarkers = () => {
  const center = mapInstance.value?.getCenter();
  if (!center) return;

  // 生成5个蓝色标记点，围绕地图中心呈方形分布
  const markers: MarkerData[] = [
    { dx: -0.03, dy: -0.03 },
    { dx: 0.03, dy: -0.03 },
    { dx: 0.03, dy: 0.03 },
    { dx: -0.03, dy: 0.03 },
    { dx: 0, dy: 0 }
  ].map((pos, i) => ({
    id: `blue-${Date.now()}-${i}`,
    lon: center.lng + pos.dx,
    lat: center.lat + pos.dy,
    title: `蓝色标记点${i + 1}`,
    color: 'blue',
    group: 'blue'
  }));

  const createdMarkers = createMarkerLayer(
    markers,
    {
      markerOptions: {
        anchor: 'bottom-center',
        icon: new AMap.Icon({
          size: new AMap.Size(32, 32),
          image: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
          imageSize: new AMap.Size(32, 32)
        })
      }
    },
    handleMarkerClick
  );

  // 保存创建的标记点到对应分组
  markerGroups.blue.push(...createdMarkers);
  message.success(`成功添加5个蓝色标记点`);
};

// 添加随机标记点
const addRandomMarkers = () => {
  const center = mapInstance.value?.getCenter();
  if (!center) return;

  // 生成10个随机标记点
  const markers: MarkerData[] = Array.from({ length: 10 }, (_, i) => ({
    id: `random-${Date.now()}-${i}`,
    lon: center.lng + (Math.random() - 0.5) * 0.1,
    lat: center.lat + (Math.random() - 0.5) * 0.1,
    title: `随机标记点${i + 1}`,
    color: ['blue', 'red'][Math.floor(Math.random() * 2)],
    group: 'random'
  }));

  const createdMarkers = createMarkerLayer(
    markers,
    {
      markerOptions: {
        anchor: 'bottom-center',
        offset: new AMap.Pixel(0, 0)
      }
    },
    handleMarkerClick
  );

  // 保存创建的标记点到对应分组
  markerGroups.random.push(...createdMarkers);
  message.success(`成功添加${markers.length}个随机标记点`);
};

// 添加单个标记点
const addSingleMarker = () => {
  if (!mapInstance.value) return message.error('地图未初始化');

  const markerData = {
    id: `custom-${Date.now()}`,
    ...markerForm,
    group: 'custom'
  };

  // 根据颜色选择不同的图标
  const iconUrl = {
    blue: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
    red: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png'
  }[markerForm.color];

  const marker = addMarker<MarkerData>(
    {
      position: [markerData.lon, markerData.lat],
      title: markerData.title,
      icon: new AMap.Icon({
        size: new AMap.Size(32, 32),
        image: iconUrl,
        imageSize: new AMap.Size(32, 32)
      }),
      label: {
        content: markerData.title,
        direction: 'top'
      },
      extData: markerData,
      map: mapInstance.value
    },
    handleMarkerClick
  );

  // 保存创建的标记点到对应分组
  markerGroups.custom.push(marker);
  message.success('成功添加标记点');
};

// 清除特定组的标记点
const removeMarkerGroup = (group?: string) => {
  if (group) {
    // 清除特定分组的标记点
    if (markerGroups[group] && markerGroups[group].length) {
      removeMarkerLayer(markerGroups[group]);
      markerGroups[group] = [];
      message.success(`已清除${group}标记组`);

      // 如果最后点击的标记点属于被删除的组，则清除最后点击的标记点信息
      if (lastClickedMarkerData.group === group) {
        lastClickedMarker.value = null;
      }
    } else {
      message.info(`${group}标记组为空`);
    }
  } else {
    // 清除所有标记点
    removeMarkerLayer();
    // 重置所有分组
    Object.keys(markerGroups).forEach((key) => {
      markerGroups[key] = [];
    });
    // 清除最后点击的标记点
    lastClickedMarker.value = null;
    message.success('已清除所有标记点');
  }
};

// 删除单个标记点
const removeSingleMarker = () => {
  if (!lastClickedMarker.value) return;

  // 从地图上移除标记点
  removeMarkerLayer(lastClickedMarker.value);

  // 从分组中移除标记点
  const group = lastClickedMarkerData.group;
  if (group && markerGroups[group]) {
    const index = markerGroups[group].findIndex(
      (marker) => (marker as any)._amap_id === (lastClickedMarker.value as any)._amap_id
    );
    if (index > -1) {
      markerGroups[group].splice(index, 1);
    }
  }

  // 清除最后点击的标记点信息
  lastClickedMarker.value = null;
  message.success('成功删除标记点');
};
</script>

<style scoped lang="less">
.map-marker-example {
  position: relative;

  .control-panel {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 300px;
    z-index: 100;
    background: white;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    max-height: calc(100% - 40px);
    overflow-y: auto;
  }
}
</style>
