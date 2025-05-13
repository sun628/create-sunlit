<template>
  <ConfigProvider :theme="ButtonTheme">
    <Button
      v-bind="{ ...$attrs, ...omit(props, ['color', 'type']) }"
      :type="buttonType"
      class="base-button"
    >
      <template v-for="(_, slotName) of $slots" #[slotName]>
        <slot :name="slotName" />
      </template>
    </Button>
  </ConfigProvider>
</template>
<script lang="ts" setup>
import { omit } from 'lodash-es';
import { computed } from 'vue';
import { Button, ConfigProvider } from 'ant-design-vue';
import type { AButtonType, ButtonProps } from './Button';
import { aButtonTypes, buttonColorPrimary } from './Button';
import { lightenColor } from './color';

defineOptions({
  name: 'BaseButton'
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

const ButtonTheme = computed(() => {
  if (props.color || isCustomType.value) {
    const type = props.type as keyof typeof buttonColorPrimary;
    const colorPrimary = props.color || buttonColorPrimary[type];
    const lightenColorValue = lightenColor(colorPrimary, 20);
    return {
      token: {
        colorPrimary: colorPrimary,
        controlOutline: colorPrimary,
        colorLink: colorPrimary,
        colorLinkHover: lightenColorValue,
        colorLinkActive: lightenColorValue
      }
    };
  }
  return void 0;
});
</script>
<style lang="less" scoped>
.base-button {
  box-shadow: none;
}
</style>
