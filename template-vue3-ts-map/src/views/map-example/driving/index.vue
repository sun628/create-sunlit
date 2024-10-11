<template>
  <ALayout relative>
    <!-- 地图组件 -->
    <MvMap @map-load="onMapLoad"></MvMap>
    <ACard
      v-draggable
      class="pos-absolute top-10px left-10px right-0 m-0 w-620px"
      title="输入框聚焦后，点击地图获取对应坐标"
    >
      <AForm
        layout="inline"
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
      >
        <AFormItem label="起点坐标" name="startLnLat">
          <AInput
            v-model:value="formState.startLnLat"
            :style="geInputStyle(1)"
            @focus="currentKey = 1"
          />
        </AFormItem>

        <AFormItem label="终点坐标" name="endLngLat">
          <AInput
            v-model:value="formState.endLngLat"
            :style="geInputStyle(2)"
            @focus="currentKey = 2"
          />
        </AFormItem>

        <AFormItem label="当前规划路径">
          <AInputSearch v-model:value="lngLatStr">
            <template #enterButton>
              <AButton v-copy="lngLatStr" type="primary">复制</AButton>
            </template>
          </AInputSearch>
        </AFormItem>
      </AForm>
    </ACard>
  </ALayout>
</template>

<script setup lang="ts">
import { DrivingService, addMarker } from '@/hooks/useMap';
import { theme } from 'ant-design-vue';
defineOptions({ name: 'Driving' });
const { useToken } = theme;
const { token } = useToken();

const map = shallowRef<AMap.Map>(); // 地图实例

const currentKey = ref(1);
const lngLatStr = ref('');
interface FormState {
  startLnLat: string;
  endLngLat: string;
}

const formState = reactive<FormState>({
  startLnLat: '',
  endLngLat: '',
});

function geInputStyle(key: number) {
  return { backgroundColor: key === currentKey.value ? toValue(token).colorPrimary : '' };
}
let marker;
let drivingService: DrivingService;

function clickListener(e) {
  if (marker) {
    marker.setMap(null);
    marker = null;
  }
  marker = addMarker({
    position: e.lnglat,
    map: map!.value!,
  });
  const lngLatStr = ` ${Number(e.lnglat.lng)},${Number(e.lnglat.lat)}`;
  if (currentKey.value === 1) {
    formState.startLnLat = lngLatStr;
  } else {
    formState.endLngLat = lngLatStr;
  }
  drawPolylineByDriving();
}

/**
 * @function
 * @todo 根据路径规划绘制路线
 **/
function drawPolylineByDriving() {
  const { startLnLat, endLngLat } = formState;
  if (startLnLat && endLngLat) {
    const start = startLnLat.split(',').map(Number) as AMap.LngLatLike;
    const end = endLngLat.split(',').map(Number) as AMap.LngLatLike;
    drivingService.searchByLngLat(start, end, (status, result) => {
      if (status === 'complete') {
        const steps = result.routes[0].steps;
        const arr = steps.map((step) => step.path);
        lngLatStr.value = JSON.stringify(arr);
        console.log('steps:', arr);
      }
    });
  }
}

function onMapLoad(data: AMap.Map) {
  map.value = data;
  drivingService = new DrivingService({
    policy: 19,
    map: map.value,
    autoFitView: false,
  });
  map.value.on('click', clickListener);
}
</script>
<style scoped lang="less">
.ant-input-search .ant-input-search-button {
  height: 28px;
}
:deep(.ant-card) {
  .ant-card-body {
    padding: 0 0 20px 0;
  }
}
</style>
