<template>
  <StyleProvider :transformers="[px2rem]">
    <a-config-provider :locale="zhCN" :theme="antTheme">
      <router-view></router-view>
    </a-config-provider>
  </StyleProvider>
</template>
<script setup lang="ts">
import { px2remTransformer, StyleProvider } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import { antTheme } from '@/config';
import { loadEnv } from '@/utils';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

const px2rem = px2remTransformer({
  rootValue: Number(loadEnv().VITE_PX_REM_ROOT_VALUE)
});

dayjs.locale('zh-cn');
</script>
