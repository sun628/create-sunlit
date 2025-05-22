<template>
  <div class="text-size-24" :class="[iconName]" />
</template>
<script setup lang="ts">
import { computed } from 'vue';

defineOptions({ name: 'SvgIcon' });

export type SvgIconProps = {
  name: string;
  prefix?: 'ant-design' | 'svg' | undefined;
};

const props = withDefaults(defineProps<SvgIconProps>(), { prefix: 'svg' });

const iconName = computed(() => {
  if (!props.name) {
    return void 0;
  }
  return `i-${props.prefix}:${props.name}`;
});
</script>
