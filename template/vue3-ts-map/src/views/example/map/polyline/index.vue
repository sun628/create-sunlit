<!--
 * @description: 折线示例
 * @author: wangyang
 * @date: 2023-01-01
 -->
<template>
  <div class="polyline-demo">
    <div class="map-container">
      <MvMap @map-ready="onMapReady" />
    </div>
    <div class="control-panel">
      <a-card title="折线控制面板">
        <a-space direction="vertical" style="width: 100%">
          <a-button type="primary" @click="drawRandomPolyline">绘制随机折线</a-button>
          <a-button danger @click="clearPolyline">清除折线</a-button>

          <a-divider />

          <a-form layout="vertical">
            <a-form-item label="折线宽度">
              <a-slider v-model:value="lineOptions.strokeWeight" :min="1" :max="20" />
            </a-form-item>
            <a-form-item label="折线颜色">
              <a-select v-model:value="lineOptions.strokeColor">
                <a-select-option value="#3366FF">蓝色</a-select-option>
                <a-select-option value="#FF3366">红色</a-select-option>
                <a-select-option value="#33FF66">绿色</a-select-option>
                <a-select-option value="#FF9900">橙色</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="折线透明度">
              <a-slider v-model:value="lineOptions.strokeOpacity" :min="0.1" :max="1" :step="0.1" />
            </a-form-item>
          </a-form>
        </a-space>
      </a-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMessage } from '@/hooks';
import { usePolyline } from '@business-components/mv-map/hooks/useMap';
import MvMap from '@/components/business-components/mv-map/index.vue';

// 消息提示
const { info, success } = useMessage();

// 地图实例引用
const mapInstance = ref<AMap.Map | null>(null);

// 创建折线Hook
const { createLineLayer, removeLineLayer } = usePolyline();

// 折线配置选项
const lineOptions = reactive({
  strokeWeight: 6,
  strokeColor: '#3366FF',
  strokeOpacity: 1
});

// 示例数据
const generateRandomPaths = (count = 3, pointsPerPath = 5) => {
  const paths: AMap.PolylineOptions<{ name: string; id: string }>[] = [];

  // 北京区域大致范围
  const baseLng = 116.4;
  const baseLat = 39.9;

  for (let i = 0; i < count; i++) {
    const path: AMap.LngLat[] = [];
    for (let j = 0; j < pointsPerPath; j++) {
      // 生成随机偏移量
      const lngOffset = (Math.random() - 0.5) * 0.2;
      const latOffset = (Math.random() - 0.5) * 0.2;

      // 生成经纬度点
      const lngLat = new AMap.LngLat(baseLng + lngOffset, baseLat + latOffset);
      path.push(lngLat);
    }

    // 添加到路径数组
    paths.push({
      path,
      strokeColor: lineOptions.strokeColor,
      extData: {
        name: `路径${i + 1}`,
        id: `path_${i}`
      }
    });
  }

  return paths;
};

// 绘制随机折线
const drawRandomPolyline = () => {
  const paths = generateRandomPaths();

  // 配置折线参数
  const options = {
    polylineOptions: {
      strokeWeight: lineOptions.strokeWeight,
      strokeOpacity: lineOptions.strokeOpacity
    }
  };

  // 绘制折线并添加点击事件
  const lines = createLineLayer(paths, options, (e, data) => {
    info(`点击了折线: ${data.name}, ID: ${data.id}`);
  });

  success(`已绘制${lines.length}条折线`);
};

// 清除所有折线
const clearPolyline = () => {
  removeLineLayer();
  success('已清除所有折线');
};

// 地图加载完成回调
const onMapReady = (map: AMap.Map) => {
  mapInstance.value = map;
  success('地图加载完成');
};

// 组件加载完成后自动绘制一条折线
onMounted(() => {
  setTimeout(() => {
    drawRandomPolyline();
  }, 1000);
});
</script>

<style lang="less" scoped>
.polyline-demo {
  width: 100%;
  height: 100%;
  display: flex;

  .map-container {
    flex: 1;
    height: 100%;
  }

  .control-panel {
    width: 300px;
    padding: 16px;
    height: 100%;
    overflow-y: auto;
  }
}
</style>
