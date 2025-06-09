<script setup lang="ts">
import { DownOutlined } from '@ant-design/icons-vue';
import {
  Dropdown as AntDropdown,
  Menu as AntMenu,
  MenuItem as AntMenuItem,
  theme
} from 'ant-design-vue';
import { isEmpty, last, split } from 'lodash-es';
import { computed } from 'vue';
import { type RouteRecordRaw, useRoute } from 'vue-router';

defineOptions({
  name: 'LakyBreadcrumb'
});

const route = useRoute();
const { token } = theme.useToken();

const textColor = computed(() => token.value.colorText);
const textDisabledColor = computed(() => token.value.colorTextDisabled);

const breadcrumbList = computed(() => route.matched.filter((item) => item.meta?.title));

function genMenuItems(children: RouteRecordRaw[]) {
  return children.map((item) => ({
    title: genItemTitle(item),
    locale: (item.meta?.locale as string) ?? '',
    key: item.path
  }));
}

function genItemTitle(item: RouteRecordRaw) {
  if (item.meta?.title && !isEmpty(item.meta.title)) {
    return item.meta.title;
  }
  return last(split(item.path, '/'));
}

function isLastItem(idx: number) {
  return idx === breadcrumbList.value.length - 1;
}
</script>

<template>
  <div class="breadcrumb-container">
    <ol class="breadcrumb">
      <TransitionGroup name="breadcrumb">
        <li
          v-for="(item, index) in breadcrumbList"
          :key="item.path"
          class="breadcrumb-item"
          :class="{ 'breadcrumb-item-last': isLastItem(index) }"
        >
          <AntDropdown>
            <span class="breadcrumb-item__title" :class="{ disabled: isLastItem(index) }">
              <router-link v-if="item.components" :to="item.path">
                {{ genItemTitle(item) }}
              </router-link>
              <span v-else>{{ genItemTitle(item) }}</span>
              <DownOutlined
                v-if="item.children.length > 1"
                style="margin-inline-start: 4px; width: 12px; height: 12px"
              />
            </span>
            <template v-if="item.children.length > 1" #overlay>
              <AntMenu :selected-keys="[$route.path]">
                <AntMenuItem
                  v-for="menuItem in genMenuItems(item.children)"
                  :key="menuItem.key"
                  @click="() => $router.push(menuItem.key)"
                >
                  {{ menuItem.title }}
                </AntMenuItem>
              </AntMenu>
            </template>
          </AntDropdown>
          <span v-if="!isLastItem(index)" style="margin-inline: 8px">/</span>
        </li>
      </TransitionGroup>
    </ol>
  </div>
</template>

<style lang="less" scoped>
.breadcrumb-container {
  display: inline-block;
  margin-left: 20px;
  .breadcrumb {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    list-style: none;

    .breadcrumb-item__title,
    .breadcrumb-item__title > a {
      color: v-bind(textColor);
      cursor: pointer;
      &:hover {
        color: v-bind(textDisabledColor);
      }
    }

    .breadcrumb-item-last {
      .breadcrumb-item__title,
      .breadcrumb-item__title > a {
        color: v-bind(textDisabledColor) !important;
        cursor: default;
      }
    }
  }
}

.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}

.breadcrumb-enter-from {
  transform: translateX(20px);
}

.breadcrumb-leave-active {
  position: absolute;
  display: none;
}
</style>
