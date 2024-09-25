<template>
  <AConfigProvider :locale="zhCN">
    <router-view></router-view>
  </AConfigProvider>
</template>
<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN';
// import { antTheme } from '@/config';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');
</script>
