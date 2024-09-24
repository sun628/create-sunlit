<template>
  <AConfigProvider :theme="btnTheme">
    <Button v-bind="{ ...$attrs, ...props }" :type="buttonType">
      <template v-for="(_, slotName) of $slots" #[slotName]>
        <slot :name="slotName" />
      </template>
    </Button>
  </AConfigProvider>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { Button } from 'ant-design-vue';
import type { AButtonType, ButtonProps } from './Button';
import { aButtonTypes, buttonColorPrimary } from './Button';

defineOptions({
  name: 'BaseButton',
});

const props = withDefaults(defineProps<ButtonProps>(), {});

const isCustomType = computed(() => Reflect.has(buttonColorPrimary, props.type!));

const buttonType = computed<AButtonType>(() => {
  if (props.type && aButtonTypes.includes(props.type)) {
    return props.type as AButtonType;
  } else if (props.color || isCustomType.value) {
    return 'primary';
  }
  return 'default';
});

const btnTheme = computed(() => {
  const type = props.type!;

  if (props.color || isCustomType.value) {
    return {
      token: {
        colorPrimary: props.color || buttonColorPrimary[type],
      },
    };
  }
  return void 0;
});
</script>
