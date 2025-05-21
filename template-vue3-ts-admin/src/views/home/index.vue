<template>
  <AWatermark
    :content="['Sunlit', 'Vue3 Vite Base']"
    :height="30"
    :width="130"
    class="home-container"
  >
    <div class="home-title">
      <h3>Vue3 Vite Base</h3>
      <p class="">本基础模版基于 Vite + Vue3.5 + Pinia + Unocss + Ant Design Vue</p>
      <p class="small">环境要求 node 22+ & pnpm 包管理器</p>
      <BaseButton type="primary" color="red">点击</BaseButton>
    </div>
  </AWatermark>
</template>

<script setup lang="ts">
defineOptions({ name: 'Home' });
</script>

<style scoped lang="less">
.home-container {
  background-image: linear-gradient(180deg, rgba(247, 232, 255, 0.54), rgba(191, 223, 255, 0.35));
  height: 100vh;
  width: 100vw;
  .home-title {
    padding: 0 50px;
    height: 320px;
    h3 {
      font-size: 80px;
      line-height: 150px;
      font-weight: bold;
    }
    p {
      font-size: 30px;
      color: #666;
      line-height: 40px;
      font-weight: 300;
      &.small {
        font-size: 16px;
        font-style: italic;
        color: #888;
      }
    }
  }
}
</style>
