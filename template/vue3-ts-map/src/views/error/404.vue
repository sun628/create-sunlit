<template>
  <Result class="error-page" status="404" title="404" sub-title="对不起，你访问的页面不存在">
    <template #extra>
      <AButton type="primary" @click="returnHome">返回首页</AButton>
    </template>
  </Result>
</template>

<script setup lang="ts">
import { Result } from 'ant-design-vue';
const router = useRouter();

/**
 * @function
 * @description 返回首页
 */
const returnHome = () => {
  router.push('/');
};
</script>
