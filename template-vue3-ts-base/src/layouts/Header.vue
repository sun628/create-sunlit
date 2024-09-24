<template>
  <div class="header-container">
    <div class="logo">
      <div>vue3 + vite + map</div>
    </div>
    <ul class="menu-list">
      <li
        v-for="item in menu"
        :key="item.path"
        :class="{ 'menu-select': item.path === active }"
        class="menu-item"
        @click="menuClick(item)"
      >
        {{ item.title }}
      </li>
    </ul>
    <div class="user">
      <div class="time">{{ currentTime }}</div>
      <img class="icon-user" src="@/assets/images/header/user.png" alt="" />
      <img
        class="icon-screen"
        :src="isFullscreen ? fullScreenExitIcon : fullScreenIcon"
        @click="toggle"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import fullScreenExitIcon from '@/assets/images/header/full-screen-exit.png';
import fullScreenIcon from '@/assets/images/header/full-screen.png';
import { useRouter } from 'vue-router';
import { useFullscreen, useIntervalFn } from '@vueuse/core';
import { parseTime } from '@/utils';
const { isFullscreen, toggle } = useFullscreen(); // 全屏切换
const router = useRouter();
const active = ref(router.currentRoute.value.path);

let dateTime = new Date().getTime();
useIntervalFn(() => {
  dateTime = dateTime + 1000;
  currentTime.value = parseTime(dateTime, '{y}.{m}.{d} {h}:{i}:{s}');
}, 1000);

const menu = [
  {
    title: '菜单1',
    path: '/monitor',
  },
];

const currentTime = ref('');

// 路由
const menuClick = (item) => {
  if (item.path === active.value) return;
  active.value = item.path;
  if (item.onClick) return item.onClick();
  if (item.path) {
    router.push({ path: item.path });
  }
};
</script>

<style lang="less" scoped>
.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  background: #071a3e;
  color: #fff;
  width: 100%;
  padding: 0 24px 0 5px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  .logo {
    border-radius: 5px;
    display: flex;
    align-items: center;
    font-size: 28px;
    font-weight: 400;
    color: #d7dfe9;
    line-height: 55px;
    letter-spacing: 1.4px;
    user-select: none;
    cursor: pointer;
    img {
      width: 37px;
      height: 39px;
      margin-left: 22px;
      margin-right: 15px;
    }
  }
  .menu-list {
    display: flex;
    flex: 1;
    padding-left: 52px;
    .menu-item {
      width: 132px;
      height: 48px;
      line-height: 48px;
      background-image: url('@/assets/images/header/menu-bg.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      text-align: center;
      color: #00f5ff;
      cursor: pointer;
      margin-right: 20px;
      user-select: none;
    }
    .menu-select {
      background-image: url('@/assets/images/header/menu-bg-active.png');
      color: #000000;
    }
  }

  .user {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #00aeff;
  }
  .el-icon-user-solid {
    font-size: 20px;
    margin-left: 20px;
  }
  .time {
    margin-right: 10px;
  }
  .user-name {
    margin-left: 5px;
    margin-right: 20px;
  }

  .icon-logout {
    width: 20px;
    height: 21px;
    cursor: pointer;
  }
  .icon-screen {
    width: 20px;
    height: 21px;
    cursor: pointer;
  }
  .icon-user {
    width: 17px;
    height: 20px;
    margin-left: 27px;
    margin-right: 10px;
  }
}
</style>
