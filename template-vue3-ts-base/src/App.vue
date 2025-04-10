<template>
  <StyleProvider :transformers="[px2rem]">
    <AConfigProvider :locale="zhCN" :theme="antTheme">
      <router-view></router-view>
    </AConfigProvider>
  </StyleProvider>
</template>
<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import { antTheme } from '@/config';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { px2remTransformer, StyleProvider } from 'ant-design-vue';

const px2rem = px2remTransformer({
  rootValue: $config.pxtorem.rootValue,
});

dayjs.locale('zh-cn');
</script>
