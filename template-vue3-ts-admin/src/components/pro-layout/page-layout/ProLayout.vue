<template>
  <AntLayout v-if="!pure" class="pro-layout-container">
    <AntSider
      :collapsed="collapsed"
      theme="light"
      :trigger="null"
      collapsible
      :style="{ backgroundColor: token.colorBgContainer, color: token.colorText }"
    >
      <div class="pro-layout-title">
        <slot name="title" :collapsed="collapsed">
          <slot name="logo" />
          <span v-show="!collapsed" style="margin-left: 10px">
            <slot name="titleText" />
          </span>
        </slot>
      </div>
      <slot name="menu">
        <SiderMenu :menu-data="menuData ?? []" :open-kyes="openKeys ?? []" />
      </slot>
    </AntSider>
    <AntLayout :style="{ borderLeft: `1px solid ${token?.colorBorder}` }">
      <AntHeader :style="headerStyle" class="pro-layout-header">
        <div class="pro-layout-header-container">
          <div class="flex-1 overflow-x-auto">
            <slot name="headerContent">
              <MenuUnfoldOutlined
                v-if="collapsed"
                class="trigger"
                @click="updatedCollapsed(false)"
              />
              <MenuFoldOutlined v-else class="trigger" @click="updatedCollapsed(true)" />
              <slot name="breadcrumb">
                <Breadcrumb />
              </slot>
            </slot>
          </div>
          <AntSpace align="center" class="flex-shrink-0">
            <slot name="headerActions" />
          </AntSpace>
        </div>
      </AntHeader>
      <PageTags v-if="showPageTags" />
      <AntContent :style="{ backgroundColor: token.colorBgLayout, overflowY: 'scroll' }">
        <AntSpin :spinning="loading">
          <div class="page-container">
            <router-view v-slot="{ Component, route }">
              <Transition name="fade-transform" mode="out-in">
                <!-- <KeepAlive :include="include"> -->
                <component :is="Component" :key="route.path" />
                <!-- </KeepAlive> -->
              </Transition>
            </router-view>
          </div>
        </AntSpin>
      </AntContent>
    </AntLayout>
  </AntLayout>
</template>

<script setup lang="ts">
import type { ProlayoutEmits, ProLayoutProps } from './types';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
import { Layout as AntLayout, Space as AntSpace, Spin as AntSpin, theme } from 'ant-design-vue';
import { computed, type CSSProperties } from 'vue';

type PageStatus = 0 | 404 | 403 | 500;

defineOptions({ name: 'LakyLayout' });

withDefaults(defineProps<ProLayoutProps>(), {
  pure: false,
  showPageTags: true,
  loading: false,
  status: 0
});
const emits = defineEmits<ProlayoutEmits>();

const { Sider: AntSider, Header: AntHeader, Content: AntContent } = AntLayout;

const { token } = theme.useToken();

const headerStyle = computed<CSSProperties>(() => ({
  height: '64px',
  lineHeight: '64px',
  paddingInline: 0,
  borderBottom: `1px solid ${token.value.colorBorder}}`
}));

function updatedCollapsed(val: boolean) {
  emits('collapse', val);
  emits('update:collapsed', val);
}
</script>

<style lang="less" scoped>
.pro-layout-container {
  position: relative;
  height: 100%;
  width: 100%;
  .pro-layout-title {
    border-inline-end: 1px solid rgba(5, 5, 5, 0.06);
    height: 65px;
    font-size: 20px;
    line-height: 24px;
    padding: 10px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    > span {
      text-wrap: nowrap;
    }
    > img {
      margin: 0 auto;
      width: 45px;
      height: 45px;
    }
  }
  .pro-layout-header {
    position: relative;
    padding-inline: 50px;
    color: var(--text-color);
    line-height: 64px;
    background: var(--bg-color);
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    &-container {
      display: flex;
      padding: 0 24px;
    }
  }
  .page-container {
    overflow-x: hidden;
  }

  .fade-transform-enter-active,
  .fade-transform-leave-active {
    transition: all 0.5s;
  }

  .fade-transform-enter-from {
    opacity: 0;
    transform: translateX(50px);
  }

  .fade-transform-leave-to {
    opacity: 0;
    transform: translateX(-50px);
  }
}
</style>
