<template>
  <StyleProvider :transformers="[px2rem]">
    <a-config-provider :locale="zhCN" :theme="theme">
      <router-view></router-view>
    </a-config-provider>
  </StyleProvider>
</template>
<script setup lang="ts">
import { px2remTransformer, StyleProvider } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import { loadEnv } from '@/utils';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

const px2rem = px2remTransformer({
  rootValue: Number(loadEnv().VITE_PX_REM_ROOT_VALUE)
});
const { theme } = useAppStore();
console.log('🚀 ~ theme:', theme);

dayjs.locale('zh-cn');
</script>
