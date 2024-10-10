<template>
  <AMenuItem :key="item.name" @click.capture="handleLink">
    <span v-if="item.meta.icon" class="anticon">
      <SvgIcon :name="item.meta.icon" />
    </span>
    <span>{{ item.meta.title }}</span>
  </AMenuItem>
</template>

<script setup>
const props = defineProps(['item']);
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
  const target = props.item.meta.target;
  // 外链情况
  if (target === '_blank') {
    if (isExternal(routePath)) window.open(routePath);
    else if (router.currentRoute.value !== routePath) window.open(routePath.href);
  } else {
    if (isExternal(routePath)) window.location.href = routePath;
    else if (router.currentRoute.value !== routePath) {
      router.push(routePath);
    }
  }
};
</script>
