<template>
  <AForm
    class="pos-absolute top-20px left-0 right-0 m-auto w-800px"
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
        placeholder="聚焦点击地图获取坐标"
        @focus="currentKey = 1"
      />
    </AFormItem>

    <AFormItem label="终点坐标" name="endLngLat">
      <AInput
        v-model:value="formState.endLngLat"
        placeholder="聚焦点击地图获取坐标"
        :style="geInputStyle(2)"
        @focus="currentKey = 2"
      />
    </AFormItem>
  </AForm>
</template>

<script setup lang="ts">
import { DrivingService, addMarker } from '@/hooks/useMap';
import { MapKey } from '@/config/constant';
import { theme } from 'ant-design-vue';
defineOptions({ name: 'Driving' });
const { useToken } = theme;
const { token } = useToken();

const currentKey = ref(1);

interface FormState {
  startLnLat: string;
  endLngLat: string;
}
const map = inject(MapKey);

const formState = reactive<FormState>({
  startLnLat: '',
  endLngLat: '',
});

function geInputStyle(key: number) {
  return { backgroundColor: key === currentKey.value ? toValue(token).colorPrimary : '' };
}
let marker;
let drivingService;

watchEffect(() => {
  if (map?.value) {
    drivingService = new DrivingService({
      policy: 19,
      map: map.value,
      autoFitView: false,
    });
    map.value.on('click', clickListener);
  }
});

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
        console.log('steps:', arr);
      }
    });
  }
}
</script>
