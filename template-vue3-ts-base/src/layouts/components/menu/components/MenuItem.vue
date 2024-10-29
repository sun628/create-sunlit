<template>
  <AMenuItem :key="item.name" @click.capture="handleLink">
    <span v-if="item.meta?.icon" class="anticon">
      <SvgIcon :name="item.meta.icon" />
    </span>
    <span>{{ item.meta?.title }}</span>
  </AMenuItem>
</template>

<script setup lang="ts">
import { RouteRecordRaw } from 'vue-router';

const props = withDefaults(defineProps<{ item: RouteRecordRaw }>(), {});
const router = useRouter();

/**
 * @function
 * @todo 判断是否为外链
 * @param path
 * @returns {boolean}
 */
const isExternal = (path) => {
  return /^(https?:|mailto:|tel:)/.test(path);
};

const handleLink = () => {
  const routePath = props.item.path;
  const target = props.item.meta!.target;
  const currentRoute = router.currentRoute.value as unknown as string;
  // 外链情况
  if (target === '_blank') {
    if (isExternal(routePath)) window.open(routePath);
  } else {
    if (isExternal(routePath)) window.location.href = routePath;
    else if (currentRoute !== routePath) {
      router.push(routePath);
    }
  }
};
</script>
