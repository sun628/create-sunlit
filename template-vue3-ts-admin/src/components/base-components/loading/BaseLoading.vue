<template>
  <div v-show="loading" :class="loadingCls">
    <ASpin />
  </div>
</template>
<script setup lang="ts">
import { LoadingProps } from './types';
import { useNamespace } from '@/hooks';
const ns = useNamespace('loading');
const loadingCls = ns.b();

const props = withDefaults(defineProps<LoadingProps>(), {
  loading: false
});

const loading = ref(props.loading);

watch(
  () => props.loading,
  (n) => {
    loading.value = n;
  },
  { deep: true }
);
</script>
<style>
.mv-loading {
  z-index: 999;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
